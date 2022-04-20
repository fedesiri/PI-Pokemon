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
            <div className={s.hijo}>

                <div className={s.namImgTyp}>
                    <h2>{capitalizeLetter(pokemonDetails.nombre)}</h2>
                    <img src={pokemonDetails.imagen} alt='img not found'/>
                    {pokemonDetails.types?.map((tipo) =>{
                        return <span key={tipo.id}>Tipo: {tipo.nombre}</span>                    
                    })}      
                </div>

                <div className={s.id}>
                    <span>Id:</span>
                    <p>{pokemonDetails.id}</p>
                </div>

                <div className={s.estadisticasVidaFuerza}>
                    <span>Vida:</span>
                    <p>{pokemonDetails.vida}</p>

                    <span>Fuerza:</span> 
                    <p>{pokemonDetails.fuerza}</p>
                </div>
                <div className={s.estadisticaDefensaVelocidad}>
                    <span>Defensa:</span>
                    <p>{pokemonDetails.defensa}</p>

                    <span>Velocidad:</span>
                    <p>{pokemonDetails.velocidad}</p>
                </div>

                <div className={s.altPeso}>
                    <span>Altura: </span>
                    <p>{pokemonDetails.altura}</p>
                    <span>Peso:</span>
                    <p>{pokemonDetails.peso}</p>
                </div>
            
            </div>
            <Link to={'/home'}><button className={s.boton} >Regresar a 'Home'</button></Link>
        </div>
    );
};

export default PokemonDetail