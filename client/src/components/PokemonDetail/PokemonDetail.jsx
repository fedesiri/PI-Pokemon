import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import s from './PokemonDetail.module.css'
import { searchPokemonById } from '../../store/actions/'
import { capitalizeLetter } from '../../utils'


const PokemonDetail = (props) => {
    
    let pokemonDetails = useSelector((state) => state.pokemonDetails) 

    let dispatch = useDispatch();

    useEffect(() =>{
        dispatch(searchPokemonById(props.match.params.id))
    }, [dispatch, props.match.params.id])           
    
    if(!pokemonDetails.id){
        return(
        <div className={s.papa}>
            <span>Estamos buscando tu pokemon!</span>
        </div>
        )
    } 

    return (
        <div className={s.papa}>


            <div className={s.nombre}>
                <span>Caracteristicas de {capitalizeLetter(pokemonDetails.nombre)}</span>
            </div>

            <div className={s.img}>
                <img src={pokemonDetails.imagen} alt='img not found'/>
            </div>

            <div className={s.id}>
                <h3>Numero de identificacion: { pokemonDetails.id }</h3>
            </div>

            <div className={s.tipo}>
                <h3>{pokemonDetails.types.length > 1 ? 'Tipos: ' : 'Tipo: '}</h3>
                <ul>
                {pokemonDetails.types?.map((tipo) =>{
                    return <li key={tipo.id}><h4>{tipo.nombre}</h4> </li>                    
                })}      
                </ul>
            </div>

                <h2>Estadisticas: </h2>

            <div className={s.estadisticasVidaFuerza}>
                <h4>Vida: {pokemonDetails.vida}</h4>
                <h4>Fuerza: {pokemonDetails.fuerza}</h4>          
            </div>

            <div className={s.estadisticaDefensaVelocidad}>
                <h4>Defensa: {pokemonDetails.defensa}</h4>
                <h4>Velocidad: {pokemonDetails.velocidad}</h4>
            </div>

            <div className={s.altPeso}>
                <h4>Altura: {pokemonDetails.altura}</h4>
                <h4>Peso: {pokemonDetails.peso}</h4>
            </div>

            
            
            
            <Link to={'/home'}><button className={s.boton} >Regresar a 'Home'</button></Link>
        </div>
    );
};

export default PokemonDetail