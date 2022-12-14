import React from "react";
import "./Style/Address.css";
function FormAddress(props) {
  const handleClick = (e) => {
    e.preventDefault();
    {
      props.nextStep();
    }
  };

  return (
    <div>
      <h1>Address*</h1>
      <div className="row row-box">
        <div className="col ">
          <div className="box-title">Street Addres</div>
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
          <div className="box-title">Street Name</div>
          <input
            type="text"
            placeholder="Powell St"
            defaultValue={props.values.stName}
            className="form-control"
            onChange={props.handleChange("st_name")}
          />
        </div>
      </div>
      <div className="row row-box">
        <div className="col">
          <div className="box-title">City</div>
          <input
            type="text"
            placeholder="San Francisco"
            defaultValue={props.values.city}
            className="form-control"
            onChange={props.handleChange("city")}
          />
        </div>
        <div className="col">
          <div className="box-title">State</div>
          <input
            type="text"
            placeholder="CA"
            defaultValue={props.values.state}
            className="form-control"
            onChange={props.handleChange("state")}
          />
        </div>
        <div className="col">
          <div className="box-title">ZipCode</div>
          <input
            type="text"
            placeholder="94108"
            defaultValue={props.values.zip}
            className="form-control"
            onChange={props.handleChange("zip")}
          />
        </div>
      </div>

      <button onClick={handleClick} className="btn btn-primary mt-3">
        Continue
      </button>
    </div>
  );
}

export default FormAddress;
