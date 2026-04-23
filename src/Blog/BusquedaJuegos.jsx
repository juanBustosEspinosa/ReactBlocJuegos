import { useContext } from "react";
import { useEffect, useRef } from "react";
import Contexto from "../Contexto";
import { useState } from "react";

function BusquedaJuegos({cargaJuegos,setBusquedaActiva})
{
    const ref = useRef(null);
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    useEffect(() => {
    const el = ref.current;

    const handleWheel = (e) => {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
        el.removeEventListener("wheel", handleWheel);
    };
    }, []);


    let { usuario } = useContext(Contexto);

    const [texto, setTexto] = useState("");
    const [debounced, setDebounced] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounced(texto);
        }, 300);

        return () => clearTimeout(timeout);
    }, [texto]);

    useEffect(() => {
        if (!debounced || !usuario?.token){
            setBusquedaActiva(false);
            return;
        }

        fetch(`https://blocjuegosapi.onrender.com/buscarJuegos?titulo=${debounced}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + usuario.token
            }
        })
        .then(respuesta => respuesta.json())
        .then(respuesta => cargaJuegos(respuesta.juegos))
        .catch(error => console.log(error));

    }, [debounced]);

    return (<>
        <div className="contenedorBusquedaJ">
        <input className="BusquedaInput" type="text" placeholder="Busqueda" onChange={(e) => setTexto(e.target.value)}/>

        <div className="contenedorBotonesJ" ref={ref}>
            <button className="btn-busquedaJ" onClick={(evento) => {
                evento.preventDefault();
                fetch(`https://blocjuegosapi.onrender.com/darJuegosLikes?idUsuario=${usuario._id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + usuario?.token
                    }
                })
                .then(respuesta => respuesta.json())
                .then(respuesta => { console.log(respuesta)
                    cargaJuegos(respuesta.juegos)})
            }}>Me Gusta</button>

            {letras.map((letra) => (
            <button className="btn-busquedaJ" key={letra} onClick={(evento) => {
                evento.preventDefault();
                fetch(`https://blocjuegosapi.onrender.com/buscarJuegos?titulo=${letra}`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + usuario?.token
                    }
                })
                .then(respuesta => respuesta.json())
                .then(respuesta => cargaJuegos(respuesta.juegos))
            }}>
                {letra}
            </button>
            ))}
        </div>
        </div>
    </>);
}

export default BusquedaJuegos;