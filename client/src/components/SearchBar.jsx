
import { useState } from "react"
import { useDispatch } from "react-redux";
import { searchPokemons } from "../store/actions";

export default function SearchBar(props){

    const [search, setSearch] = useState("")

    let dispatch = useDispatch()

    function onSubmit(e){
        e.preventDefault();
        dispatch(searchPokemons(search))
        props.history.push('/pokemon/detail')
    }

    function onInputChange(e){
        e.preventDefault()
        setSearch(e.target.value)
    }

    return <div>
        <form onSubmit={onSubmit}>
            <input type="text"  onChange={onInputChange} value={search} />
            <input type="submit" value="Buscar"/>
        </form>
    </div>
}