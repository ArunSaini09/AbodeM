import React, { useState } from "react";
import EditButtonMortgage from "./EditButtonMortgage";

function MortgageCard(props) {
  const [checked, setChecked] = useState(false);
  const [newMortgage, setNewMortgage] = useState({...props});
  const {amount, dueDate, fulfilled, id} = props; 

  const handleClick = (e) => {
    setChecked(!checked);
  };

  const refresh = (newMort) => {
    setNewMortgage(newMort);
  };
  return (
    <div className="card mb-4 shadow">
      <div className="card-header">
        <div className="row">
          <div className="col-10">
            <h4 className="text-start">Mortgage</h4>
          </div>
          <div className="col">
            <EditButtonMortgage
              amount={amount}
              id = {id}
              refresh={refresh}
            />
          </div>
        </div>
      </div>
      <div
        className="card-body"
        style={{ background: checked ? "#90EE90" : "" }}
      >
        <div className="row">
          <div className="col">Amount: {`$${amount}`}</div>

          <div className="col">
            <span>Due: { dueDate == null ? "Due Date Not Entered" : dueDate.substring(0, 10)}</span>
          </div>

          <div className="col">
            <input type="checkbox" checked={checked} onChange={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MortgageCard;
