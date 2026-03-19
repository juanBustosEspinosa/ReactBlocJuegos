import { createContext, useState } from "react";

const Contexto = createContext();

export const ProviderContexto = ({ children }) => {
    const [usuario, setUsuario] = useState(null); 

    return (
        <Contexto.Provider value={{ usuario, setUsuario }}>
            {children}
        </Contexto.Provider>
    );
};

export default Contexto;