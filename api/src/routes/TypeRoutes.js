const { default: axios } = require('axios');
const { Router } = require('express');
// const Type = require('../models/Type');
const { Type } = require('../db.js');
const { v4: uuidv4 } = require('uuid');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async (req, res, next) =>{
    try{
        let tiposDePokemons = []
        const tipos = await axios.get('https://pokeapi.co/api/v2/type')
        const promesas = tipos.data.results.map(tipo =>{
            return new Promise( async (resolve, reject) => {
                let tipoAnterior = await Type.findAll({
                    where: {
                        nombre: tipo.name
                    }
                })
                let tipoDb; 
                if(tipoAnterior.length){
                    tipoDb = tipoAnterior[0]
                } else {
                    tipoDb = await Type.create({
                        id: uuidv4(),
                        nombre: tipo.name
                    })
                }
                resolve(
                    tiposDePokemons.push(tipoDb)
                )
                reject(err => next(err))
            })
        })
        await Promise.all(promesas)
        res.send(tiposDePokemons)  
    } catch (error){
        next(error)
    }    
    // res.send('1)Obtener todos los tipos de pokemons posibles   2)En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí ')
})


module.exports = router;