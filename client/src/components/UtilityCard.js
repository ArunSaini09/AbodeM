import React from 'react'
import EditButtonMortgage from './EditButtonMortgage'

function UtilityCard(props){
    return(
    <div className = "card mb-4 shadow h-100">
        <div className ="card-header">
        <div className="row">
                <div className="col-10">
                    <h4 className="text-start">Utilities</h4>
                </div>
                <div className="col">
                    <EditButtonMortgage mortgage={props.mortgage}/>
                </div>
            </div>
        </div>
        <div className="card-body">
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Electric: {`$${props.electric}`}</li>
                <li className="list-group-item">Water: {`$${props.water}`}</li>
                <li className="list-group-item">Gas: {`$${props.gas}`}</li>
            </ul>   
        </div>
    </div>
    )
}

export default UtilityCard