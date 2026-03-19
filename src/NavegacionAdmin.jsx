import { Link } from "react-router-dom";

function NavegacionAdmin()
{
    return(<>
        <nav>
            <ul>
                <li><Link to={"/adminUsuarios"}>Usuarios</Link></li>
                <li><Link to={"/adminJuegos"}>Juegos</Link></li>
            </ul>
        </nav>
    </>);
}

export default NavegacionAdmin;