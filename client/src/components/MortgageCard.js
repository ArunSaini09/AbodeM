import React, {useState} from 'react'
import EditButtonMortgage from './EditButtonMortgage'

function MortgageCard(props){
    const [checked, setChecked] = useState(false);

    const handleClick = e =>{
        setChecked(!checked);
    }

    return(
    <div className = "card mb-4 shadow">
        <div className="card-header">
            <div className="row">
                <div className="col-10">
                    <h4 className="text-start">Mortgage</h4>
                </div>
                <div className="col">
                    <EditButtonMortgage mortgage={props.mortgage}/>
                </div>
            </div>
        </div>
        <div className="card-body" style={{background: checked ? "#90EE90" : ""}}>
            <div className="row">

                <div className="col">
                    Amount: {props.mortgage}
                </div>

                <div className="col">
                    {/* <span>Due: {props.rentDueDate}</span> */} 
                    insert mort due date here
                </div>

                <div className="col">
                    <input type="checkbox"
                    checked = {checked}
                    onChange = {handleClick}
                    /> 
                </div>
            </div>
        </div>
    </div>
    )
}

export default MortgageCard