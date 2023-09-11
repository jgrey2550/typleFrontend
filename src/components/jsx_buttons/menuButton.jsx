import React from "react";
import { useNavigate } from "react-router-dom";

function MenuButton({changeScreen}) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/menu');
    }

    return <div>
        <p className="navButton" onClick={() => handleClick()}>Menu</p>
    </div>
}

export default MenuButton;