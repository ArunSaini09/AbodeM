import React from "react";
import "./Style/Rent.css";
function FormInfo(props) {
  const handleClickNext = (e) => {
    e.preventDefault();
    {
      props.nextStep();
    }
  };

  const handleClickPrev = (e) => {
    e.preventDefault();
    {
      props.prevStep();
    }
  };

  return (
    <div>
      <div className="mb-3 title">
        <label htmlFor="rented">Is the property currently tenanted? </label>
        <input
          type="checkbox"
          name="rented"
          id="rented"
          onChange={props.handleChange("tenanted")}
          checked={props.values.tenanted}
          className="checkBox"
        />
      </div>

      {props.values.tenanted ? (
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
                  className="form-control rounded-sm"
                  onChange={props.handleChange("rent")}
                  autoFocus
                  aria-label="Amount (to the nearest dollar)"
                />
              </div>
            </div>
            <div className="col-lg-2 due-text">Due</div>
            <div className="col-lg-5">
              <input
                type="text"
                placeholder="YYYY-MM-DD"
                className="form-control rounded-sm"
                defaultValue={props.values.rentDueDate}
                onChange={props.handleChange("rent-due-date")}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="row">
        <div className="col-lg-5">
          <div className="input-group">
            <div className="input-group-prepend ">
              <span className="input-group-text rounded-0">$</span>
            </div>
            <input
              type="text"
              placeholder="Enter mortgage..."
              defaultValue={props.values.mortgage}
              className="form-control rounded-sm"
              onChange={props.handleChange("mortgage")}
            />
          </div>
        </div>
        <div className="col-lg-2 due-text">Due</div>
        <div className="col-lg-5">
          <input
            type="text"
            placeholder="YYYY-MM-DD"
            className="form-control rounded-sm"
            defaultValue={props.values.mortDueDate}
            onChange={props.handleChange("mort-due-date")}
          />
        </div>
      </div>

      <button onClick={handleClickPrev} className="btn btn-primary mt-2">
        Back
      </button>

      <button onClick={handleClickNext} className="btn btn-primary ms-2 mt-2">
        Continue
      </button>
    </div>
  );
}

export default FormInfo;
