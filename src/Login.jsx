import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Contexto from "./Contexto";
import Marquee from "./Marquee";
import Nave from "./Nave";

function Login()
{
    let navigate = useNavigate();
    let {setUsuario} = useContext(Contexto);
    let [password, setPassword] = useState("");
    let [correo, setCorreo] = useState("");
    let [pError, setPError] = useState("");
    return(<>
        <Marquee />
        <form className="login-form" onSubmit={(evento) => {
            setPError("");
            let error = 0;
            evento.preventDefault();
            if (!password || password.trim() == "")
                error++; 
            if (!correo || correo.trim() == "")
                error++; 
            if (error > 0)
            {
                error = 0;
                return setPError("la contreseña o el correo estan mal");
            }

            fetch("https://blocjuegosapi.onrender.com/login",{
                method : "POST",
                headers : {
                    "Content-type" : "application/json"                   
                },
                body : JSON.stringify({correo : correo.trim().toLowerCase(),password})
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
            <div className="login-div">
                <input className="login-inputs" type="text" placeholder="Correo Electronico" onChange={(evento) => setCorreo(evento.target.value)} />
                <input className="login-inputs" type="password" placeholder="Contraseña" onChange={(evento) => setPassword(evento.target.value)}/>
                <p className={pError != "" ? "error-login" : "invisible"}>{pError}</p>
                <div className="login-div-btns">
                    <input className="login-btn" type="submit" value="Enviar" />
                    <button className="login-btn" onClick={() => {
                        navigate("/registro")
                    }}>Registro</button>
                </div>
            </div>
        </form>
        <Marquee />
        <Nave />
    </>)
}

export default Login;