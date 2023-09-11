import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { UserContext } from "../../contexts/userContext";
import { ApiContext } from "../../contexts/apiContext";

function ShopItem({ name, image, price, changeItem}) {
    const {apiUrl} = useContext(ApiContext);
        
    const {user} = useContext(UserContext);
    const [coins, setCoins] = useState(0);
    const [items, setItems] = useState(null);

    useEffect(() => {
        if(user) {
            axios.get(`${apiUrl}/api/userProfile/${user}`)
                .then(response => {
                    setCoins(response.data.coins);
                })
                .catch(error => {
                    console.log('error fetching coins', error);
                });
            axios.get(`${apiUrl}/api/userProfile/${user}`)
                .then(response => {
                    setItems(response.data.skins);
                })
                .catch(error => {
                    console.log('error fetching items data', error);
                });
        }
    }, [user]);

    function handleClick() {
        if(user) {
            if(items.find(skin => skin.name === name)) {
                alert("you already have this stupid");
            } else if(coins > price) {
                const newSkin = {
                    name: name,
                    owned: true
                };
                console.log(newSkin);
                console.log(user);
                axios.put(`${apiUrl}/api/userProfile/${user}/skins`, { newSkin: newSkin })
                    .then(response => {
                        console.log('User profile updated:', response.data);
                        alert("you bought " + name + " for " + price + " coins!");

                        let coinsAmount = price * -1;
                        axios.put(`${apiUrl}/api/userProfile/${user}/coins`, { coinsAmount })
                        .then(response => {
                            console.log('User profile updated:', response.data);
                        })
                        .catch(error => {
                            console.error('Error updating user profile:', error);
                        });
                    })
                    .catch(error => {
                        console.error('Error updating user profile:', error);
                    });
                axios.get(`${apiUrl}/api/userProfile/${user}`)
                    .then(response => {
                        setItems(response.data.skins);
                        console.log("added skins n shit" + items);
                    })
                    .catch(error => {
                        console.log('error fetching items data', error);
                    });
            } else {
                alert("NO COINS");
            }
        }
        else {
            if(coins > price) {
                const newSkin = {
                    name: name,
                    owned: true
                };
                axios.put(`${apiUrl}/api/userProfile/${user}/skins`, { skin: newSkin })
                    .then(response => {
                        console.log('User profile updated:', response.data);
                        alert("you bought " + name + " for " + price + " coins!");
                        
                        let coinsAmount = price * -1;
                        axios.put(`${apiUrl}/api/userProfile/${user}/coins`, { coinsAmount })
                        .then(response => {
                            console.log('User profile updated:', response.data);

                        })
                        .catch(error => {
                            console.error('Error updating user profile:', error);
                        });
                    })
                    .catch(error => {
                        console.error('Error updating user profile:', error);
                    });
                axios.get(`${apiUrl}/api/userProfile/${user}`)
                    .then(response => {
                        setItems(response.data.skins);
                        console.log("added skins n shit" + items);
                    })
                    .catch(error => {
                        console.log('error fetching items data', error);
                    });
            } else {
                alert("NO COINS");
            }
        }
    }

    function handleViewClick() {
        changeItem(name);
    }

    return (
        <div>
            <h2 className="shop-name">{name}</h2>
            <img src={image} alt={name} className="shop-img"/>
            <p>Price: {price}</p>
            <button onClick={handleClick}>Buy</button>
            <button onClick={handleViewClick}>View</button>
        </div>
    );
}

export default ShopItem;
