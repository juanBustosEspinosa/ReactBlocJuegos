import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Contexto from "./Contexto";


function ModalEditarUsuario({user,limpiarBorrar,visible})
{
    let {usuario} = useContext(Contexto);
    let [nickname, setNickname] = useState("");
    let [password, setPassword] = useState("");
    let [descripcion, setDescripcion] = useState("");

    useEffect(()=>{
        setNickname(user.nickname);
        setDescripcion(user.descripcion);
    },[]) 
    

    return(<>
        <div className={`modal-editar ${visible == true ? " modal-visible" : ""}`}>
            <div className="modal">

                <input type="text" placeholder="nickname" defaultValue={nickname} onChange={(evento) => setNickname(evento.target.value)} />
                <input type="password" placeholder="Password" onChange={(evento) => setPassword(evento.target.value)} />
                <input type="text" placeholder="Correo" defaultValue={user.correo} disabled />
                <textarea name="Descripcion" className="registro-textArea" maxLength={200} defaultValue={descripcion} onChange={(evento) => setDescripcion(evento.target.value)}></textarea>
                <div>
                    <button className="btn-editar" onClick={(evento) => {
                        evento.preventDefault();
                        let crearusuario = {nickname, correo : user.correo, descripcion};
                        if (password)
                            crearusuario.password = password;
                        fetch("https://blocjuegosapi.onrender.com/actualizarUsuario",{
                            method : "PUT",
                            headers : {
                                "Authorization": "Bearer " + usuario.token,
                                "Content-Type": "application/json"
                            },
                            body : JSON.stringify({usuario : crearusuario})
                        })
                        .then(respuesta => respuesta.json());

                        limpiarBorrar();
                        }}>Guardar</button>

                    <button className="btn-editar" onClick={() => limpiarBorrar()}>Cancelar</button>
                </div>
            </div>
      </div>
    </>);
}

export default ModalEditarUsuario;