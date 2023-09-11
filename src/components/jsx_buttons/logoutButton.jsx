import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton({changeScreen}) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/')
    }

    return <div>
        <p className="navButton" onClick={handleClick}>Logout</p>
    </div>
}

export default LogoutButton;