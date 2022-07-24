import React, { useEffect, useState } from 'react'
import "./style.css"

export default function DialogBox2(props) {

    let dispatch = props.dispatch;
    let data = props.data;
    const [creditAmt, setcreditAmt] = useState(0);
    const [disabled, setdisabled] = useState(true);
    let [sellAmt, setsellAmt] = useState(0);

    useEffect(() => {
        setdisabled(true)
    }, [])


    let holdings = props.holdings;
    let holdingAmt = 0;
    for (let obj of holdings) {
        if (obj.id === data.name) {
            holdingAmt = Number(obj.totalAmount);
        }
    }
    let maxAmt = Number(holdingAmt)


    function selling(sellAmt) {
        let creditAmt = 0;
        setsellAmt(sellAmt)
        if (sellAmt > holdingAmt || sellAmt <= 0) {
            setdisabled(true)
            setcreditAmt(0)
        } else {
            creditAmt = Number(sellAmt * data.currPrice);
            setdisabled(false);
            setcreditAmt(Number(creditAmt))
        }
    }

    //get formatted date:
    function getFormattedDate() {
        var date = new Date();
        var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        return str;
    }

    return (
        <div className='dialogbox2'>
            <div className="header">
                <p className='title'>Sell {data.name}</p>
                <button onClick={() => { dispatch({ type: "close" }); setsellAmt(0); setcreditAmt(0) }} className='close-button'>x</button>
            </div>
            <p className='price'>Current Price: {data.currPrice}</p>
            <div className="amt-container">

                <input onChange={(e) => { selling(e.target.value) }} className='input' type="number" value={sellAmt} />

                <p onClick={() => { selling(maxAmt) }} className='max-price' >Max Sell Amount: {maxAmt}</p>

            </div>

            <div className="charge">You will be credited: {creditAmt}</div>

            <button onClick={() => {
                dispatch({ type: "update" });
                setTimeout(() => {
                    dispatch({
                        type: "sellcoin", payload: {
                            id: data.name,
                            amount: sellAmt,
                            charged: creditAmt,
                            price: data.currPrice,
                            time: getFormattedDate(),
                            type: "sell"
                        }
                    }); setsellAmt(0); setcreditAmt(0);
                }, 1000)


            }} style={{ backgroundColor: disabled ? "grey" : "rgba(0, 216, 0, 0.9)" }} disabled={disabled} className='sell-button'>Sell</button>

        </div>
    )
}
