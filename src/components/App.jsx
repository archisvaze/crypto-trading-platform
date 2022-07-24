import Header from "./Header";
import Portfolio from "./Portfolio";
import Wallet from "./Wallet";
import { useEffect, useReducer } from "react";
import CryptoCard from "./CryptoCard";
import Dialogbox from "./Dialogbox";
import TransactionCard from "./TransactionCard";
import HoldingCard from "./HoldingCard";
import DialogBox2 from "./Dialogbox2";



function reducer(state, action) {
    switch (action.type) {

        case "fetchData":
            console.log(`fetching data from API...`)
            // console.log(action.payload)
            return { ...state, cryptoArr: action.payload }

        case "buy":
            return { ...state, showDialogBox: true, dialogData: action.payload }
        case "sell":
            return { ...state, showDialogBox2: true, dialogData: action.payload }
        case "close":
            return { ...state, showDialogBox: false, showDialogBox2: false }
        case "buycoin":
            let walletAmt = (Number(state.walletAmt) - Number(action.payload.charged));
            let portfolioVal = (Number(state.portfolioVal) + Number(action.payload.charged));
            let transactions = [action.payload, ...state.transactions]

            //add to holdings
            let holdingsClone = JSON.parse(JSON.stringify(state.holdings))
            for (let obj of holdingsClone) {
                if (obj.id === action.payload.id) { //matching holding with transaction
                    obj.totalAmount = Number(obj.totalAmount) + Number(action.payload.amount);
                    obj.totalCharged = Number(obj.totalCharged) + Number(action.payload.charged);
                    obj.totalAmount = Number(obj.totalAmount)
                    obj.totalCharged = Number(obj.totalCharged)
                }
            }
            return { ...state, portfolioVal: portfolioVal, walletAmt: walletAmt, transactions: transactions, holdings: holdingsClone, showDialogBox: false };

        case "sellcoin":
            let walletAmt2 = (Number(state.walletAmt) + Number(action.payload.charged));
            let portfolioVal2 = (Number(state.portfolioVal) - Number(action.payload.charged));
            let transactions2 = [action.payload, ...state.transactions]

            //update holdings
            let holdingsClone3 = JSON.parse(JSON.stringify(state.holdings));
            for (let obj of holdingsClone3) {
                if (obj.id === action.payload.id) { //matching holding with transaction
                    obj.totalAmount = Number(obj.totalAmount) - Number(action.payload.amount);
                    obj.totalCharged = Number(obj.totalCharged) - Number(action.payload.charged);
                    obj.totalAmount = Number(obj.totalAmount)
                    obj.totalCharged = Number(obj.totalCharged)
                }
            }
            return { ...state, portfolioVal: portfolioVal2, walletAmt: walletAmt2, transactions: transactions2, holdings: holdingsClone3, showDialogBox: false };

        case "update":
            let portfolioValClone = Number(state.portfolioVal);
            let holdingsClone2 = JSON.parse(JSON.stringify(state.holdings))

            if (portfolioValClone > 0) {
                let holdingsClone2 = JSON.parse(JSON.stringify(state.holdings))
                for (let i = 0; i < holdingsClone2.length; i++) {
                    let currPrice = 0;
                    for (let obj of state.cryptoArr) {
                        if (obj.name === holdingsClone2[i].id) {
                            currPrice = Number(obj.current_price)
                        }
                    }
                    let currVal = (Number(currPrice) * Number(holdingsClone2[i].totalAmount))
                    holdingsClone2[i].currVal = Number(currVal);

                    if (holdingsClone2[i].totalAmount > 0 && holdingsClone2[i].totalAmount != "0.000") {
                      
                        let profit = (Number(currVal) - Number(holdingsClone2[i].totalCharged))
                        holdingsClone2[i].profit = Number(profit);
                        portfolioValClone = Number(portfolioValClone) + Number(profit);
                        if (portfolioValClone <= 0) portfolioValClone = 0;
                        portfolioValClone = Number(portfolioValClone)
                        return { ...state, holdings: holdingsClone2, portfolioVal: portfolioValClone }
                    }
                }
            }
            else return { ...state, holdings: holdingsClone2, portfolioVal: portfolioValClone }
        default:
            break;
    }
}


function App(props) {
    let initialState = {}
    if (localStorage.getItem("crypto-state") === null) {
        initialState = {

            cryptoArr: [],

            walletAmt: 1000000,

            holdings: [{ id: 'Bitcoin', totalAmount: 0, totalCharged: 0, currVal: 0, profit: 0 }, { id: 'Ethereum', totalAmount: 0, totalCharged: 0, currVal: 0, profit: 0 }, { id: 'Dogecoin', totalAmount: 0, totalCharged: 0, currVal: 0, profit: 0 }],

            transactions: [],

            portfolioVal: 0,

            showDialogBox: false,
            showDialogBox2: false,

            dialogData: {},

            currCharge: 0
        }
    } else {
        initialState = JSON.parse(localStorage.getItem("crypto-state"))
    }
    let [state, dispatch] = useReducer(reducer, initialState);


    function fetchData() {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20dogecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=%601h%2C24h%2C7d%60")
            .then(resp => resp.json())
            .then(data => {
                let cryptoArr = data;
                dispatch({ type: "fetchData", payload: cryptoArr });
                dispatch({ type: "update" })
            })
    }
    useEffect(() => {
        fetchData();
        let id = setInterval(() => {
            fetchData();
        }, 20000)
        return () => clearInterval(id);
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        localStorage.setItem("crypto-state", JSON.stringify(state))
    }, [state])


    return (
        <div className="container">
            <div style={{ display: state.showDialogBox ? "flex" : " none" }} className="dialogbox-container">
                <Dialogbox dispatch={dispatch} data={state.dialogData} walletAmt={state.walletAmt} />
            </div>
            <div style={{ display: state.showDialogBox2 ? "flex" : " none" }} className="dialogbox2-container">
                <DialogBox2 dispatch={dispatch} data={state.dialogData} walletAmt={state.walletAmt} portfolioVal={state.portfolioVal} holdings={state.holdings} />
            </div>
            <Header />
            <Wallet walletAmt={state.walletAmt} />
            <Portfolio portfolioVal={state.portfolioVal} />
            <div className="crypto-cards-container">
                {state.cryptoArr.map(obj => {
                    return (
                        <CryptoCard key={obj.id} obj={obj} dispatch={dispatch} />
                    )
                })}
            </div>
            <div className="bottom-container">
                <div className="holdings-container">
                    <h3>Holdings</h3>
                    {state.holdings.map(obj => {
                        if (obj.totalAmount > 0) {
                            return (
                                <HoldingCard key={obj.id} obj={obj} />
                            )
                        } else return (<></>)
                    })}
                </div>
                <div className="transactions-container">
                    <h3>Transactions</h3>
                    {state.transactions.map(obj => {
                        return (
                            <TransactionCard key={obj.time} obj={obj} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}



export default App;