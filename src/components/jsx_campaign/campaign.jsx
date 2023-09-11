import React from "react";

import level1Img from "../pictures/1.png";
import level2Img from "../pictures/2.png";
import level3Img from "../pictures/3.png";
import level4Img from "../pictures/4.png";
import level5Img from "../pictures/5.png";
import level6Img from "../pictures/6.png";
import level7Img from "../pictures/7.png";
import level8Img from "../pictures/8.png";
import level9Img from "../pictures/9.png";
import level10Img from "../pictures/0.png";

//menu function that passes in onScreenChangeCampaignLevel component from parent class
//destructing it with {} so we can use it as a function 
function Campaign({onScreenChangeCampaignLevel}) {
    const handleClick = (level) => {
        console.log(level);
        //using onScreenChange as a function
        onScreenChangeCampaignLevel(1, level);
    }

    return <div>
        <h1>Levels</h1>
        <img src={level1Img} onClick={() => handleClick(1)}/>
        <img src={level2Img} onClick={() => handleClick(2)}/>
        <img src={level3Img} onClick={() => handleClick(3)}/>
        <img src={level4Img} onClick={() => handleClick(4)}/>
        <img src={level5Img} onClick={() => handleClick(5)}/>
        <img src={level6Img} onClick={() => handleClick(6)}/>
        <img src={level7Img} onClick={() => handleClick(7)}/>
        <img src={level8Img} onClick={() => handleClick(8)}/>
        <img src={level9Img} onClick={() => handleClick(9)}/>
        <img src={level10Img} onClick={() => handleClick(10)}/>
    </div>
}

export default Campaign;