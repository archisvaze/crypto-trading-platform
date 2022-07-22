import React, { useState } from 'react'
import "./style.css"

export default function DialogBox(props) {
  let dispatch = props.dispatch;
  let data = props.data;
  let walletAmt = props.walletAmt;

  let maxBuy = (walletAmt / data.currPrice).toFixed(4);
  let [chargeAmt, setchargeAmt] = useState(0.00);
  const [disabled, setdisabled] = useState(false)

  function buying(buyAmt) {
    let charges = (buyAmt * data.currPrice).toFixed(4);
    if (charges > walletAmt) {
      setdisabled(true)
      setchargeAmt(0)
    }
    else {
      setdisabled(false)
      setchargeAmt(charges)
    }
    if (buyAmt === undefined) setchargeAmt(0);
  }

  return (
    <div className='dialogbox'>
      <div className="header">
        <p className='title'>Buy {data.name}</p>
        <button onClick={() => { dispatch({ type: "close" }); setchargeAmt(0) }} className='close-button'>x</button>
      </div>
      <p className='price'>Current Price: ${data.currPrice}</p>
      <div className="amt-container">
        <input onChange={(e) => buying(e.target.value)} className='input' type="number" value={chargeAmt} />
        <p onClick={() => buying(maxBuy)} className='max-price'>Max: {maxBuy}</p>
      </div>
      <div className="charge">You will be charged: {chargeAmt}</div>
      <button onClick={() => { if (chargeAmt > 0) { dispatch({ type: "buycoin", payload: { id: data.name, amount: chargeAmt, price: data.currPrice } }); setchargeAmt(0) } }} style={{ backgroundColor: disabled ? "grey" : "rgba(0, 216, 0, 0.9)" }} disabled={disabled} className='buy-button'>Buy</button>
    </div>
  )
}