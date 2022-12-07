import React from 'react'

function FormAddress(props){

    const handleClick = e =>{
        e.preventDefault();
        {props.nextStep()};
    }


    return(
        <div>
            <h1>Address*</h1>
            <div className="row">
                <div className="col">
                    <input
                    type="text"
                    placeholder="125-09"
                    defaultValue={props.values.stNum}
                    className="form-control"
                    onChange={props.handleChange("st_num")}
                    autoFocus
                    />
                </div>
                <div className="col">
                    <input
                    type="text"
                    placeholder="Powell St"
                    defaultValue={props.values.stName}
                    className="form-control"
                    onChange={props.handleChange("st_name")}
                    
                    />
                </div>
            </div>
            <div className = "row">
                <div className="col">
                    <input
                    type="text"
                    placeholder="San Francisco"
                    defaultValue={props.values.city}
                    className="form-control"
                    onChange={props.handleChange("city")}
                    
                    />
                </div>
                <div className="col">
                    <input
                    type="text"
                    placeholder="CA"
                    defaultValue={props.values.state}
                    className="form-control"
                    onChange={props.handleChange("state")}
                    
                    />
                </div>
                <div className="col">
                    <input
                    type="text"
                    placeholder="94108"
                    defaultValue={props.values.zip}
                    className="form-control"
                    onChange={props.handleChange("zip")}
                    
                    />
                </div>

            </div>
            
            <button 
            onClick={handleClick}  
            className="btn btn-primary mt-3">
            Continue
            </button>
        </div>
    )
}

export default FormAddress;