import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllPokemons } from '../../store/actions';
import Pokemon from '../Pokemon/Pokemon';
import s from './Home.module.css'



const Home = () => {
    
    let pokemons = useSelector((state) => state.pokemons) 

    let dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getAllPokemons())
    }, [dispatch])


    return (
        <div className={s.todo}>
            
            {pokemons?.map((pokemon) => {
               return <Pokemon 
               key = {pokemon.id}
               id = {pokemon.id}
               nombre={pokemon.nombre} 
               imagen={pokemon.imagen} 
               tipos={pokemon.types}              
               />
            })}
        </div>
    );
};

export default Home