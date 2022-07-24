import React from 'react'


export default function CryptoCard(props) {

    //declaring variables
    let obj = props.obj;
    let image = obj.image;
    let currPrice = Number(obj.current_price).toFixed(3);
    let change = Number(obj.price_change_percentage_24h).toFixed(3);
    let name = obj.name;
    let dispatch = props.dispatch;
    let payload = {
        "name": name,
        "currPrice" : currPrice,
        "image": image,
    }

    return (
        <div className="crypto-card">
            <img width={"50px"} height={"50px"} src={image} alt="" />
            <div className="crypto-info">
                <p className="curr-amount">${currPrice}</p>
                <p className="name">{name}</p>
                <p className="change">Last 24h: <span style={{ color: change >= 0 ? "rgba(0, 216, 0)" : "rgba(255, 73, 73)" }} className='percentage'>{change}%</span></p>
            </div>
            <div className="actions-container">
                <button onClick={() => { dispatch({ type: "buy", payload: payload });}} className="buy-button">Buy</button>
                <button onClick={() => {dispatch({type: "sell", payload: payload})}} className="sell-button">Sell</button>
            </div>
        </div>
    )
}
