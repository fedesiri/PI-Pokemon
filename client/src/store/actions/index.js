import axios from 'axios'

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const SEARCH_POKEMON_NAME = 'SEARCH_POKEMON_NAME'
export const SEARCH_POKEMON_ID = 'SEARCH_POKEMON_ID'
export const GET_ALL_TYPES = 'GET_ALL_TYPES';
export const POKEMON_CREATE = 'POKEMON_CREATE';
export const POKEMON_DETAIL = 'POKEMON_DETAIL';
export const DELETE_POKEMON = 'DELETE_POKEMON'; 

export const getAllPokemons = () => {
    return function(dispatch){
        axios.get('http://localhost:3001/api/pokemons')
        .then((pokemones) => {
            dispatch({
                type: GET_ALL_POKEMONS,
                payload: pokemones.data
            })
        })
        .catch((error) =>{
            console.log(error)
        })
    }     
}

export const searchPokemonByName = (search) => {
    return async function(dispatch){
        try{
            let pokemon = await axios.get('http://localhost:3001/api/pokemons?name=' + search)        
            dispatch({
                type: SEARCH_POKEMON_NAME,
                payload: pokemon.data
            })
        } catch (error) {
            console.log(error)
        }
    }     
}

export const searchPokemonById = (id) => {
    return async function(dispatch){
        try{
            let pokemon = await axios.get('http://localhost:3001/api/pokemons/' + id)        
            dispatch({
                type: SEARCH_POKEMON_ID,
                payload: pokemon.data
            })
        } catch (error) {
            console.log(error)
        }
    }     
}

export const getAllTypes = () => {
    return function(dispatch){
        axios.get('http://localhost:3001/api/types')
        .then((tipos) => {
            dispatch({
                type: GET_ALL_TYPES,
                payload: tipos.data
            })
        })
        .catch((error) =>{
            console.log(error)
        })
    }
}
