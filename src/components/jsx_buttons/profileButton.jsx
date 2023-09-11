import React from "react";
import { useNavigate } from "react-router-dom";

function ProfileButton({changeScreen}) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/profile');
    }

    return <div>
        <p className="navButton" onClick={handleClick}>Profile</p>
    </div>
}

export default ProfileButton;