import { useContext } from "react";
import Contexto from "./Contexto";

function ModalBorrar({user,limpiarBorrar,visible, eliminarUsuario})
{
    let {usuario} = useContext(Contexto)
    return(<>
     <div className={`modal-borrar ${visible == true ? " modal-visible" : ""} `}>
          <div className="modal">
              <button className="btn-borrar" onClick={(evento) => {
                eliminarUsuario(user.correo);
                fetch(`https://blocjuegosapi.onrender.com/eliminarUsuario`, {
                    method: "DELETE",
                    body : JSON.stringify({idUsuario : user._id}),
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

export default ModalBorrar;