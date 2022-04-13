const { default: axios } = require('axios');
const { Router } = require('express');
// const Type = require('../models/Type');
const { Type } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', (req, res, next) =>{
    axios.get('https://pokeapi.co/api/v2/type')
        .then((response) =>{
            res.send(response.data)
        })
        
    // res.send('1)Obtener todos los tipos de pokemons posibles   2)En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí ')
})


module.exports = router;