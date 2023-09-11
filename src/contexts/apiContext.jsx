import React from "react";

const ApiContext = React.createContext();

const ApiProvider = ({ children }) => {
    const apiUrl = 'http://localhost:5000';
    //switch for deploy https://typle-api.vercel.app
    //switch for local http://localhost:5000

    return (
        <ApiContext.Provider value={{ apiUrl }}>
            {children}
        </ApiContext.Provider>
    );
};

export { ApiContext, ApiProvider };