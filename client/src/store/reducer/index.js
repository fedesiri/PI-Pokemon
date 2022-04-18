import { GET_ALL_POKEMONS, GET_ALL_TYPES, SEARCH_POKEMON } from "../actions"

const initialState = {
    pokemons: [],
    types: [],
    pokemonDetails: {}
}

export default function reducer(state = initialState, action) {
    if(action.type === GET_ALL_POKEMONS){
        return {
            ...state,
            pokemons: action.payload
        }
    }
    if(action.type === SEARCH_POKEMON){
        return {
            ...state,
            pokemonDetails: action.payload
        }
    }
    if(action.type === GET_ALL_TYPES){
        return {
            ...state,
            types: action.payload
        }
    }
    return state
}