import { useDispatch } from "react-redux"
import { filterByCreatedOrExisting } from '../../store/actions'

export default function FilterCreate(){

    let dispatch = useDispatch()

    function onSelectChange(e){ 
        dispatch(filterByCreatedOrExisting(e.target.value))
    }

    return(
        <select name='select' onChange={onSelectChange} >
            <option value='Mostrar todos'>Filtrar</option>
            <option value='pokemonsExistentes'>Mostrar Pokemons existentes</option>
            <option value='creadosPorNosotros'>Mostrar Pokemons creados</option>
        </select>
    )
}