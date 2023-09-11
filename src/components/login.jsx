import React, {useContext, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../contexts/apiContext";
import jwt_decode from "jwt-decode";

function Login() {
    const {apiUrl} = useContext(ApiContext);
    
    const navigate = useNavigate();
    //importing the updateUser from context so can update userid when logged in
    const { updateUser } = useContext(UserContext);

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onChangeUsername = (newName) => {
        setUsername(newName);
    }

    const onChangePassword = (newPassword) => {
        setPassword(newPassword);
    }
    //username and password state variables that update when the user enters their password and username

    const onSubmit = (e) => {
        e.preventDefault();
        
        const loginData = {
            username: username,
            password: password
        }

        console.log(loginData);

        //post request to check for user credentials
        axios.post(`${apiUrl}/login/`, loginData)
        .then(res => {
            if (res.data.login === 'Login successful') {
                const userId = res.data.userId;
                //updates user with userID that was passed back from the post requeste
                updateUser(userId);
                navigate('/menu');
            } else {
                alert('Invalid username or password');
            }
        })
        .catch(error => console.log(error));

        onChangePassword('');
        onChangeUsername('');
        //post request to /login/ with axios to scan mongodb for matching username + password
    }

    const [userStuff, setUserStuff] = useState({});

    function handleCallbackResponse(response) {
        console.log("encoded id token" + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUserStuff(userObject);
        // document.getElementById("signInDiv").hidden = true;
        const loginData = {
            username: userObject.email,
            password: userObject.name
        }

        console.log(loginData);

        //post request to check for user credentials
        axios.post(`${apiUrl}/login/`, loginData)
        .then(res => {
            if (res.data.login === 'Login successful') {
                const userId = res.data.userId;
                //updates user with userID that was passed back from the post requeste
                updateUser(userId);
                navigate('/menu');
            } else {
                alert('No Account linked to this email');
            }
        })
        .catch(error => console.log(error));

        onChangePassword('');
        onChangeUsername('');
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

    return <div>
        <h1>Login below!</h1>
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
                <br/>
                <h3>Login With Google</h3>
                <div id="signInDiv"></div>
            </form>
        <Link to="/createUser">Create Account</Link>
    </div>
}

export default Login;
