import React from 'react'
import {Link} from 'react-router-dom'
// import imagen from '..img/portada.jpg'

const LandingPage = () => {
    
    return (
        <div>
            <h1>Bienvenidos a nuestro mundo Pokemon!</h1>
            <img src='https://media.vandal.net/i/1200x630/3-2019/20193116333055_1.jpg' alt='imagen no encontrada!'/>
            <Link to={'/home'}><button >Ingresar</button></Link>
            
        </div>
    );
};

export default LandingPage


     
    