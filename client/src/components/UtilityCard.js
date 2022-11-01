import React from 'react'

function UtilityCard(props){
    return(
    <div className = "card mb-4 shadow h-100">
        <div className ="card-header">
            Utilities
        </div>
        <div className="card-body">
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Electric: {props.electric}</li>
                <li className="list-group-item">Water: {props.water}</li>
                <li className="list-group-item">Gas: {props.gas}</li>
            </ul>   
        </div>
    </div>
    )
}

export default UtilityCard