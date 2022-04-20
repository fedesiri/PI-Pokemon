import React from 'react'
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import s from './Nav.module.css'

const Nav = (props) => {
    
    return (
        <div className={s.papa}>
            <div className={s.hijo1}>
                <Link className={s.crearP} to="/home">Home</Link>
            </div>

            <div className={s.hijo2}>                
                <Link className={s.crearP} to="/pokemon/create">Crear Pokemons</Link>
                <SearchBar
                    history={props.history}
                />
            </div>           
            
        </div>            
        
    );
};

export default Nav