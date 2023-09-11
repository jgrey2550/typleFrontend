import React from "react";
import { useNavigate } from "react-router-dom";

function ShopButton({changeScreen}) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/shop');
    }

    return <div>
        <p className="navButton" onClick={() => handleClick()}>Shop</p>
    </div>
}

export default ShopButton;