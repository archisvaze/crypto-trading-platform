import React from 'react'

export default function Wallet(props) {
    let walletAmt = props.walletAmt;
  return (
    <div id='wallet'>💵 Wallet: ${walletAmt}</div>
  )
}
