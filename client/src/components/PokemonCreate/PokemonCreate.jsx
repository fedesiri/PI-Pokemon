import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import { createPokemons, getAllTypes } from '../../store/actions';
import s from './PokemonCreate.module.css'
import imagen from '../../img/pokemons.png'
import { capitalizeLetter } from '../../utils';

export function validate(input){  
  let errors = {}
  if(!input.nombre){
    errors.nombre = 'Ingresa un nombre.';
    console.log(input.nombre)
  } else if (input.nombre.length < 3) {
    errors.nombre = 'Debe contener al menos 3 caracteres';
  } 
  if(!input.vida){
    errors.vida = 'Ingresa un valor "vida"';
  } else if (input.vida <= 0 || input.vida > 150){
    errors.vida = 'Valor entre 1 y 150';
  }
  if(!input.fuerza){
    errors.fuerza = 'Ingresa un valor "fuerza"';
  } else if (input.fuerza <= 0 || input.fuerza > 150){
    errors.fuerza = 'Valor entre 1 y 150';
  }
  if(!input.defensa){
    errors.defensa = 'Ingresa un valor "defensa"';
  } else if (input.defensa <= 0 || input.defensa > 150){
    errors.defensa = 'Valor entre 1 y 150';
  }
  if(!input.velocidad){
    errors.velocidad = 'Ingresa un valor "velocidad"';
  } else if (input.velocidad <= 0 || input.velocidad > 150){
    errors.velocidad = 'Valor entre 1 y 150';
  }
  if(!input.altura){
    errors.altura = 'Ingresa un valor "altura"';
  } else if (input.altura <= 0 || input.altura > 100){
    errors.altura = 'Ingresa un valor entre 1 y 100';
  }
  if(!input.peso){
    errors.peso = 'Ingresa un valor "peso"';
  } else if (input.altura <= 0 || input.altura > 3000){
    errors.peso = 'Ingresa un valor entre 1 y 3000';
  }
  if(!input.imagen){
    errors.imagen = 'Ingresa un valor "imagen"';
  } else if (typeof input.imagen !== 'string'){
    errors.imagen = 'Debes ingresar una url que contenga la imagen';
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
    imagen: "",
  });
  
  const [errors, setErrors] = useState({});
  
  const [types, setTypes] = useState([])
  
  
  const handleInputChange = function(e) {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }
  
  const handleInputSubmit = function(e){
    e.preventDefault() 
        setErrors(validate({
          ...input,
          [e.target.name]: e.target.value
        }))        

        let body = {
          ...input,
          tipos: types
        }
        dispatch(createPokemons(body))
        setInput({
          nombre: "",
          vida: "",
          fuerza: "",
          defensa: "",
          velocidad: "",
          altura: "",
          peso: "",
          imagen: "",
        })
        setTypes([])
        
      }


      const handleInputCheckbox = function(e){ 
        let nuevoArray = []
        if(!types.includes(e.target.name)){
          nuevoArray = types.concat(e.target.name)
        } else {
         nuevoArray = types.filter((nombre) => e.target.name !== nombre)                
        }
        setTypes(nuevoArray)    
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
                        <input className={s.inputDeTexto && errors.nombre && s.danger} placeholder='Debe contener al menos 3 caracteres' size="27" name='nombre' type='text'  onChange={handleInputChange} value={input.nombre}/> 
                        {errors.nombre && (
                          <p className={s.danger}>{errors.nombre}</p>
                          )}
                      </div>
                    

                      <div className={s.inputYLabel}>
                        <label>Vida: </label>
                        <input className={s.inputDeTexto && errors.vida && s.danger} placeholder='Valor entre 1 y 150' size="20" name='vida' type='number'  onChange={handleInputChange} value={input.vida}/>
                        {errors.vida && (
                          <p className={s.danger}>{errors.vida}</p>
                          )}
                      </div>

                      <div className={s.inputYLabel}>
                        <label>Fuerza: </label>
                        <input className={s.inputDeTexto && errors.fuerza && s.danger} placeholder='Valor entre 1 y 150' size="20" name='fuerza'  type='number'  onChange={handleInputChange} value={input.fuerza}/>
                        {errors.fuerza && (
                          <p className={s.danger}>{errors.fuerza}</p>
                          )}
                      </div>

                      <div className={s.inputYLabel}>
                        <label>Defensa: </label>
                        <input className={s.inputDeTexto && errors.defensa && s.danger} placeholder='Valor entre 1 y 150' size="20" name='defensa' type='number'  onChange={handleInputChange} value={input.defensa}/>
                        {errors.defensa && (
                          <p className={s.danger}>{errors.defensa}</p>
                          )}
                      </div>

                      <div className={s.inputYLabel}>
                        <label>Velocidad: </label>
                        <input className={s.inputDeTexto && errors.velocidad && s.danger} placeholder='Valor entre 1 y 150' size="20" name='velocidad' type='number'  onChange={handleInputChange} value={input.velocidad}/>
                        {errors.velocidad && (
                          <p className={s.danger}>{errors.velocidad}</p>
                          )}
                      </div>

                      <div className={s.inputYLabel}>
                        <label>Altura: </label>
                        <input className={s.inputDeTexto && errors.altura && s.danger} placeholder='Valor entre 1 y 100' size="20" name='altura' type='number'  onChange={handleInputChange} value={input.altura}/>
                        {errors.altura && (
                          <p className={s.danger}>{errors.altura}</p>
                          )}
                      </div>

                      <div className={s.inputYLabel}>
                        <label>Peso: </label>
                        <input className={s.inputDeTexto && errors.peso && s.danger} placeholder='Valor entre 1 y 3000' size="20" name='peso' type='number'  onChange={handleInputChange} value={input.peso}/>
                        {errors.peso && (
                          <p className={s.danger}>{errors.peso}</p>
                          )}
                      </div>

                      <div className={s.inputYLabel}>
                        <label>Imagen: </label>
                        <input className={s.inputDeTexto && errors.imagen && s.danger} placeholder= 'Ingresa una url que contenga la imagen' size="27" name='imagen' onChange={handleInputChange} value={input.imagen}/>
                        {errors.imagen && (
                          <p className={s.danger}>{errors.imagen}</p>
                          )}
                      </div>

                  </div>                  

                    <span>Tipos:</span>
                  <div className={s.tipos}>
                    {tipos?.map((tipo) =>{
                      return (
                        <div className={s.checkboxYLabel} key={tipo.id}>
                          <input type='checkbox' name={tipo.nombre} onChange={handleInputCheckbox}/> 
                          <label >{capitalizeLetter(tipo.nombre)}</label>
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