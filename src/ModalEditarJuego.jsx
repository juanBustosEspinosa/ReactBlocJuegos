import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Contexto from "./Contexto";


function ModalEditarJuego({juego,limpiarBorrar,visible})
{
    let {usuario} = useContext(Contexto);
    let [titulo, setTitulo] = useState("");
    let [genero, setGenero] = useState("");
    let [desarrollador, setDesarrollador] = useState("");
    let [fecha, setFecha] = useState("");
    let [plataforma, setPlataforma] = useState("");
    let [descripcion, setDescripcion] = useState("");
    let [rutaImagen, setRutaImagen] = useState("");

    useEffect(()=>{
        setTitulo(juego.titulo);
        setGenero(juego.genero);
        setDesarrollador(juego.desarrollador);
        setFecha(juego.fecha);
        setPlataforma(juego.plataforma);
        setDescripcion(juego.descripcion);
        setRutaImagen(juego.rutaImagen);
    },[]) 

    return(<>
        <div className={`modal-editar ${visible == true ? " modal-visible" : ""}`}>
            <div className="modal">

                <input type="text" placeholder="titulo" defaultValue={titulo} onChange={(evento) => setTitulo(evento.target.value)} />
                <input type="text" placeholder="genero" defaultValue={genero} onChange={(evento) => setGenero(evento.target.value)} />
                <input type="text" placeholder="desarrollador" defaultValue={desarrollador} onChange={(evento) => setDesarrollador(evento.target.value)} />
                <input type="date" placeholder="fecha" defaultValue={fecha} onChange={(evento) => setFecha(evento.target.value)} />
                <input type="text" placeholder="plataforma" defaultValue={plataforma} onChange={(evento) => setPlataforma(evento.target.value)} />
                <textarea className="registro-textArea" name="Descripcion" defaultValue={descripcion} onChange={(evento) => setDescripcion(evento.target.value)}></textarea>
                <input type="text" placeholder="rutaImagen" defaultValue={rutaImagen} onChange={(evento) => setRutaImagen(evento.target.value)} />

                <button className="btn-editar" onClick={(evento) => {
                    evento.preventDefault();
                    let updateJuego = {_id : juego._id,titulo,genero,desarrollador,fecha,plataforma,descripcion,rutaImagen};
                    fetch("https://blocjuegosapi.onrender.com/actualizarJuego",{
                        method : "PUT",
                        headers : {
                            "Authorization": "Bearer " + usuario.token,
                            "Content-Type": "application/json"
                        },
                        body : JSON.stringify({juego : updateJuego})
                    })
                    .then(respuesta => respuesta.json())
                    .then(respuesta => console.log(respuesta));

                    limpiarBorrar();
                    }}>Guardar</button>

                <button className="btn-editar" onClick={() => limpiarBorrar()}>Cancelar</button>
            </div>
      </div>
    </>);
}

export default ModalEditarJuego;