import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Contexto from "./Contexto";

function SubirJuego()
{
    let navigate = useNavigate();
    const [titulo,setTitulo] = useState("");
    const [descripcion,setDescripcion] = useState("");
    const [genero,setGenero] = useState("");
    const [plataforma,setPlataforma] = useState("");
    const [fecha,setFecha] = useState("");
    const [desarrollador,setDesarrollador] = useState("");
    const [imagen,setImagen] = useState(null);
    let {usuario} = useContext(Contexto);
    console.log(usuario);
    return(<>
        <form onSubmit={(evento) => {
            evento.preventDefault();
            let formData = new FormData();
            formData.append("titulo", titulo);
            formData.append("genero", genero);
            formData.append("desarrollador", desarrollador);
            formData.append("fecha", fecha);
            formData.append("plataforma", plataforma);
            formData.append("descripcion", descripcion);
            formData.append("imagen", imagen); 
            fetch("http://localhost:3000/subirJuego",{
                method : "POST",
                body : formData,
                headers : {
                    "Authorization": "Bearer " + usuario.token
                }
            })
            .then(respuesta => respuesta.json())
            .then(respuesta => {
                console.log(respuesta);
            })
        }}>
            <input type="text" placeholder="Titulo del juego" onChange={(evento)=>setTitulo(evento.target.value)} />
            <textarea placeholder="Descripción" onChange={(evento)=>setDescripcion(evento.target.value)} />
            <input type="text" placeholder="Género" onChange={(evento)=>setGenero(evento.target.value)} />
            <input type="text" placeholder="Plataforma (PC, PS5...)" onChange={(evento)=>setPlataforma(evento.target.value)} />
            <input type="date" onChange={(evento)=>setFecha(evento.target.value)} />
            <input type="text" placeholder="Desarrollador" onChange={(evento)=>setDesarrollador(evento.target.value)} />
            <input type="file" onChange={(evento)=>setImagen(evento.target.files[0])} />
            <input type="submit" value="Subir Juego" />
        </form>
    </>)
}

export default SubirJuego;