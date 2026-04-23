import { useContext, useState, useEffect } from "react";
import Contexto from "../Contexto";

function Busqueda({ accion, modificarBusqueda, setLimite }) {

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
        setLimite(5);
        if (!debounced){
            modificarBusqueda([]);
            return;
        }

        fetch(`https://blocjuegosapi.onrender.com/${accion}?nickname=${debounced}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + usuario.token
            }
        })
        .then(respuesta => respuesta.json())
        .then(respuesta => modificarBusqueda(respuesta.usuarios))
        .catch(error => console.log(error));

    }, [debounced]);

    return (
        <input className="BusquedaInput" type="text" placeholder="Busqueda Usuario" onChange={(e) => setTexto(e.target.value)} />
    );
}

export default Busqueda;