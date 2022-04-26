import { FILTER_BY_CREATED_OR_EXISTING, FILTER_BY_TYPE, GET_ALL_POKEMONS, GET_ALL_TYPES, POKEMON_CREATE, SEARCH_POKEMON_ID, SORT_BY_NAME_BY_ATTACK } from "../actions"
import {validate as uuidValidate} from 'uuid'
// const { v4: uuidv4, validate: uuidValidate } = require('uuid');

const initialState = {
    pokemons: [],
    filtrados: [],
    types: [],
    pokemonDetails: {},
}

export default function reducer(state = initialState, action) {
    if(action.type === GET_ALL_POKEMONS){
        return {
            ...state,
            pokemons: action.payload,
            filtrados: action.payload
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
        return {
            ...state,
            filtrados: ordenados
        }
    }
    if(action.type === POKEMON_CREATE){
        return{
            ...state,
            pokemons: state.pokemons.concat(action.payload),
            filtrados: state.pokemons.concat(action.payload),
        }
    }
    if(action.type === FILTER_BY_CREATED_OR_EXISTING){
        let filtrados = [...state.pokemons]
        if(action.payload === 'creadosPorNosotros'){          
            filtrados = filtrados.filter(filtrado => uuidValidate(filtrado.id))         
        } else if (action.payload === 'pokemonsExistentes') {
            filtrados = filtrados.filter(filtrado => !uuidValidate(filtrado.id))
        }
        return{
            ...state,
            filtrados: filtrados            
        }
    }
    if(action.type === FILTER_BY_TYPE){
        let filtrados = [...state.pokemons]
        let arrayPokemonsTipos = []
        if(action.payload !== 'buscarPorTipos'){
            for(var i = 0; i < filtrados?.length; i++){
                for(var j = 0; j < filtrados[i].types.length; j++){
                    if(filtrados[i].types[j].nombre === action.payload){
                        arrayPokemonsTipos.push(filtrados[i])
                    }
                }
            }
            return {
                ...state,
                filtrados: arrayPokemonsTipos
            }
        }
        return{
            ...state,
            filtrados: filtrados
        }
    }

    return state
}