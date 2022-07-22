import React from 'react'

export default function DialogBox() {
  return (
    <div className='dialogbox'>
      <div className="title">
        <p>Buy DogeCoin</p>
        <button className='close-btn'>X</button>
      </div>
      <div className="contents-container">
        <div className="cur-price">
          <p>
            Current Price: $0.511823
          </p>
          <div className="amt-container">
            <input type="number" name="amount" />
            <p>
              Max: 195.38000
            </p>
          </div>
          <button>Buy</button>
        </div>
      </div>
    </div>
  )
}
