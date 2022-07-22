import React from 'react'

export default function TransactionCard(props) {
    let obj = props.obj;
    let id = obj.id;
    let amount = obj.amount;
    let type = obj.type;
    let price = obj.price;
    return (
        <div  className='transaction-card'>
            <div style={{backgroundColor: type==="buy" ? "rgba(0, 216, 0, 0.9)": "rgba(255, 73, 73, 0.9)"}} className="left-bar"></div>
           <div className="tc-info-container">

           </div>
        </div>
    )
}
