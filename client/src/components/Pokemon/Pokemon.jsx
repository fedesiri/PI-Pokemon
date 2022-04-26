import s from './Pokemon.module.css'
import { Link } from 'react-router-dom'
import { capitalizeLetter } from '../../utils'

export default function Pokemon({nombre, imagen, tipos, id}) {    

    return (        
        <div className={s.padre}>

            <div className={s.hijo1}>
                <Link className={s.nombrePokemon} to={'/pokemon/detail/'+ id}>{capitalizeLetter(nombre)}</Link>
            </div>
            

            <div className={s.hijo2}>
                <h4>{tipos.length > 1 ? 'Tipos: ' : 'Tipo: '}</h4>
                <ul>
                {tipos?.map((tipo) =>{
                    return <li key={tipo.id}>{capitalizeLetter(tipo.nombre)} </li>                    
                })}      
                </ul>
            </div>
            
            <div className={s.hijo3}>
                <img src={imagen} alt='imagen no encontrada' />
            </div>
        </div>        
    ) 
}