import React, {useContext, useState, useEffect} from 'react';
import MenuButton from './jsx_buttons/menuButton';
import ProfileButton from './jsx_buttons/profileButton';
import ShopButton from './jsx_buttons/shopButton';
import LeaderboardButton from './jsx_buttons/leaderboardButton';
import { UserContext } from '../contexts/userContext';
import { ApiContext } from '../contexts/apiContext';
import axios from 'axios';
import LogoutButton from './jsx_buttons/logoutButton';

function Navbar() {
  const {apiUrl} = useContext(ApiContext);
  //switch to http://localhost:5000 when on local
  
  const { user } = useContext(UserContext);
  const [username, setUsername] = useState('');
  //get request to find username based on userID 
  //user id is context (global var)

  useEffect(() => {
    if (user) {
      axios.get(`${apiUrl}/api/user/${user}`)
        .then(response => {
          const user = response.data;
          setUsername(user.username);
        })
        .catch(error => {
          console.log('Error fetching username:', error);
        });
    }
  }, [user]);

  //buttons to each part of the website + shows userID at top
  return <header style={{ display: "flex", alignItems: "center" }}>
    <h1 style={{ marginRight: "auto" }}>Typle</h1>
    <h1 className='nav-welcome'>{username ? `Welcome ${username}` : 'u are not logged in'}</h1>
    <MenuButton />
    <ProfileButton/>
    <ShopButton/>
    <LeaderboardButton />
    <LogoutButton />
  </header>
}

export default Navbar;
