import React from 'react'
import Bitcoin from "../bitcoin.png"

export default function BitcoinCard() {
    let currAmount = 49128;
    let prevAmount = 49150;

    let change = (((currAmount - prevAmount) / prevAmount) * 100).toFixed(5);

    return (
        <div className="crypto-card">
            <img width={"50px"} height={"50px"} src={Bitcoin} alt="" />
            <div className="crypto-info">
                <p className="curr-amount">${currAmount}</p>
                <p className="name">Bitcoin</p>
                <p className="change">Last 24h: <span style={{color : change >=0 ? "green" : "red"}}className='percentage'>{change}</span></p>
            </div>

        </div>
    )
}
