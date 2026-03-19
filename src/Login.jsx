import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Contexto from "./Contexto";

function Login()
{
    let navigate = useNavigate();
    let {setUsuario} = useContext(Contexto);
    let [password, setPassword] = useState("");
    let [correo, setCorreo] = useState("");
    let [pError, setPError] = useState("");
    return(<>
        <form onSubmit={(evento) => {
            setPError("");
            let error = [];
            evento.preventDefault();
            if (!password || password.trim() == "")
                error.push("la contraseña"); 
            if (!correo || correo.trim() == "")
                error.push("el correo"); 
            if (error.length > 0)
                return setPError(error.join(", ") + " Estos campos estan mal");

            fetch("http://localhost:3000/login",{
                method : "POST",
                headers : {
                    "Content-type" : "application/json"                   
                },
                body : JSON.stringify({correo,password})
            })
            .then(async (respuesta) => {

                let datos = await respuesta.json();
                if (respuesta.status !== 201)
                    return setPError(datos.mensaje);
                setUsuario(datos);
                console.log(datos);
                if (datos.correo == "admin@admin")
                    return navigate("/adminUsuarios");
                return navigate("/");
            })
            .catch(error => {
                console.log(error);
            })
        }}>
            <input type="text" placeholder="Correo Electronico" onChange={(evento) => setCorreo(evento.target.value)} />
            <input type="password" placeholder="Contraseña" onChange={(evento) => setPassword(evento.target.value)}/>
            <p className={pError != "" ? "" : "invisible"}>{pError}</p>
            <input type="submit" value="Enviar" />
        </form>
    </>)
}

export default Login;