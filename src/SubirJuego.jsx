import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Contexto from "./Contexto";

function SubirJuego({addJuego})
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
        <div className="divSubirJuego">
        <form className="subirJuego" onSubmit={(evento) => {
            evento.preventDefault();
            let formData = new FormData();
            formData.append("titulo", titulo);
            formData.append("genero", genero);
            formData.append("desarrollador", desarrollador);
            formData.append("fecha", fecha);
            formData.append("plataforma", plataforma);
            formData.append("descripcion", descripcion);
            formData.append("imagen", imagen); 
            fetch("https://blocjuegosapi.onrender.com/subirJuego",{
                method : "POST",
                body : formData,
                headers : {
                    "Authorization": "Bearer " + usuario.token
                }
            })
            .then(respuesta => respuesta.json())
            .then(respuesta => {
                let juego = respuesta.juegocreado;
                addJuego(juego);
            })
        }}>
            <input className="input-subirjuego" type="text" placeholder="Titulo del juego" onChange={(evento)=>setTitulo(evento.target.value)} />
            <textarea placeholder="Descripción" onChange={(evento)=>setDescripcion(evento.target.value)} />
            <input className="input-subirjuego" type="text" placeholder="Género" onChange={(evento)=>setGenero(evento.target.value)} />
            <input className="input-subirjuego" type="text" placeholder="Plataforma (PC, PS5...)" onChange={(evento)=>setPlataforma(evento.target.value)} />
            <input className="input-subirjuego" type="date" onChange={(evento)=>setFecha(evento.target.value)} />
            <input className="input-subirjuego" type="text" placeholder="Desarrollador" onChange={(evento)=>setDesarrollador(evento.target.value)} />
            <input className="input-subirjuego" type="file" onChange={(evento)=>setImagen(evento.target.files[0])} />
            <input className="input-subirjuego" type="submit" value="Subir Juego" />
        </form>
        </div>
    </>)
}

export default SubirJuego;