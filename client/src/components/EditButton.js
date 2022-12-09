import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function EditButton(props) {
  const [newRent, setNewRent] = useState(props.rent);
  let params = useParams();

  const updateRent = async (e) => {
    e.preventDefault();
    try {
      //send put request
      //TODO: use the correct fetch url when backend is set
      const body = {
        amount: newRent,
        received: false,
        dueDate: "2022-12-09T00:06:54.256Z",
      };
      const response = await fetch(
        "/api/houses/house/" + params.id + "/rent/" + params.id,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      let data = await response.json();
      console.log(data);
      //TODO:
      //need to refresh state, to reflect new change
      //*****HERE*****//
      props.refresh(data.amount);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Rent
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setNewRent(props.rent);
                }}
              ></button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={newRent}
                onChange={(e) => {
                  setNewRent(e.target.value);
                }}
              />
            </div>

            <div className="modal-footer">
              {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => {
                  updateRent(e);
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
