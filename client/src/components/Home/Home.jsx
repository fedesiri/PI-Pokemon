import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllPokemons } from '../../store/actions';
import Pokemon from '../Pokemon/Pokemon';
import s from './Home.module.css'
import OrderNameYattack from '../OrderNameYattack/OrderNameYattack';



const Home = () => {
    
    let pokemons = useSelector((state) => state.pokemons) 

    let dispatch = useDispatch()

    
    useEffect(() =>{
        if(!pokemons.length){
            dispatch(getAllPokemons())
        }
    }, [dispatch, pokemons.length])


    return (        
        <div>
        <div className={s.sort}>
            <OrderNameYattack/>
        </div>
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
        </div>
    );
};

export default Home