import React, { useState } from "react";
import EditButton from "./EditButton";
function RentCard(props) {
  const [checked, setChecked] = useState(false);
  const [rent, setRent] = useState({...props});
  //const {amount, dueDate, fulfilled, id} = props; 

  const refresh = (newRent) => setRent(newRent);
  const handleClick = (e) => setChecked(true);

  return (
    <div className="card mb-4 shadow">
      <div className="card-header">
        <div className="row">
          <div className="col-10">
            <h4 className="text-start">Rent</h4>
          </div>
          <div className="col">
            <EditButton {...props} refresh={refresh} />
          </div>
        </div>
      </div>
      <div
        className="card-body"
        style={{ background: rent.fulfilled ? "#90EE90" : "" }}
      >
        <div className="row">
          <div className="col">
            <span>Amount: ${rent.amount}</span>
          </div>

          <div className="col">
            <span>Due: {props.dueDate.substring(0, 10)}</span>
          </div>

          <div className="col">
            <input
              type="checkbox"
              checked={props.fulfilled}
              onChange={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RentCard;
