import Header from "./Header";
import Portfolio from "./Portfolio";
import Wallet from "./Wallet";
import BitcoinCard from "./BitcoinCard";
import EthereumCard from "./EthereumCard";
import DogecoinCard from "./DogecoinCard";
import { useState, useEffect } from "react";

function App(props) {
    const [bitcoinPrice, setBitcoinPrice] = useState(0);
    const [ethereumPrice, setEthereumPrice] = useState(0);
    const [dogecoinPrice, setDogecoinPrice] = useState(0);
    useEffect(() => {
        fetchData(setBitcoinPrice, setEthereumPrice, setDogecoinPrice);
        let intervalKey = setInterval(() => {
            fetchData(setBitcoinPrice, setEthereumPrice, setDogecoinPrice);
        }, 10000);
        return () => clearInterval(intervalKey);
    }, [])

    return (
        <div className="container">
            <Header />
            <Wallet />
            <Portfolio />
            <div className="crypto-cards-container">
                < BitcoinCard newPrice={bitcoinPrice} />
                < EthereumCard newPrice={ethereumPrice} />
                < DogecoinCard newPrice={dogecoinPrice} />
            </div>
        </div>
    )
}

function fetchData(setBitcoinPrice, setEthereumPrice, setDogecoinPrice) {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            setBitcoinPrice(data.bitcoin.usd);
        });
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            setEthereumPrice(data.ethereum.usd);
        });
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            setDogecoinPrice(data.dogecoin.usd);
        });
}

export default App;