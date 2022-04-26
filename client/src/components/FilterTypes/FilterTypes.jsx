import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAllTypes } from '../../store/actions';
import { capitalizeLetter } from '../../utils'
import { filterByTypes } from "../../store/actions";

export default function FilterTypes(){

    let tipos = useSelector((state) => state.types)    

    let dispatch = useDispatch()
    
    useEffect(() =>{
        if(!tipos.length){
            dispatch(getAllTypes())
        }
    }, [dispatch, tipos.length])


    function onInputChangeTypes(e){
        e.preventDefault()
        dispatch(filterByTypes(e.target.value))
    }


    return(
        <select name='select' onChange={onInputChangeTypes}  >
            <option value='buscarPorTipos'>Buscar por tipos</option>
           {tipos?.map((tipo) =>{
               return <option value={tipo.nombre} key={tipo.id}>{capitalizeLetter(tipo.nombre)}</option>
           } )} 
        </select>
    )
}
