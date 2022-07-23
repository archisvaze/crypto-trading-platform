import React from 'react'

export default function HoldingCard(props) {

    let obj = props.obj;
    let id = obj.id;
    let totalAmount = obj.totalAmount;
    let totalCharged = obj.totalCharged;
    let currVal = obj.currVal;
    let profit = obj.profit
    return (
        <div className='holding-card'>
            <div className="hc-1">{id}: {totalAmount}</div>
            <div className="hc-2">Total Paid: ${totalCharged}</div>
            <div className="hc-3">Current Value: ${currVal}</div>
            <div className="hc-4" style={{ color: profit >= 0 ? "rgba(0, 216, 0)" : "rgba(255, 73, 73)" }}>P/L: ${profit}</div>
        </div>
    )
}
