const { default: axios } = require('axios');
const { Router } = require('express');
// Importar todos los routers;
// const { conn } = require('./db.js');
const { Pokemon, Type } = require('../db.js');
// Ejemplo: const authRouter = require('./auth.js');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post('/load', async (req, res, next) =>{
    try{
        let ids = []
        let pokemons = await Pokemon.findAll()
        if(pokemons.length < 40){
            while(ids.length < (40 - pokemons.length)){
                let numerosRandom = parseInt(Math.random()*500)
                if(!ids.includes(numerosRandom) && numerosRandom !== 0){
                    ids.push(numerosRandom)
                }
            }    
            const promises = ids.map(id => {
                return new Promise( async (resolve, reject) => {
                    let pokemon = await axios.get('https://pokeapi.co/api/v2/pokemon/'+ id)                        
                    const pokemonIdeal = {
                        id: uuidv4(),
                        nombre: pokemon.data.name,
                        vida: pokemon.data.stats[0].base_stat,
                        fuerza: pokemon.data.stats[1].base_stat,
                        defensa: pokemon.data.stats[2].base_stat,
                        velocidad: pokemon.data.stats[5].base_stat,
                        altura: pokemon.data.height,
                        peso: pokemon.data.weight,
                        imagen: pokemon.data.sprites.front_default
                    }
                    resolve(
                        await Pokemon.create(pokemonIdeal)
                    )
                    reject(err => next(err))
                })
            });
            await Promise.all(promises)
        }
        let pokeDB = await Pokemon.findAll()               
        res.send(pokeDB)                 
    } catch (error){
        next(error)
    }
})



router.get('/', async (req, res, next) =>{
    const { name } = req.query
    if(name){
        try{
            let pokemon;
            pokemon = await Pokemon.findAll({                
                where: {
                    nombre: name  
                }, 
                include: [
                    {
                        model: Type,  
                        attributes: ['id', 'nombre']
                    }
                ]         
            })
            if(pokemon.length){
                res.send(pokemon[0])
            } else {
                pokemon = await axios.get('https://pokeapi.co/api/v2/pokemon/' + name)
                const pokemonNombre = {
                    id: pokemon.data.id,
                    nombre: pokemon.data.name,
                    vida: pokemon.data.stats[0].base_stat,
                    fuerza: pokemon.data.stats[1].base_stat,
                    defensa: pokemon.data.stats[2].base_stat,
                    velocidad: pokemon.data.stats[5].base_stat,
                    altura: pokemon.data.height,
                    peso: pokemon.data.weight,
                    imagen: pokemon.data.sprites.front_default,
                    types: pokemon.data.types.map(tipo =>{
                        return {
                            nombre: tipo.type.name,
                            id: tipo.slot
                        }
                    })
                }    
                res.send(pokemonNombre)
            }
        } catch (error) {
            if(error.response.status === 404){
                res.status(404).send({message: 'No se encontró el pokemon buscado por nombre.'})
            } else {
                next(error)
            }
        } 
    } else {
        try{
            let pokemons = await Pokemon.findAll({
                include: [
                    {
                        model: Type,  
                        attributes: ['id', 'nombre']
                    }
                ]         
            })
            res.send(pokemons)            
        } catch(error){
            next(error)
        }
    }       
})



router.get('/:id', async (req, res, next) => { 
    const { id } = req.params
    try{
        if(id){
            let pokemon;
            if(uuidValidate(id)){
                pokemon = await Pokemon.findOne({
                    where: {
                        id: id
                    }
                })
                if(pokemon){
                    res.send(pokemon)
                } else {
                    res.status(404).send({message: 'No se encontró el pokemon buscado por ID.'})
                }
            } else {
                pokemon = await axios.get('https://pokeapi.co/api/v2/pokemon/' + id)
                const pokemonPorId = {
                    id: pokemon.data.id,
                    nombre: pokemon.data.name,
                    vida: pokemon.data.stats[0].base_stat,
                    fuerza: pokemon.data.stats[1].base_stat,
                    defensa: pokemon.data.stats[2].base_stat,
                    velocidad: pokemon.data.stats[5].base_stat,
                    altura: pokemon.data.height,
                    peso: pokemon.data.weight,
                    imagen: pokemon.data.sprites.front_default
                }
                res.send(pokemonPorId)
            }
        }
    } catch(error){
        if(error.response.status === 404){
            res.status(404).send({message: 'No se encontró el pokemon buscado por ID.'})
        } else {
            next(error)
        }
        next(error)
    }
})



router.post('/', async (req, res, next) =>{
    const { nombre, vida, fuerza, defensa, velocidad, altura, peso, imagen, tipos } = req.body
    try{
        const newPokemon = await Pokemon.create({
            id: uuidv4(),
            nombre,
            vida,
            fuerza,
            defensa,
            velocidad,
            altura,
            peso,
            imagen
        })

        const promises = tipos?.map(tipo =>{
            return new Promise (async (resolve, reject) =>{
                let tipoBuscado = await Type.findOne({
                    where: {
                        nombre: tipo
                    }
                })
                resolve (
                    newPokemon.addType(tipoBuscado)
                )
                reject(err => next(err))
            })
        })       
        await Promise.all(promises)
        res.send(newPokemon)
    } catch (error){
        next(error)
    }
})


module.exports = router;