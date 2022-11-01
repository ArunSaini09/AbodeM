import React from 'react'

function MortgageCard(props){

    return(
    <div className = "card mb-4 shadow">
        <div className ="card-header">
            Mortgage
        </div>
        <div className="card-body">
            Amount: {props.mortgage}
        </div>
    </div>
    )
}

export default MortgageCard