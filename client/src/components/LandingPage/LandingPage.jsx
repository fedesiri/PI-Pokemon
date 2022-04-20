import React from 'react'
import {Link} from 'react-router-dom'
import s from './LandingPage.module.css'

const LandingPage = () => {
    
    return (
        <div className={s.fondo}>
            
            <h2 className={s.titulo}>Bienvenidos a nuestro mundo Pokemon!</h2>          
           
            <Link to={'/home'}><button className={s.botonEst}>Ingresar</button></Link>
                     
              
        </div>
    );
};

export default LandingPage


     
    