import React from 'react'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';


const PokemonCreate = () => {


    const [form, setForm] = React.useState({
    
    nombre: "",
    vida: "",
    fuerza: "",
    defensa: "",
    velocidad: "",
    altura: "",
    peso: "",
    tipo: "",
    imagen: "",
      });

      const dispatch = useDispatch()

      const handleInputChange = function(e) {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
      }

      const handleInputSubmit = function(e){
        e.preventDefault()  
        dispatch((form))  
        
      }

      return (
        <div>
            <h1>Crear un Pokemon!</h1>
            <form onSubmit={handleInputSubmit}>
                <label>Nombre: </label>
                <input name='nombre' onChange={handleInputChange}/>

                <label>Vida: </label>
                <input name='vida' onChange={handleInputChange}/>

                <label>Fuerza: </label>
                <input name='fuerza' onChange={handleInputChange}/>

                <label>Defensa: </label>
                <input name='defensa' onChange={handleInputChange}/>

                <label>Velocidad: </label>
                <input name='velocidad' onChange={handleInputChange}/>

                <label>Altura: </label>
                <input name='altura' onChange={handleInputChange}/>

                <label>Peso: </label>
                <input name='peso' onChange={handleInputChange}/>

                <label>Tipo: </label>
                <input name='tipo' onChange={handleInputChange}/>

                <label>Imagen: </label>
                <input name='imagen' onChange={handleInputChange}/>
                
                <button type='submit'>Create</button>
            </form>
            <Link to={'/home'}><button >Regresar a 'Home'</button></Link>
        </div>
    );


    
    
};

export default PokemonCreate