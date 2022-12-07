import React from 'react'

function FormBills(props){
    
    const handleClickNext = e =>{
        e.preventDefault();
        {props.nextStep()};
    }

    const handleClickPrev = e => {
        e.preventDefault();
        {props.prevStep()};
    }

    return(
        <div>
            <h1>Utilities</h1>
            <div className = "row">

                <div className="col-lg-5">
                    <div className="input-group">
                        <div className="input-group-prepend ">
                            <span className="input-group-text rounded-0">$</span>
                        </div>
                        <input
                        type="text"
                        placeholder="Enter electric..."
                        defaultValue={props.values.electric}
                        className="form-control"
                        onChange={props.handleChange("electric")}
                        autoFocus
                        />
                    </div>
                </div>
                <div className="col-lg-2">
                    due  
                </div>
                <div className="col-lg-5"> 
                        
                    <input
                    type="text"
                    placeholder="YYYY-MM-DD"
                    className="form-control rounded-0"
                    defaultValue={props.values.electricDueDate}
                    onChange={props.handleChange("electric-due-date")}
                    />
                </div>

                <div className="col-lg-5">
                    <div className="input-group">
                        <div className="input-group-prepend ">
                            <span className="input-group-text rounded-0">$</span>
                        </div>
                        <input
                        type="text"
                        placeholder="Enter gas..."
                        defaultValue={props.values.gas}
                        className="form-control"
                        onChange={props.handleChange("gas")}
                        autoFocus
                        />
                    </div>
                </div>
                <div className="col-lg-2">
                    due  
                </div>
                <div className="col-lg-5"> 
                        
                    <input
                    type="text"
                    placeholder="YYYY-MM-DD"
                    className="form-control rounded-0"
                    defaultValue={props.values.gasDueDate}
                    onChange={props.handleChange("gas-due-date")}
                    />
                </div>

                <div className="col-lg-5">
                    <div className="input-group">
                        <div className="input-group-prepend ">
                            <span className="input-group-text rounded-0">$</span>
                        </div>
                        <input
                        type="text"
                        placeholder="Enter water..."
                        defaultValue={props.values.water}
                        className="form-control"
                        onChange={props.handleChange("water")}
                        autoFocus
                        />
                    </div>
                </div>
                <div className="col-lg-2">
                    due  
                </div>
                <div className="col-lg-5"> 
                        
                    <input
                    type="text"
                    placeholder="YYYY-MM-DD"
                    className="form-control rounded-0"
                    defaultValue={props.values.waterDueDate}
                    onChange={props.handleChange("water-due-date")}
                    />
                </div>
            </div>

            <button
            onClick={handleClickPrev}  
            className="btn btn-primary">
            Back
            </button>

            <button 
            onClick={handleClickNext}  
            className="btn btn-primary">
            Continue
            </button>
        </div>
    )
}

export default FormBills;