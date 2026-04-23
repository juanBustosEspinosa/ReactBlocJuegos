import { StrictMode, useContext, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import Registro from './Registro.jsx';
import Login from './Login.jsx';
import AdministracionUsuarios from './AdministracionUsuarios.jsx';
import { ProviderContexto } from './Contexto.jsx';
import AdministracionJuegos from './AdministracionJuegos.jsx';
import Blog from './Blog/Blog.jsx';
import BlogUsuario from './Blog/BlogUsuarioBuscado.jsx';



//Cuando hagamos el logout limpiar toda la memoria que tengamos
  const router = createBrowserRouter([
    {
      path : "/registro",
      element : <Registro />,
      errorElement : <h1>error en el servidor</h1>
    },
    {
      path : "/login",
      element : <Login />,
      errorElement : <h1>error en el servidor</h1>
    },
    {
      path : "/",
      element: <Blog />,//aqui iria la pagina principal
    },
    {
      path : "/adminJuegos",
      element : <AdministracionJuegos />,
      errorElement : <h1>error en el servidor</h1>
    },
    {
      path : "/adminUsuarios",
      element : <AdministracionUsuarios />,
      errorElement : <h1>error en el servidor</h1>
    },
    {
      path : "/BlogUsuario/:id",
      element : <BlogUsuario />,
      errorElement : <h1>error en el servidor</h1>
    }
  ]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProviderContexto>
      <RouterProvider router={router} />
    </ProviderContexto>
  </StrictMode>,
)
