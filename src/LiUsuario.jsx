import { useState } from "react";
import ModalBorrar from "./ModalBorrar";
import ModalEditarUsuario from "./ModalEditarUsuario";
import "./modal.css";


function LiUsuario({usuario,eliminarUsuario})
{

    let [visibleBorrar,setVisibleBorrar] = useState(false);
    let [visibleEditar,setVisibleEditar] = useState(false);

    function limpiarBorrar()
    {
        setVisibleEditar(false);
        setVisibleBorrar(false);
    }    

    return(<>
        <li className="usuarioLi">{usuario.correo}
            {
                usuario.correo == "admin@admin" ?
                <button className="btn-invalido" disabled>Borrar</button> :
                <button onClick={(evento) => {
                    evento.stopPropagation();
                    setVisibleBorrar(true);
                }}>Borrar</button>
            }
            <button onClick={(evento) => {
                evento.stopPropagation();
                setVisibleEditar(true);
            }}>Editar</button>

        </li>
        <ModalBorrar user={usuario} limpiarBorrar={limpiarBorrar} visible={visibleBorrar} eliminarUsuario={eliminarUsuario}/>
        <ModalEditarUsuario user={usuario} limpiarBorrar={limpiarBorrar} visible={visibleEditar}/>
    </>)

}

export default LiUsuario;