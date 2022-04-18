import React from 'react'
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Nav = (props) => {
    
    return (
        <div>
            <div>
                <Link to="/home">Home</Link>
                <Link to="/pokemon/create">Create Pokemons</Link>
                <SearchBar
                    history={props.history}
                />
            </div>            
        </div>
    );
};

export default Nav