import axios from 'axios'

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const SEARCH_POKEMON_ID = 'SEARCH_POKEMON_ID'
export const SORT_BY_NAME_BY_ATTACK = 'SORT_BY_NAME_BY_ATTACK';
export const GET_ALL_TYPES = 'GET_ALL_TYPES';
export const POKEMON_CREATE = 'POKEMON_CREATE';
export const FILTER_BY_CREATED_OR_EXISTING = 'FILTER_BY_CREATED_OR_EXISTING'


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

export const sortByNameByAttack = (order) => {
    return {
        type: SORT_BY_NAME_BY_ATTACK,
        payload: order
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

export const createPokemons = (body) => {
    return async function(dispatch){
        try{
            let pokemonCreado = await axios.post('http://localhost:3001/api/pokemons', body)
            dispatch({
                type: POKEMON_CREATE,
                payload: pokemonCreado.data
            })
        } catch (error){
            console.log(error)
        }    
    }
}


export const filterByCreatedOrExisting = (filter) => {
    return {
        type: FILTER_BY_CREATED_OR_EXISTING,
        payload: filter    
    }
}