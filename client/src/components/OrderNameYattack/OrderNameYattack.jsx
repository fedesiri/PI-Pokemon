// import s from './OrderNameYattack.module.css'
import { useDispatch } from 'react-redux'
import { sortByNameByAttack } from '../../store/actions'

export default function OrderNameYattack(){

    const dispatch = useDispatch()

    function onSelectChange(e){
        dispatch(sortByNameByAttack(e.target.value))
    }

    return (
        <select name='select' onChange={onSelectChange}>
            <option value='Ordenar'>Ordenar</option>
            <option value='A-Z'>Ordena alfabeticamente A-Z</option>
            <option value='Z-A'>Ordena alfabeticamente Z-A</option>
            <option value='attack-asc'>Ordena por fuerza de menor a mayor</option>
            <option value='attack-des'>Ordena por fuerza de mayor a menor</option>
        </select>
    )
}