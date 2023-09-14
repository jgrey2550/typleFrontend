import React from "react";

const ApiContext = React.createContext();

const ApiProvider = ({ children }) => {
    const apiUrl = 'http://localhost:5000';
    //switch for vercel api https://typle-api.vercel.app
    //switch for local http://localhost:5000
    //switch for gcp api https://our-bruin-398600.uc.r.appspot.com

    return (
        <ApiContext.Provider value={{ apiUrl }}>
            {children}
        </ApiContext.Provider>
    );
};

export { ApiContext, ApiProvider };