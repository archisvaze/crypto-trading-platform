import React from 'react'


export default function CryptoCard(props) {

    //declaring variables
    let obj = props.obj;
    let image = obj.image;
    let currPrice = obj.current_price;
    let change = obj.price_change_percentage_24h;
    let name = obj.name;
    let dispatch = props.dispatch;


    return (
        <div className="crypto-card">
            <img width={"50px"} height={"50px"} src={image} alt="" />
            <div className="crypto-info">
                <p className="curr-amount">${currPrice}</p>
                <p className="name">{name}</p>
                <p className="change">Last 24h: <span style={{ color: change >= 0 ? "green" : "red" }} className='percentage'>{change}%</span></p>
            </div>
            <div className="actions-container">
                <button onClick={() => { dispatch({ type: "buy", payload: `${name}` });}} className="buy">Buy</button>
                <button className="sell">Sell</button>
            </div>
        </div>
    )
}
