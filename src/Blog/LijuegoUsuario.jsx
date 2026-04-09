function LiJuegoUsuario({juego})
{

    return(<>
        <li className="liJuegoAd">
            <img className="imgJuegoAd" src={`http://localhost:3000/` + juego.rutaImagen} alt="" />
            <p className="pJuegoAd">{juego.titulo}</p>
            <p className="pJuegoAd">{juego.desarrollador}</p>
            <p className="pJuegoAd">{juego.fecha}</p>
        </li>
    </>)
}

export default LiJuegoUsuario;