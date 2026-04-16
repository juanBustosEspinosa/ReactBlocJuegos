import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Marquee from "./marquee";
function Resgistro()
{
    let navigate = useNavigate();
    let [nickname, setNickname] = useState("");
    let [password, setPassword] = useState("");
    let [correo, setCorreo] = useState("");
    let [descripcion, setDescripcion] = useState("");
    let [pError, setPError] = useState("");
    return(<>
        <Marquee />
        <form className="login-form" onSubmit={(evento) => {
            setPError("");
            let error = 0;
            evento.preventDefault();
            if (!nickname || nickname.trim() == "")
                error++;
            if (!password || password.trim() == "")
                error++; 
            if (!correo || correo.trim() == "")
                error++; 
            if (!descripcion || descripcion.trim() == "")
                error++;
            if (error > 0)
            {
                error = 0;
                return setPError("el nickname, la contraseña, el correo o la descripcion estan mal");
            }

            const repex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
            if (!repex.test(correo))
                return setPError("el correo no es valido");

            fetch("http://localhost:3000/crearUsuario",{
                method : "POST",
                headers : {
                    "Content-type" : "application/json"                   
                },
                body : JSON.stringify({ usuario: {
                    nickname: nickname.trim(),
                    correo: correo.trim().toLowerCase(),
                    password: password,
                    descripcion: descripcion.trim()
                }})
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
            <div className="login-div">
                <input className="login-inputs" type="text" placeholder="Nickname" onChange={(evento) => setNickname(evento.target.value)} />
                <input className="login-inputs" type="password" placeholder="Contraseña" onChange={(evento) => setPassword(evento.target.value)}/>
                <input className="login-inputs" type="text" placeholder="Correo Electronico" onChange={(evento) => setCorreo(evento.target.value)} />
                <textarea className="registro-textArea"  name="Descripcion"   maxLength={200} onChange={(evento) => setDescripcion(evento.target.value)}></textarea>
                <p className={pError != "" ? "error-login" : "invisible"}>{pError}</p>
                <div className="login-div-btns">
                    <input className="login-btn" type="submit" value="Enviar" />
                    <button className="login-btn" onClick={() => {
                        navigate("/login")
                    }}>Volver</button>
                </div>
            </div>
        </form>
        <Marquee />
        <Nave />
    </>)
}

export default Resgistro;