import React from 'react'

export default function TransactionCard(props) {
    let obj = props.obj;
    let id = obj.id;
    let amount = obj.amount;
    let type = obj.type;
    let price = obj.price;
    let charged = obj.charged;
    let time = obj.time
    return (
        <div className='transaction-card'>
            <div style={{ backgroundColor: type === "buy" ? "rgba(255, 73, 73, 0.9)" : "rgba(0, 216, 0, 0.9)" }} className="left-bar"></div>
            <div className="tc-info-container">
                <div className="tc-1">{id}: {amount}@{price}</div>
                <div className="tc-2">Paid: ${charged}</div>
                <div className="tc-3">Bought on: {time}</div>
            </div>
        </div>
    )
}


