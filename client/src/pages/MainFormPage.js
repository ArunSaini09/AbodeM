import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";
import { useAuth } from "../context/AuthContext";

/*
the http request body objects are made in the 'handleContentChange' function

the http requests are setup and made inside the 'handleSubmit' function

the post request for address work
the post request for rent and bills does not

the final 'if statement' that redirects to the home page after succcessful
making all the requests - line 164 - has been commented 
so you can stay on the confirm page and debug easier

*/

function MainFormPage(props) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [homeID, setHomeID] = useState("");
  const [address, setAddress] = useState("");
  const [rent, setRent] = useState("");
  const [bills, setBills] = useState("");

  const handleClickPrev = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  const handleContentChange = (event) => {
    const addy = {
      address:
        props.values.stNum +
        " " +
        props.values.stName +
        ", " +
        props.values.city +
        ", " +
        props.values.state +
        ", " +
        props.values.zip,
    };
    setAddress(addy);
    console.log("adress: ");
    console.log(addy);

    const rent = {
      amount: props.values.rent,
      recieved: false,
      dueDate: props.values.rentDueDate + "T01:02:03.955Z",
    };
    console.log(rent);
    setRent(rent);

    const billArr = {
      bills: [
        {
          billType: "Electric",
          amount: props.values.electric,
          paidOff: false,
          link: "https://wwww.conedison.com/en/",
          dueDate: props.values.electricDueDate + "T02:15:49.955Z",
        },
        {
          billType: "Gas",
          amount: props.values.gas,
          paidOff: false,
          link: "https://www.nationalgridus.com/Default.aspx",
          dueDate: props.values.gasDueDate + "T02:15:49.955Z",
        },
        {
          billType: "Mortgage",
          amount: props.values.mortgage,
          paidOff: false,
          link: "https://wwww.conedison.com/en/",
          dueDate: props.values.mortDueDate + "T02:15:49.955Z",
        },
        {
          billType: "Water",
          amount: props.values.water,
          paidOff: false,
          link: "https://www.nyc.gov/site/dep/pay-my-bills/how-to-pay.page",
          dueDate: props.values.waterDueDate + "T02:15:49.955Z",
        },
      ],
    };

    console.log(billArr);
    setBills(billArr);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch("/api/houses/house", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      });

      if (response.ok) {
        const house = await response.json();
        setHomeID(house.id);
        saveRents(house.id);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Server error while creating a new address", error);
      setError(true);
    }
  };

  //Rent Table Call
  async function saveRents(houseID) {
    if (homeID) houseID = homeID;

    console.log("/api/houses/house/" + houseID + "/rent");
    try {
      let response = await fetch("/api/houses/house/" + houseID + "/rent", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rent),
      });
      if (response.ok) {
        saveBills(houseID);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Server error while creating rent record", error);
      setError(true);
    }
  }

  //Bills table call
  async function saveBills(houseID) {
    if (homeID) houseID = homeID;
    try {
      let response = await fetch("/api/houses/house/" + houseID + "/bills", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bills),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Server error while creating a bill records", error);
      setError(true);
    }
  }

  if (success) return <Navigate to="/" />;

  return (
    <div className="col-10 col-md-8 col-lg-7">
      {error && <ErrorAlert details={"Failed to save the content"} />}
      <h1>Confirmation</h1>
      <form onSubmit={handleSubmit}>
        <ul className="list-group">
          <li className="list-group-item">
            Address:
            {props.values.stNum +
              " " +
              props.values.stName +
              " " +
              props.values.city +
              " " +
              props.values.state +
              " " +
              props.values.zip}
          </li>
          <li className="list-group-item">
            Rent: {props.values.rent} due: {props.values.rentDueDate}
          </li>
          <li className="list-group-item">
            Mortgage: {props.values.mortgage} due: {props.values.mortDueDate}
          </li>
          <li className="list-group-item">
            Electric: {props.values.electric} due:{" "}
            {props.values.electricDueDate}
          </li>
          <li className="list-group-item">
            Gas: {props.values.gas} due: {props.values.gasDueDate}
          </li>
          <li className="list-group-item">
            Water: {props.values.water} due: {props.values.waterDueDate}
          </li>
        </ul>

        <input placeholder="Confirm" onChange={handleContentChange} />

        <br />

        <button onClick={handleClickPrev} className="btn btn-primary">
          Back
        </button>
        <button type="submit" className="btn btn-primary">
          Save Property
        </button>
      </form>
    </div>
  );
}

export default MainFormPage;
