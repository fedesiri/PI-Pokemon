import React from 'react'
import {Link} from 'react-router-dom'
import s from './LandingPage.module.css'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllPokemons } from '../../store/actions';


const LandingPage = () => {

    let dispatch = useDispatch()
    
    useEffect(() =>{        
        dispatch(getAllPokemons())
    }, [dispatch])
    
    return (
        <div className={s.fondo}>
            
            <h2 className={s.titulo}>Bienvenidos a nuestro mundo Pokemon!</h2>          
           
            <Link to={'/home'}><button className={s.botonEst}>Ingresar</button></Link>
                     
              
        </div>
    );
};

export default LandingPage


     
    