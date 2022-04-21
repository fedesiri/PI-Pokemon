import axios from "axios";
import { useState } from "react"
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
    
    return (    
        
        <form className={s.papa} onSubmit={onSubmit}>
            <input className={s.inputBuscar} type="submit" value="Buscar"/>
            <input className={s.inputText} type="text" placeholder="Pokemon"  onChange={onInputChange} value={search} />
        </form>
        
    )
    
}