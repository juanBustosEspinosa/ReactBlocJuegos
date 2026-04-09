import { useContext } from "react";
import Contexto from "./Contexto";

function ModalBorrarJuego({juego,limpiarBorrar,visible, eliminarJuego})
{
    let {usuario} = useContext(Contexto)
    return(<>
     <div className={`modal-borrar ${visible == true ? " modal-visible" : ""} `}>
          <div className="modal">
              <button className="btn-borrar" onClick={(evento) => {
                eliminarJuego(juego.titulo, juego.desarrollador);
                fetch(`http://localhost:3000/eliminarJuego`, {
                    method: "DELETE",
                    body : JSON.stringify({titulo : juego.titulo, desarrollador : juego.desarrollador}),
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