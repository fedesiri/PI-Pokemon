const { default: axios } = require('axios');
const { Router } = require('express');
// Importar todos los routers;
// const { conn } = require('./db.js');
const { Pokemon } = require('../db.js');
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async (req, res, next) =>{
    const { name } = req.query
    if(name){
        try{
            let pokemon;
            pokemon = await Pokemon.findAll({                
                    nombre: name                
            })
            if(pokemon.length){
                res.send(pokemon)
            } else {
                pokemon = await axios.get('https://pokeapi.co/api/v2/pokemon/' + name)
                console.log(pokemon)
                const pokemonNombre = {
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
            let ids = []
            while(ids.length <= 40){
                var numerosRandom = parseInt(Math.random()*100)
                if(!ids.includes(numerosRandom) && numerosRandom !== 0){
                    ids.push(numerosRandom)
                }
            }    
            let pokemons = []
            const promises = ids.map(id => {
                return new Promise( async (resolve, reject) => {
                    let pokemon = await axios.get('https://pokeapi.co/api/v2/pokemon/'+ id)                        
                    const pokemonIdeal = {
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
                    resolve(
                        pokemons.push(pokemonIdeal)
                    )
                    reject(err => next(err))
                })
            });
            await Promise.all(promises)            
            let pokeDB = await Pokemon.findAll()            
            let resultado = [...pokemons, ...pokeDB]
            res.send(resultado)                    
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
            pokemon = await Pokemon.findAll({
                id: id
            })
            if(pokemon.length){
                res.send(pokemon)
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
    }
    //1)Obtener el detalle de un pokemon en particular, 2)Debe traer solo los datos pedidos en la ruta de detalle de pokemon, 3)Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes 
})



router.post('/', async (req, res, next) =>{
    const { id, name, vida, fuerza, defensa, velocidad, altura, peso } = req.body
    const newPokemon = await Pokemon.create({
        id,
        name,
        vida,
        fuerza,
        defensa,
        velocidad,
        altura,
        peso
    })
    res.send(newPokemon)
    // res.send('1) Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body,   2)Crea un pokemon en la base de datos')
})


module.exports = router;