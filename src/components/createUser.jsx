import React, {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ApiContext } from "../contexts/apiContext";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const {apiUrl} = useContext(ApiContext);
    const navigate = useNavigate();
    
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onChangeUsername = (newName) => {
        setUsername(newName);
    }

    const onChangePassword = (newPassword) => {
        setPassword(newPassword);
    }
    //username and password state variables that update as user is entering info

    const onSubmit = (e) => {
        e.preventDefault();
        
        const user = {
            username: username,
            password: password
        }

        // console.log(user);
        //creates new user with info passed in and posts it to backend
        axios.post(`${apiUrl}/createUser/add`, user)
            .then(res => {
                const newUserId = res.data.userId;
                
                //gets back userID from post request
                const userStats = {
                    userId: newUserId,
                    levels: [],
                    topWPM: 0
                }

                //makes stats object for each user with userID
                axios.post(`${apiUrl}/createUser/addStats`, userStats)
                    .then(res => {
                        console.log(res.data)
                    });

                const defaultSkin = {
                    name: "Default",
                    owned: true
                }
                const userProfile = {
                    userId: newUserId,
                    coins: 0,
                    skins: [defaultSkin],
                    equiptSkin: "Default"
                }
                axios.post(`${apiUrl}/createUser/addProfile`, userProfile)
                    .then(res => {
                        console.log(res.data)
                    });

                const userBattleStats = {
                    userId: newUserId,
                    wins: 0,
                    elo: 800
                }

                axios.post(`${apiUrl}/createUser/addBattleStats`, userBattleStats) 
                    .then(res => {
                        console.log(res.data);
                    })
            });

        alert("Account created");
        navigate('/login');
        //when submitted post request to /add which goes back to the backend through axios
    }

    const [userStuff, setUserStuff] = useState({});

    function handleCallbackResponse(response) {
        console.log("encoded id token" + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUserStuff(userObject);
        // document.getElementById("signInDiv").hidden = true;
        const user = {
            username: userObject.email,
            password: userObject.name
        }
        axios.post(`${apiUrl}/login/`, user)
        .then(res => {
            if (res.data.login === 'Login successful') {
                const userId = res.data.userId;
                alert("You already have an account linked to this email");
            } else {
                axios.post(`${apiUrl}/createUser/add`, user)
                .then(res => {
                    const newUserId = res.data.userId;
                    
                    //gets back userID from post request
                    const userStats = {
                        userId: newUserId,
                        levels: [],
                        topWPM: 0
                    }

                    //makes stats object for each user with userID
                    axios.post(`${apiUrl}/createUser/addStats`, userStats)
                        .then(res => {
                            console.log(res.data)
                        });

                    const defaultSkin = {
                        name: "Default",
                        owned: true
                    }
                    const userProfile = {
                        userId: newUserId,
                        coins: 0,
                        skins: [defaultSkin],
                        equiptSkin: "Default"
                    }
                    axios.post(`${apiUrl}/createUser/addProfile`, userProfile)
                        .then(res => {
                            console.log(res.data)
                        });
                });
                alert("Account created");
                navigate('/login');


            }
        })
        .catch(error => console.log(error));

        
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
        client_id: "556849085560-osvh0sm4f0rf152a9a20tf85bfd3vkhv.apps.googleusercontent.com",
        callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {theme: "outline", size: "large"}
        );
    }, []);

    return (
        <div>
            <h3>create new user</h3>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Username: </label>
                    <input 
                        type="text"
                        required
                        value={username}
                        onChange={(e) => onChangeUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input 
                        type="text"
                        required
                        value={password}
                        onChange={(e) => onChangePassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <br/>
            <h3>Sign Up With Google</h3>
            <div id="signInDiv"></div>
            <Link to="/login">Login</Link>
        </div>
    );
}

export default CreateUser;
