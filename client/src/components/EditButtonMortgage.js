import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function EditButtonMortgage(props) {
  const [newMortgage, setNewMortgage] = useState(props.mortgage);
  let params = useParams();

  const updateMortgage = async (e) => {
    e.preventDefault();
    try {
      //send put request
      //TODO: use the correct fetch url when backend is set
      const body = {
        billType: "Mortgage",
        amount: newMortgage,
        paidOff: false,
        dueDate: "2022-12-09T01:08:26.024Z",
      };

      const response = await fetch(
        "/api/houses/house/" + params.id + "/bill/" + props.mortId,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      console.log(data);

      //TODO:
      //need to refresh state, to reflect new change
      //*****HERE*****//
      props.refresh(data.amount);
      setNewMortgage(data.amount);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#MortgageModal"
      >
        Edit
      </button>

      <div
        className="modal fade"
        id="MortgageModal"
        tabIndex="-1"
        aria-labelledby="MortgageModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="MortgageModalLabel">
                Mortgage
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setNewMortgage(props.mortgage);
                }}
              ></button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={newMortgage}
                onChange={(e) => {
                  setNewMortgage(e.target.value);
                }}
              />
            </div>

            <div className="modal-footer">
              {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => {
                  updateMortgage(e);
                }}
              >
                {" "}
                Save{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
