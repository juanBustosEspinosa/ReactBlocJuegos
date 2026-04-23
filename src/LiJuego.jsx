import { useState } from "react";
import ModalBorrarJuego from './ModalBorrarJuego.jsx';
import ModalEditarJuego from './ModalEditarJuego.jsx'

function LiJuego({juego,eliminarJuego})
{
    let [visibleBorrar,setVisibleBorrar] = useState(false);
    let [visibleEditar,setVisibleEditar] = useState(false);

    function limpiarBorrar()
    {
        setVisibleEditar(false);
        setVisibleBorrar(false);
    }    
    return(<>
        <li className="liJuegoAd">
            <div className="divImagenJuego">
                <img className="imgJuegoAd" src={`https://blocjuegosapi.onrender.com/` + juego.rutaImagen} alt="" />
            </div>
            <p className="pJuegoAd">{juego.titulo}</p>
            <p className="pJuegoAd">{juego.desarrollador}</p>
            <p className="pJuegoAd">{juego.fecha}</p>
            <button className="btn-JuegoAd" onClick={() => setVisibleEditar(true)}>Editar</button>
            <button className="btn-JuegoAd" onClick={() => setVisibleBorrar(true)}>Borrar</button>
        </li>
        <ModalBorrarJuego  juego={juego} limpiarBorrar={limpiarBorrar} visible={visibleBorrar} eliminarJuego={eliminarJuego}/>
        <ModalEditarJuego juego={juego} limpiarBorrar={limpiarBorrar} visible={visibleEditar}/>
    </>)
}

export default LiJuego;