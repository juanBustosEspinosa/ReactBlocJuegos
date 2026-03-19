function LiJuego({juego})
{
    console.log(juego.rutaImagen)
    return(<>
        <li className="liJuegoAd">
            <img className="imgJuegoAd" src={`http://localhost:3000/` + juego.rutaImagen} alt="" />
            <p className="pJuegoAd">{juego.titulo}</p>
            <p className="pJuegoAd">{juego.desarrollador}</p>
            <p className="pJuegoAd">{juego.fecha}</p>
            <button className="btn-JuegoAd">Editar</button>
            <button className="btn-JuegoAd">Borrar</button>
        </li>
    </>)
}

export default LiJuego;