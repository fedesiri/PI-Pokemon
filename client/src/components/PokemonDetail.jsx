import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';


const PokemonDetail = () => {
    
    let pokemonDetails = useSelector((state) => state.pokemonDetails) 

    return (
        <div>
            <h1>{pokemonDetails.nombre}</h1>
            <h2>{pokemonDetails.id}</h2>
            <img src={pokemonDetails.imagen} alt='img not found'/>
            {pokemonDetails.types?.map((tipo) =>{
                return <h4 key={tipo.id}>{tipo.nombre}</h4>                    
            })}       
            <h2>{pokemonDetails.fuerza}</h2> 
            <h2>{pokemonDetails.velocidad}</h2>    
            <h2>{pokemonDetails.vida}</h2>
            <h2>{pokemonDetails.defensa}</h2>
            <h2>{pokemonDetails.altura}</h2>
            <h2>{pokemonDetails.peso}</h2>

            <Link to={'/home'}><button >Regresar a 'Home'</button></Link>
            
        </div>
    );
};

export default PokemonDetail