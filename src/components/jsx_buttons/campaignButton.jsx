import React from "react";

function CampaignButton({onScreenChangeCampaign}) {
    const handleClick = () => {
        onScreenChangeCampaign(2);
    }

    return <div>
        <p onClick={handleClick}>Campaign</p>
    </div>
}

export default CampaignButton;