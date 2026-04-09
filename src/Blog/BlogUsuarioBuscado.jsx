import { useContext } from "react";
import Contexto from "../Contexto";
import { Link,useLocation } from "react-router-dom";


function BlogUsuarioBuscado()
{
    let location = useLocation();
    let { usuario } = useContext(Contexto);
    let user = location.state?.user;

     function TextoColor(r, g, b)
    {
        //Formula de como percibimos los colores para poner de color el texto
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
        return luminance > 186 ? "black" : "white";
    }

    function colorAvatar()
    {
        let color = [];
        for (let i = 0; i < 3; i++)
            color.push(Math.floor(Math.random() * 256));
        return {
                backgroundColor: `rgb(${color.join(",")})`,
                color: TextoColor(color[0], color[1], color[2])
            }
    }

    return (<>
        <Link to="/">Volver</Link>
        <div className="PerfilUsuario">
            <div className="avatar" style={colorAvatar()}>{user?.nickname?.charAt(0)}</div>
            <div className="PerfilDivParrafos">
                <p className="PerfilParrafos">Nickname: {user?.nickname}</p>
                <p className="PerfilParrafos">Correo: {user?.correo}</p>
                <p className="PerfilParrafos">Descripcion: {user?.descripcion}</p>
            </div>
        </div>
    </>);
}

export default BlogUsuarioBuscado;