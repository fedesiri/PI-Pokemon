export default function Pokemon({nombre, imagen, tipos}) {
    return (
        <div>
            <h3>{nombre}</h3>
            <img src={imagen} alt='imagen no encontrada' />
            {tipos?.map((tipo) =>{
                return <h4 key={tipo.id}>{tipo.nombre}</h4>                    
            })}            
        </div>
    ) 
}