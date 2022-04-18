import axios from 'axios'

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const SEARCH_POKEMON = 'SEARCH_POKEMON'
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

export const searchPokemons = (search) => {
    return async function(dispatch){
        try{
            let pokemon = await axios.get('http://localhost:3001/api/pokemons?name=' + search)        
            dispatch({
                type: SEARCH_POKEMON,
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
