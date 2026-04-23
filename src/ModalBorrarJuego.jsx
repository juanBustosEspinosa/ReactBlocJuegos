import { useContext } from "react";
import Contexto from "./Contexto";

function ModalBorrarJuego({juego,limpiarBorrar,visible, eliminarJuego})
{
    let {usuario} = useContext(Contexto)
    return(<>
     <div className={`modal-borrar ${visible == true ? " modal-visible" : ""} `}>
          <div className="modal">
              <button className="btn-borrar" onClick={(evento) => {
                eliminarJuego(juego._id);
                fetch(`https://blocjuegosapi.onrender.com/eliminarJuego`, {
                    method: "DELETE",
                    body : JSON.stringify({idJuego : juego._id}),
                    headers : {
                                "Authorization": "Bearer " + usuario.token,
                                "Content-Type": "application/json"
                            }
                });
                limpiarBorrar();                
              }}>Borrar</button>
              <button className="btn-borrar" onClick={() => limpiarBorrar()}>Cancelar</button>
          </div>
      </div>    
    </>);
}

export default ModalBorrarJuego;