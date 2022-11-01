import React from 'react'

function RentCard(props){
    return(
        <div className = "card mb-4 shadow">
            <div className ="card-header">
                Rent
            </div>
            <div className="card-body">
                <span>Amount: {props.rent}</span>
                <span>Due: {props.rentDueDate}</span>
                <span>
                    <input type="checkbox"/>
                </span>
            </div>
        </div>
    )
}

export default RentCard