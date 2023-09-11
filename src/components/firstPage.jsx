import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "./pictures/logo.png"

function FirstPage() {
    const navigate = useNavigate();
    function login() {
        navigate('/login');
    }
    function createUser() {
        navigate('/createUser');
    }

    return <div className="login-button-div">
        <img src={logo} className="first-page-logo"/>
        <h3>By Brandon Chan</h3>
            <button className="login-button primary" onClick={login}>Login</button>
            <button className="login-button secondary" onClick={createUser}>Create Account</button>
    </div>
}

export default FirstPage;