import React from 'react'

export default function Portfolio(props) {
    let portfolioVal = props.portfolioVal;
    return (
        <div id='portfolio'>Portfolio Value: ${portfolioVal}</div>
    )
}
