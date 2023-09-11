import React from "react";
import Navbar from "../navbar";
import Highscores from "./highscores";
import BasicInfo from "./basicInfo";
import SkinsList from "./skinsList";

function Profile() {
    return <div>
        <Navbar/>
        <h1>Profile</h1>
        <br/>
        <BasicInfo/>
        <br/>
        <Highscores />
        <br/>
        <SkinsList/>
    </div>
}

export default Profile;