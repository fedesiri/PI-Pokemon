import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import { getAllTypes } from '../../store/actions';
// import { useDispatch } from 'react-redux';
import s from './PokemonCreate.module.css'
import imagen from '../../img/pokemons.png'

export function validate(input){  
  let errors = {}
  if(!input.nombre){
    errors.nombre = 'Ingresa un nombre para tu Pokemon';
  } else if (typeof input.nombre !== 'string') {
    errors.nombre = 'El nombre ingresado es incorrecto';
  } 
  if(!input.vida){
    errors.vida = 'Ingresa un valor de vida para tu Pokemon';
  } else if (typeof input.vida !== Number){
    errors.vida = 'El valor ingresado es incorrecto';
  }
  if(!input.fuerza){
    errors.fuerza = 'Ingresa un valor de fuerza para tu Pokemon';
  } else if (typeof input.fuerza !== Number){
    errors.fuerza = 'El valor ingresado es incorrecto';
  }
  if(!input.defensa){
    errors.defensa = 'Ingresa un valor de defensa para tu Pokemon';
  } else if (typeof input.defensa !== Number){
    errors.defensa = 'El valor ingresado es incorrecto';
  }
  if(!input.velocidad){
    errors.velocidad = 'Ingresa un valor de velocidad para tu Pokemon';
  } else if (typeof input.velocidad !== Number){
    errors.velocidad = 'El valor ingresado es incorrecto';
  }
  if(!input.altura){
    errors.altura = 'Ingresa un valor de altura para tu Pokemon';
  } else if (typeof input.altura !== Number){
    errors.altura = 'El valor ingresado es incorrecto';
  }
  if(!input.peso){
    errors.peso = 'Ingresa un valor de peso para tu Pokemon';
  } else if (typeof input.peso !== Number){
    errors.peso = 'El valor ingresado es incorrecto';
  }
  if(!input.tipo){
    errors.tipo = 'Ingresa un valor de tipo para tu Pokemon';
  } else if (typeof input.tipo !== Number){
    errors.tipo = 'El valor ingresado es incorrecto';
  }
  if(!input.imagen){
    errors.imagen = 'Ingresa un valor de imagen para tu Pokemon';
  } else if (typeof input.imagen !== Number){
    errors.imagen = 'El valor ingresado es incorrecto';
  }

  return errors
}


const PokemonCreate = () => {
  
  let tipos = useSelector((state) => state.types)

  let dispatch = useDispatch()

  useEffect(() =>{
    if(!tipos.length){
      dispatch(getAllTypes())
    }
  }, [dispatch, tipos.length])



    const [input, setInput] = useState({
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

    // const [errors, setErrors] = useState({});


    const handleInputChange = function(e) {
        e.preventDefault()
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
        // setErrors(validate({
        //   ...input,
        //   [e.target.nombre]: e.target.value
        // }))
      }

      const handleInputSubmit = function(e){
        e.preventDefault() 
        setInput({
          nombre: "",
          vida: "",
          fuerza: "",
          defensa: "",
          velocidad: "",
          altura: "",
          peso: "",
          tipo: "",
          imagen: "",
        })
        // dispatch((input))  
        
      }

      return (
        <div className={s.padre}>
          <div className={s.div1}>
            <span className={s.titulo}>Crea un Pokemon!</span>
            <span className={s.subTitulo}>Completá todos los campos y dale vida a tu propio Pokemon!</span>
          </div>

          <div className={s.div2}>
            <img className={s.img} src={imagen} alt='img not found'/>
          </div>

          <div className={s.div3}>
              <form onSubmit={handleInputSubmit}>
                <div className={s.formSuperior}>
                  <div className={s.inputs}>
                      <div className={s.inputYLabel}>
                        <label>Nombre: </label>
                        <input className={s.inputDeTexto} size="27" name='nombre' type='text'  onChange={handleInputChange} value={input.nombre}/>
                      </div>

                      <div className={s.inputYLabel}>
                        <label>Vida: </label>
                        <input className={s.inputDeTexto} size="27" name='vida' type='number'  onChange={handleInputChange} value={input.vida}/>
                      </div>

                      <div className={s.inputYLabel}>
                        <label>Fuerza: </label>
                        <input className={s.inputDeTexto} size="27" name='fuerza'  type='number'  onChange={handleInputChange} value={input.fuerza}/>
                      </div>

                      <div className={s.inputYLabel}>
                        <label>Defensa: </label>
                        <input className={s.inputDeTexto} size="27" name='defensa' type='number'  onChange={handleInputChange} value={input.defensa}/>
                      </div>

                      <div className={s.inputYLabel}>
                        <label>Velocidad: </label>
                        <input className={s.inputDeTexto} size="27" name='velocidad' type='number'  onChange={handleInputChange} value={input.velocidad}/>
                      </div>

                      <div className={s.inputYLabel}>
                        <label>Altura: </label>
                        <input className={s.inputDeTexto} size="27" name='altura' type='number'  onChange={handleInputChange} value={input.altura}/>
                      </div>

                      <div className={s.inputYLabel}>
                        <label>Peso: </label>
                        <input className={s.inputDeTexto} size="27" name='peso' type='number'  onChange={handleInputChange} value={input.peso}/>
                      </div>

                      <div className={s.inputYLabel}>
                        <label>Imagen: </label>
                        <input className={s.inputDeTexto} size="27" name='imagen' onChange={handleInputChange} value={input.imagen}/>
                      </div>

                  </div>                  

                    <span>Tipos:</span>
                  <div className={s.tipos}>
                    {tipos?.map((tipo) =>{
                      return (
                        <div className={s.checkboxYLabel} key={tipo.id}>
                          <input type='checkbox'/> 
                          <label >{tipo.nombre}</label>
                        </div>                    
                      )
                    })}           
                  </div>

                </div>                                   
                  
                <div className={s.formInferior}>
                  <button className={s.btnCrearEstilos} type='submit'>Crea tu Pokemon!</button>
                </div>

              </form>
          </div>
          

          <div className={s.div4}>
            <Link to={'/home'}><button className={s.btnRegresarEstilos}>Regresar a 'Home'</button></Link>
          </div>

        </div>
    );


    
    
};

export default PokemonCreate