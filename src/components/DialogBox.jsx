import React from 'react'

export default function DialogBox(props) {
  let dispatch = props.dispatch;
  return (
    <div className='dialogbox'>
      <div className="db-titletitle">
        <p>Buy DogeCoin</p>
        <button onClick={() => dispatch({ type: "close" })} className='close-btn'>x</button>
      </div>
      <p className='db-price'>Current Price: $0.511823</p>
      <div className="amt-container">
        <input type="number" name="amount" />
        <p>
          Max: 195.38000
        </p>
      </div>
      <button>Buy</button>
    </div>
  )
}
