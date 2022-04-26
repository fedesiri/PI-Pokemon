import React from "react";
import s from './Paginado.module.css'

export default function Paginado ({pokemonsPorPagina, pokemons, paginado, paginaActual, paginadoAnterior, paginadoSiguiente}){
    const numeroDePaginas = []

    for(var i = 1; i <= Math.ceil(pokemons/pokemonsPorPagina); i++){
        numeroDePaginas.push(i)
    }

    return(
        <div className={s.padre}>
        <nav className={s.nav}>
            <ul className={s.ul}>
            <button className={paginaActual === "Anterior" ? s.botonSeleccionado : s.boton} onClick={paginadoAnterior}>Anterior</button>
            
                { numeroDePaginas && 
                numeroDePaginas.map(numero =>(                    
                    <li className={s.li} key={numero}>
                       <button className={paginaActual === numero ? s.botonSeleccionado : s.boton } onClick={() => paginado(numero)}>{numero}</button>
                    </li>
                ))}
            <button className={paginaActual === "Proximo" ? s.botonSeleccionado : s.boton} onClick={paginadoSiguiente}>Proximo</button>
            </ul>
        </nav>
        </div>
    )
}