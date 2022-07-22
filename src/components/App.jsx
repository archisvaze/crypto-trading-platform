import Header from "./Header";
import Portfolio from "./Portfolio";
import Wallet from "./Wallet";
import { useState, useEffect, useReducer } from "react";
import CryptoCard from "./CryptoCard";


function reducer(state, action) {
    switch (action.type) {
        case "buy":
            if (action.payload === "Bitcoin") {
                return{ ...state, showDialogBox:true }
            }
            break;

        default:
            break;
    }
}


function App(props) {
    let [cryptoArr, setCryptoArr] = useState([]);
    let initialState = { walletAmt: 0, holdings: [], transactions: [], portfolioVal: 0 , showDialogBox: false}
    let [state, dispatch] = useReducer(reducer, initialState);



    function fetchData() {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20dogecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=%601h%2C24h%2C7d%60")
            .then(resp => resp.json())
            .then(data => {
                cryptoArr = data;
                setCryptoArr(cryptoArr);
                console.log(cryptoArr)
            })
    }
    useEffect(() => {
        fetchData();
        // let id = setInterval(() => {
        //     fetchData();
        // }, 20000)
        // return () => clearInterval(id);
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container">
            <div style={{display: state.showDialogBox ? "flex" : " none"}} className="dialogbox">

            </div>
            <Header />
            <Wallet />
            <Portfolio />
            <div className="crypto-cards-container">
                {cryptoArr.map(obj => {
                    return (
                        <CryptoCard key={obj.id} obj={obj} dispatch={dispatch} />
                    )
                })}
            </div>
            <div className="bottom-container">
                <div className="holdings-container">

                </div>
                <div className="transactions-container"></div>
            </div>
        </div>
    )
}



export default App;