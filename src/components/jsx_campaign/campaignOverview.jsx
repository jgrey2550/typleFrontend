import React, {useState} from 'react';
import InGame from './inGame';
import Campaign from './campaign';
import Navbar from '../navbar';

function CampaignOverview({changeScreen}) {
  const [currentScreenCampaign, setCurrentScreenCampaign] = React.useState(2);
  const [levelNum, setLevelNum] = React.useState(null);

  //callback function handleScreenChange within campaign 
  const handleScreenChangeCampaign = (newScreen) => {
    setCurrentScreenCampaign(newScreen);
  };

  //callback for selecting a level so you can change levelNum and pass it to inGame screen
  const handleScreenChangeCampaignLevel = (newScreen, levelNum) => {
    setCurrentScreenCampaign(newScreen);
    setLevelNum(levelNum);
  };

    return (
      <div>
      <Navbar/>
      {/* passing through props to be able to change screen and change campaign screen */}
      {/* passing in levelNum (var name) instead of setLevelNum cus we not setting it we just need val */}
        {currentScreenCampaign === 1 ? (
          <InGame onScreenChangeCampaign={handleScreenChangeCampaign} levelNum={levelNum} changeScreen={changeScreen}/>
        ) : currentScreenCampaign === 2 ? (
          <Campaign onScreenChangeCampaignLevel={handleScreenChangeCampaignLevel}/>
        ) : null}
      </div>
    );
  }

export default CampaignOverview;