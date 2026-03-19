import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Resgistro()
{
    let navigate = useNavigate();
    let [nickname, setNickname] = useState("");
    let [password, setPassword] = useState("");
    let [correo, setCorreo] = useState("");
    let [descripcion, setDescripcion] = useState("");
    let [pError, setPError] = useState("");
    return(<>
        <form onSubmit={(evento) => {
            setPError("");
            let error = [];
            evento.preventDefault();
            if (!nickname || nickname.trim() == "")
                error.push("el nickname"); 
            if (!password || password.trim() == "")
                error.push("la contraseña"); 
            if (!correo || correo.trim() == "")
                error.push("el correo"); 
            if (!descripcion || descripcion.trim() == "")
                error.push("la descripcion");
            if (error.length > 0)
                return setPError(error.join(", ") + " Estos campos estan mal");

            fetch("http://localhost:3000/crearUsuario",{
                method : "POST",
                headers : {
                    "Content-type" : "application/json"                   
                },
                body : JSON.stringify({usuario : {nickname,correo,password,descripcion}})
            })
            .then(async (respuesta) => {
                let status = respuesta.status;
                let datos = await respuesta.json()
                console.log(status);
                if (status === 201)//cuidado si se cambia el status que envia
                    navigate("/login");
                setPError(datos.mensaje);
            })
            .catch(error => {
                console.log(error);
            })

        }}>
            <input type="text" placeholder="Nickname" onChange={(evento) => setNickname(evento.target.value)} />
            <input type="password" placeholder="Contraseña" onChange={(evento) => setPassword(evento.target.value)}/>
            <input type="text" placeholder="Correo Electronico" onChange={(evento) => setCorreo(evento.target.value)} />
            <textarea name="Descripcion" onChange={(evento) => setDescripcion(evento.target.value)}></textarea>
            <p className={pError != "" ? "" : "invisible"}>{pError}</p>
            <input type="submit" value="Enviar" />
        </form>
    </>)
}

export default Resgistro;