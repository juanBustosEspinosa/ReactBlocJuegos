import { useEffect } from "react";
import { useState } from "react";
import LiJuego from "./LiJuego";
import Contexto from './Contexto'
import { useContext } from "react";
import SubirJuego from "./SubirJuego";

function Juegos()
{
    let [juegos,setJuegos] = useState([]);
    let {usuario} = useContext(Contexto);

    
    useEffect(() => {
        fetch("http://localhost:3000/darJuegos",{
            method : "GET",
            headers : {
                "Authorization": "Bearer " + usuario.token
            }
        })
        .then(respuesta => respuesta.json())
        .then(respuesta => setJuegos(respuesta.juegos));
    },[])

    function eliminarJuego(id)
    {
        setJuegos(juegos.filter(juego => juego._id != id));
    }
    function addJuego(juego)
    {
        setJuegos([juego,...juegos]);
    }
    
    return(<>
        <SubirJuego addJuego={addJuego} />
        <div className="divJuegosAd">
        {
            juegos.length == 0 ?
            <li>No hay juegos</li> :
            juegos.map((juego) => {
                return(<LiJuego key={juego._id} juego={juego} eliminarJuego={eliminarJuego}/>)
            })
        }
        </div>
    </>)
}

export default Juegos;