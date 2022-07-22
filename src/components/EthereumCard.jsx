import React from 'react'
import img from "../ethereum.png"

export default function EthereumCard() {
    let currPrice = 3799.68;
    let prevPrice = 3900.00;

    let change = (((currPrice - prevPrice) / prevPrice) * 100).toFixed(5);

    return (
        <div className="crypto-card">
            <img width={"50px"} height={"50px"} src={img} alt="" />
            <div className="crypto-info">
                <p className="curr-amount">${currPrice}</p>
                <p className="name">Ethereum</p>
                <p className="change">Last 24h: <span style={{color : change >=0 ? "green" : "red"}}className='percentage'>{change}</span></p>
            </div>

        </div>
    )
}
