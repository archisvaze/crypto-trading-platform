import React from 'react'
import img from "../dogecoin.png"

export default function DogecoinCard() {
    let currPrice = 0.511823;
    let prevPrice = 0.322921;

    let change = (((currPrice - prevPrice) / prevPrice) * 100).toFixed(5);

    return (
        <div className="crypto-card">
            <img width={"50px"} height={"50px"} src={img} alt="" />
            <div className="crypto-info">
                <p className="curr-amount">${currPrice}</p>
                <p className="name">Dogecoin</p>
                <p className="change">Last 24h: <span style={{color : change >=0 ? "green" : "red"}}className='percentage'>{change}</span></p>
            </div>

        </div>
    )
}
