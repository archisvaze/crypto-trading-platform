import Header from "./Header";
import Portfolio from "./Portfolio";
import Wallet from "./Wallet";
import { useState, useEffect, useReducer } from "react";
import CryptoCard from "./CryptoCard";
import Dialogbox from "./Dialogbox";


function reducer(state, action) {
    switch (action.type) {
        case "buy":
            return { ...state, showDialogBox: true, dialogData: action.payload }
        case "close":
            return { ...state, showDialogBox: false }
        case "buycoin":
            console.log(action.payload)
            let walletAmt = Number(Number(state.walletAmt) - Number(action.payload.amount)).toFixed(3);
            let portfolioVal = Number(Number(state.portfolioVal) + Number(action.payload.amount)).toFixed(3);
            return { ...state, portfolioVal: portfolioVal, walletAmt: walletAmt }
        default:
            break;
    }
}


function App(props) {
    let [cryptoArr, setCryptoArr] = useState([]);
    let initialState = { walletAmt: 1000, holdings: [], transactions: [], portfolioVal: 0, showDialogBox: false, dialogData: {}, currCharge: 0 }
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
            <div style={{ display: state.showDialogBox ? "flex" : " none" }} className="dialogbox-container">
                <Dialogbox dispatch={dispatch} data={state.dialogData} walletAmt={state.walletAmt} />
            </div>
            <Header />
            <Wallet walletAmt={state.walletAmt} />
            <Portfolio portfolioVal={state.portfolioVal} />
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