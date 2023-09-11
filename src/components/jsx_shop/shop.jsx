import React, {useContext, useEffect, useState} from "react";
import Navbar from "../navbar";
import ShopItem from "./shopItem";
import axios from "axios";
import { UserContext } from "../../contexts/userContext";
import { ApiContext } from "../../contexts/apiContext";

import level1Img from "../pictures/1.png";
import level2Img from "../pictures/2.png";
import Keyboard from "../jsx_campaign/keyboard";

const items = [
    {
      name: "Josep",
      image: level1Img,
      price: 10,
    },
    {
      name: "imm",
      image: level2Img,
      price: 20,
    },
    {
        name: "shut",
        image: level2Img,
        price: 30,
    },  
    {
        name: "hul",
        image: level2Img,
        price: 30,
    },  
    {
        name: "lololol",
        image: level2Img,
        price: 30,
    },  
    {
        name: "fda",
        image: level2Img,
        price: 30,
    },  
  ];


function Shop() {
    const {apiUrl} = useContext(ApiContext);
    
    const [coins, setCoins] = useState(0);
    const {user} = useContext(UserContext);
    const [selectedItem, setSelectedItem] = useState(null);

    const changeItem = (newItem) => {
        setSelectedItem(newItem);
    }

    const closeDisplay = () => {
        setSelectedItem(null);
    }

    useEffect(() => {
        if(user) {
            axios.get(`${apiUrl}/api/userProfile/${user}`)
                .then(response => {
                    setCoins(response.data.coins);
                })
                .catch(error => {
                    console.log('error fetching coins', error);
                });
        }
    }, [user]);

    return <div>
        <Navbar/>
        <h1>Shop</h1>
        <p>Welcome to the Shop</p>
        <p>You currently have {coins} coins</p>
        <br/>
        <div>
            <h2>Skins</h2>
            <div className="shop-items-container">
                {items.map((item, index) => (
                    <ShopItem key={index} name={item.name} image={item.image} price={item.price} changeItem={changeItem}/>
                ))}
                {selectedItem && (
                    <div className="shop-display-item">
                        <Keyboard equiptSkin={selectedItem}/>
                        <h1>{selectedItem}</h1>
                        <button onClick={closeDisplay}>Close</button>
                    </div>
                )}
            </div>
        <div>
            <h2>Animations</h2>
        </div>
      </div>
    </div>
}

export default Shop;
