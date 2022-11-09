import React,{useState} from 'react'
import EditButton from './EditButton'
function RentCard(props){

    const [checked, setChecked] = useState(false);

    const handleClick = e =>{
        setChecked(!checked);
    }

    return(
        <div className = "card mb-4 shadow">
            <div className="card-header">
                <div className="row">
                    <div className="col-10">
                        <h4 className="text-start">Rent</h4>
                    </div>
                    <div className="col">
                        <EditButton rent={props.rent}/>
                    </div>
                </div>
                    
            </div>
            <div className="card-body" style={{background: checked ? "#90EE90" : ""}}>
                <div className="row">

                    <div className="col">
                        <span>Amount: ${props.rent}</span> 
                    </div>

                    <div className="col">
                        <span>Due: {props.rentDueDate}</span> 
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

export default RentCard