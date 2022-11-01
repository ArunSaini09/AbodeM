import React from 'react'

function FormInfo(props){
    
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
            <div className="mb-3">
                <label htmlFor="rented">Is the property currently tenanted? </label>
                <input type="checkbox" name="rented" id="rented" onChange={props.handleChange("tenanted")} checked={props.values.tenanted}/>
            </div>

             
            {props.values.tenanted ? 
                (
                <div className="mb-4">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="input-group">
                                <div className="input-group-prepend ">
                                    <span className="input-group-text rounded-0">$</span>
                                </div>
                                
                                    <input
                                    type="text"
                                    placeholder="Enter rent..."
                                    defaultValue={props.values.rent}
                                    className="form-control rounded-0"
                                    onChange={props.handleChange("rent")}
                                    autoFocus
                                    aria-label="Amount (to the nearest dollar)"
                                    />
                            
                            </div>
                        </div>
                        <div className="col-lg-2">
                            due monthly on the 
                        </div>
                        <div className="col-lg-5"> 
                                
                            <input
                            type="text"
                            placeholder="15"
                            className="form-control rounded-0"
                            defaultValue={props.values.rentDueDate}
                            onChange={props.handleChange("rent-due-date")}
                            />
                        </div>
                    </div>
                </div>) 
                
                : (<></>)
            }
            <div className="input-group">
                <div className="input-group-prepend ">
                    <span className="input-group-text rounded-0">$</span>
                </div>
                <input
                type="text"
                placeholder="Enter mortgage..."
                defaultValue={props.values.mortgage}
                className="form-control"
                onChange={props.handleChange("mortgage")}
                />
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

export default FormInfo;