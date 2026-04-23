import { useContext } from "react";
import Contexto from "../Contexto";

function LiJuegoUsuario({juego, like, addLike, deleteLike, disable})//variable con el true o false
{

    let {usuario} = useContext(Contexto) 

    return(<>
        <li className="liJuegoAd">
            <div className="divImagenJuego">
                <button className={disable ? `invisible` : `btn-like`} onClick={(evento) => {
                    evento.preventDefault();
                    console.log("hola entre");
                    if (!like)
                    {
                        fetch("https://blocjuegosapi.onrender.com/crearLike", {
                            method: "POST",
                            body : JSON.stringify({Like : {idUsuario : usuario._id, idJuego : juego._id}}),
                            headers : {
                                "Authorization": "Bearer " + usuario.token,
                                "Content-Type": "application/json"
                            }
                        })
                        .then(respuesta => respuesta.json())
                        .then(respuesta => addLike({idUsuario : usuario._id, idJuego: juego._id })) //hay que hacer algo para que el like cambie
                    } 
                    else 
                    {   
                        fetch("https://blocjuegosapi.onrender.com/eliminarlike", {
                            method: "DELETE",
                            body : JSON.stringify({idUsuario : usuario._id, idJuego : juego._id}),
                            headers : {
                                "Authorization": "Bearer " + usuario.token,
                                "Content-Type": "application/json"
                            }
                        })
                        .then(respuesta => respuesta.json())
                        .then(respuesta => deleteLike(juego._id))//hay que hacer algo para que el like cambie
                    }
                    

                }}><span className={like ? `corazon activo` : `corazon`}>{like ? "❤️" : "🤍"}</span></button>   
                <img className="imgJuegoAd" src={`https://blocjuegosapi.onrender.com/` + juego.rutaImagen} alt="" />
            </div>
            <p className="pJuegoAd">{juego.titulo}</p>
            <p className="pJuegoAd">{juego.desarrollador}</p>
            <p className="pJuegoAd">{juego.fecha}</p>
        </li>
    </>)
}

export default LiJuegoUsuario;