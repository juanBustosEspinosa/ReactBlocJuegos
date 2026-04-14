import { useContext, useEffect, useState } from "react";
import Contexto from "../Contexto";
import { Link, useNavigate } from "react-router-dom";
import Busqueda from "./Busqueda.jsx"
import LiJuegoUsuario from "./LijuegoUsuario.jsx";
import BusquedaJuegos from "./BusquedaJuegos.jsx";
function Blog()
{
    let {usuario} = useContext(Contexto);
    let navigate = useNavigate();
    let [busqueda,setBusqueda] = useState([]);
    let [color,setColor] = useState(colorAvatar())
    let [limite, setLimite] = useState(5)
    let [juegosInit,setJuegosInit] = useState([]);
    let [juegos,setJuegos] = useState([]);
    let [carga, setCarga] = useState(true);
    let [busquedaActiva, setBusquedaActiva] = useState(false);
    let [likes, setLikes] = useState([])

    useEffect(() => {
        if (!usuario)
            navigate("/login");

        fetch("http://localhost:3000/inicioJuegos",{
            method : "GET",
            headers: {
                "Authorization": "Bearer " + usuario.token
            }
        })
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            setJuegosInit(respuesta.juegos)
        })


        fetch(`http://localhost:3000/darLikes?idUsuario=${usuario._id}`,{
            method : "GET",
            headers: {
                "Authorization": "Bearer " + usuario.token
            }
        })
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            setLikes(respuesta);
            console.log(respuesta);
        })

    },[]);

    function cargaJuegos(datos)
    {
        setBusquedaActiva(true);
        setJuegos(datos)
        setCarga(false);
    }
    function modificarBusqueda(datos)
    {
        setBusqueda(datos);
    }

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
    function addLike(like)
    {
        setLikes([...likes, like])
    }

    function deleteLike(li)
    {
        setLikes(likes.filter(like => like._id != li._id ))
    }

    function tieneLike(idJuego)
    {
        return likes.some(like => like.idJuego == idJuego);
    }
    return (<>
        <div className="PerfilUsuario">
            <div className="avatar" style={color}>{usuario?.nickname?.charAt(0)}</div>
            <div className="PerfilDivParrafos">
                <p className="PerfilParrafos">Nickname: {usuario?.nickname}</p>
                <p className="PerfilParrafos">Correo: {usuario?.correo}</p>
                <p className="PerfilParrafos">Descripcion: {usuario?.descripcion}</p>
            </div>
        </div>
        <div className="buscadorWrapper">
            <Busqueda accion={"buscarUsuarios"} modificarBusqueda={modificarBusqueda} setLimite={setLimite}/>
            <div className={busqueda.length > 0 ? `resultadosBusqueda` : `invisible`}>
                {Array.isArray(busqueda) && busqueda.length > 0 ? (busqueda.slice(0,limite).map((user) => (
                    <div key={user._id} className="resultadoItem">
                        <div className="avatar" style={colorAvatar()}>
                            {user.nickname.charAt(0)}
                        </div>
                        <Link to={`/BlogUsuario/${user._id}`} state={{ user: user }}>
                            {user.nickname}
                        </Link>
                    </div>
                ))) : ""}
                <div className="btn-busqueda">
                    {busqueda.length > limite ?
                        <button onClick={() => setLimite(limite + 5)}>Ver más</button>
                        : <button className="invisible">Ver más</button>
                    }
                    {limite > 5 ?
                        <button onClick={() => setLimite(limite - 5)}>Ver menos</button>
                        : <button className="invisible">Ver menos</button>
                    }
                </div>
            </div>
        </div>

        <BusquedaJuegos cargaJuegos={cargaJuegos} setBusquedaActiva={setBusquedaActiva}/>
        <div className="divJuegosAd">
            {
                (carga || !busquedaActiva)  ? juegosInit.map(juego => (
                    <LiJuegoUsuario key={juego._id} juego={juego} like={tieneLike(juego._id)} addLike={addLike} deleteLike={deleteLike}/>
                )) : busquedaActiva && juegos.length > 0 ? (juegos.map(juego => (
                    <LiJuegoUsuario key={juego._id} juego={juego} like={tieneLike(juego._id)} addLike={addLike} deleteLike={deleteLike}/>
                ))) : <li>No hay juegos disponibles</li> 
            }
        </div>


        

    </>)
        /*Problemas cuando no hay juegos en un boton se ponen juegosinit*/
}

export default Blog;