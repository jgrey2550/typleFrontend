import React, { useState, useEffect, useContext } from "react";
import Navbar from "../navbar";
import axios from 'axios';
import Keyboard from "../jsx_campaign/keyboard";
import { UserContext } from "../../contexts/userContext";
import { ApiContext } from "../../contexts/apiContext";
import WordsTyple from "./wordsTyple";

function Typle() {
  const {apiUrl} = useContext(ApiContext);
  
  const [paragraph, setParagraph] = useState('');
  const {user} = useContext(UserContext);

  const [equiptSkin, setEquiptSkin] = useState("Default");

  useEffect(() => {
      if(user) {
          axios.get(`${apiUrl}/api/userProfile/${user}`)
              .then(response => {
                  setEquiptSkin(response.data.equiptSkin)
                  console.log(equiptSkin);
              })
              .catch(error => {
                  console.log('Error fetching user info:', error);
              });
      }
  })

  useEffect(() => {
    const fetchParagraph = async () => {
      const options = {
        method: 'GET',
        url: 'https://lorem-ipsum-api.p.rapidapi.com/sentence',
        params: { amount: '2' },
        headers: {
          'X-RapidAPI-Key': '26ba41e54cmsh20c4df296cfa3a5p1bdbdajsnfac8bc6e8239',
          'X-RapidAPI-Host': 'lorem-ipsum-api.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        console.log("hi" + response.data)
        setParagraph(response.data.text);
      } catch (error) {
        console.error(error);
      }
    };

    fetchParagraph();
    const x = {
      text: "test ar"
    }
    // setParagraph(x.text);
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Typle Test</h1>
      <WordsTyple text={paragraph}/>
      <Keyboard equiptSkin={equiptSkin}/>
    </div>
  );
}

export default Typle;




