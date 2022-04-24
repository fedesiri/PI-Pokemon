import axios from "axios";
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { getAllTypes } from '../../store/actions';
import s from './SearchBar.module.css'


export default function SearchBar(props){  
    const [search, setSearch] = useState("")

    async function onSubmit(e){
        e.preventDefault();      
        if(search.length){
            let response = await getPokemonId()
           
            if(response.id){
                props.history.push('/pokemon/detail/'+ response.id)                
            } else {
                alert(response.message)
            }
        }
    }
    
    function onInputChange(e){
        e.preventDefault()
        setSearch(e.target.value)       
    }
    
    async function getPokemonId(){
        let pokemon = await axios.get('http://localhost:3001/api/pokemons?name=' + search)
        return pokemon.data
    }


    let tipos = useSelector((state) => state.types)


    let dispatch = useDispatch()
    
    useEffect(() =>{
        if(!tipos.length){
            dispatch(getAllTypes())
        }
    }, [dispatch, tipos.length])
    
    const [types, setTypes] = useState("")

    
     async function onSubmitTypes(e){
        e.preventDefault()
        if(types.length){
            for(var i = 0; i < tipos.length; i++){
                if(types === tipos[i].nombre){
                   console.log('lo encontre!')
                } else {
                    console.log('no lo encontre')
                }
            }       
        }
    }

    function onInputChangeTypes(e){
        e.preventDefault()
        setTypes(e.target.value)
    }


    return (    
        <div>
            
            <form className={s.papa} onSubmit={onSubmit}>
                <input className={s.inputBuscar} type="submit" value="Buscar"/>
                <input className={s.inputText} type="text" placeholder="Pokemon"  onChange={onInputChange} value={search} />
            </form>
            

            
            <form className={s.papa} onSubmit={onSubmitTypes}>
            <input className={s.inputBuscar} type="submit" value="Buscar"/>
            <input className={s.inputText} type="text" placeholder="Pokemon por Tipos"  onChange={onInputChangeTypes} value={types} />
            </form>
            

        </div>
        
    )
    
}