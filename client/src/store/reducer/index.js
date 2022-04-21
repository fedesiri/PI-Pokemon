import { GET_ALL_POKEMONS, GET_ALL_TYPES, SEARCH_POKEMON_ID, SORT_BY_NAME_BY_ATTACK } from "../actions"

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
    if(action.type === SEARCH_POKEMON_ID){
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
    if(action.type === SORT_BY_NAME_BY_ATTACK){
        let ordenados = [...state.pokemons] 
        if(action.payload === 'A-Z' || action.payload === 'Z-A'){
            ordenados.sort(function(a,b){
                if(a.nombre < b.nombre){
                    return action.payload === 'A-Z' ? -1 : 1;
                }
                if (a.nombre > b.nombre){
                    return action.payload === 'A-Z' ? 1 : -1;
                }
                return 0;
            })
        } else if (action.payload === 'attack-asc' || action.payload === 'attack-des') {
            ordenados.sort(function(a,b){
                if(a.fuerza < b.fuerza){
                    return action.payload === 'attack-asc' ? -1 : 1;
                }
                if (a.fuerza > b.fuerza){
                    return action.payload === 'attack-asc' ? 1 : -1;
                }
                return 0;
            })
        }
        console.log(ordenados)
        return {
            ...state,
            pokemons: ordenados
        }
    }
    return state
}