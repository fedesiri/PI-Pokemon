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
function mapearTipos(tipos){
    return tipos.map(tipo =>{
        return {
            nombre: tipo.type.name,
            id: tipo.slot
        }
    })
}


function formatearRespuesta(pokemon){
    return {
        id: pokemon.data.id,
        nombre: pokemon.data.name,
        vida: pokemon.data.stats[0].base_stat,
        fuerza: pokemon.data.stats[1].base_stat,
        defensa: pokemon.data.stats[2].base_stat,
        velocidad: pokemon.data.stats[5].base_stat,
        altura: pokemon.data.height,
        peso: pokemon.data.weight,
        imagen: pokemon.data.sprites.front_default,
        types: mapearTipos(pokemon.data.types)
    }
}

function crearIdsPokemons(cantidad){
    let ids = []
            
    while(ids.length <= cantidad){
        let numerosRandom = parseInt(Math.random()*100)
        if(!ids.includes(numerosRandom) && numerosRandom !== 0){
            ids.push(numerosRandom)
        }
    }

    return ids
}

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
                const pokemonNombre = formatearRespuesta(pokemon)    
                res.send(pokemonNombre)
            }
        } catch (error) {
            if(error.response.status === 404){
                res.send({message: 'No se encontró el pokemon buscado por nombre.'})
            } else {
                next(error)
            }
        } 
    } else {
        try{
            let ids = crearIdsPokemons(40)                
            let pokemonsApi = []
            const promises = ids.map(id => {
                return new Promise( async (resolve, reject) => {
                    let pokemon = await axios.get('https://pokeapi.co/api/v2/pokemon/'+ id)                        
                    const pokemonIdeal = formatearRespuesta(pokemon) 
                    resolve(
                        pokemonsApi.push(pokemonIdeal)
                    )
                    reject(err => next(err))
                })
            });
            await Promise.all(promises)
            
            let pokeDB = await Pokemon.findAll({
                include: [{
                            model: Type,  
                            attributes: ['id', 'nombre']            
                        }]
            })               
            res.send([...pokeDB, ...pokemonsApi])                 
        } catch (error){
            next(error)
        }
    }       
})



router.get('/:id', async (req, res, next) => { 
    const { id } = req.params
    try{        
        let pokemon;
        if(uuidValidate(id)){
            pokemon = await Pokemon.findOne({
                where: {
                    id: id
                },
                include: [
                    {
                        model: Type,  
                        attributes: ['id', 'nombre']
                    }
                ]         
            })
            if(pokemon){
                res.send(pokemon)
            } else {
                res.send({message: 'No se encontró el pokemon buscado por ID.'})
            }
        } else {
            pokemon = await axios.get('https://pokeapi.co/api/v2/pokemon/' + id)
            const pokemonPorId = formatearRespuesta(pokemon) 
            res.send(pokemonPorId)
        }        
    } catch(error){
        if(error.response.status === 404){
            res.send({message: 'No se encontró el pokemon buscado por ID.'})
        } else {
            next(error)
        }
    }
})

router.post('/', async (req, res, next) =>{
    const { nombre, vida, fuerza, defensa, velocidad, altura, peso, imagen, tipos } = req.body
    try{
        let pokemonAnterior = await Pokemon.findOne({
            where: {
                nombre: nombre
            }
        })
        
        if(pokemonAnterior){
            res.send({message: 'Ya existe un pokemon con ese nombre!'})
        } else {
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
            let pokemonRta = await Pokemon.findOne({
                where: {
                    id: newPokemon.id
                },
                include: [
                    {
                        model: Type,  
                        attributes: ['id', 'nombre']
                    }
                ]         
            })               
            res.send(pokemonRta)
        }
    } catch (error){
        next(error)
    }
})


module.exports = router;

//----------------------------------------------------------------------