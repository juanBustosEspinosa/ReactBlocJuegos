import { useContext, useState, useEffect } from "react";
import Contexto from "./Contexto";
import LiUsuario from "./LiUsuario";

function Usuarios()
{
    let [usuarios,setUsuarios] = useState([]);
    let {usuario} = useContext(Contexto);

    useEffect(() => {
        fetch("http://localhost:3000/darUsuarios",{
            method : "GET",
            headers : {
                "Authorization": "Bearer " + usuario.token
            }
        })
        .then(respuesta => respuesta.json())
        .then(respuesta => setUsuarios(respuesta.usuarios));
    },[]);

    function eliminarUsuario(correo)
    {
        setUsuarios(usuarios.filter(usuario => correo != usuario.correo))
    }

    return(<>
        <ul>
            {
                usuarios.length == 1 ? 
                <li>No hay usuarios Resgistrados A parte del administrador</li> :
                usuarios.map((user) => {
                    return <LiUsuario key={user._id} usuario={user} eliminarUsuario={eliminarUsuario}/>
                })
            }
        </ul>
    </>)
}

export default Usuarios;