import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllPokemons } from '../../store/actions';
import Pokemon from '../Pokemon/Pokemon';
import s from './Home.module.css'
import OrderNameYattack from '../OrderNameYattack/OrderNameYattack';
import FilterCreate from '../FilterCreate/FilterCreate';
import FilterTypes from '../FilterTypes/FilterTypes';
import Paginado from '../Paginado/Paginado';


const Home = () => {
    
    let pokemons = useSelector((state) => state.filtrados) 
    let todosLosPokemons = useSelector((state) => state.pokemons)    
    let dispatch = useDispatch()

    const [paginaActual, setPaginaActual] = useState(1)
    const pokemonsPorPagina = 12
    const indiceDelUltimoPokemon = paginaActual * pokemonsPorPagina
    const indiceDelPrimerPokemon = indiceDelUltimoPokemon - pokemonsPorPagina
    const pokemonsActuales = pokemons.slice(indiceDelPrimerPokemon, indiceDelUltimoPokemon)

    const paginado = (numeroDePagina) => {        
        setPaginaActual(numeroDePagina)        
    }
    
    useEffect(() =>{
        if(!todosLosPokemons.length){
            dispatch(getAllPokemons())
        }
    }, [dispatch, todosLosPokemons.length])


    return (               
            
                <div>                    
                    <div className={s.sort}>
                        <FilterCreate/>
                        <FilterTypes/>
                        <OrderNameYattack/>
                    </div>
                    
                                <div>
                                <Paginado
                                pokemonsPorPagina={pokemonsPorPagina}
                                pokemons={pokemons.length}
                                paginado = {paginado}
                                paginaActual = {paginaActual}
                                />                        
                                </div>

                    <div className={s.todo}>
                        {pokemonsActuales.length ? (                        
                            pokemonsActuales?.map((pokemon) => {
                                return <Pokemon 
                                key = {pokemon.id}
                                id = {pokemon.id}
                                nombre={pokemon.nombre} 
                                imagen={pokemon.imagen} 
                                tipos={pokemon.types}              
                                />
                            })
                        ) : (
                            <span className={s.span}>No se encontraron Pokemons.</span>
                        )}
                    </div>
                                <div>
                                <Paginado
                                pokemonsPorPagina={pokemonsPorPagina}
                                pokemons={pokemons.length}
                                paginado = {paginado}
                                paginaActual = {paginaActual}
                                />                        
                                </div>
                </div>

            
               
            
        
    );
};

export default Home