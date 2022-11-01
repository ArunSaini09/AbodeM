import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";

function PostFormPage(props) {
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleClickPrev = e => {
    e.preventDefault();
    {props.prevStep()};
  }

  const handleContentChange = (event) => {
    setContent(props.values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(JSON.stringify(content));
    try {
      let response = await fetch("/api/micro_posts/form", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Server error while creating a new micro post", error);
      setError(true);
    }    

    console.log(JSON.stringify(content));
  };

  if (success) return <Navigate to="/" />;

  return (
    <div className="col-10 col-md-8 col-lg-7">
      {error && <ErrorAlert details={"Failed to save the content"} />}
      <h1>Confirmation</h1>
      <form onSubmit={handleSubmit}>

          <ul className = "list-group">
            <li className="list-group-item">Address: {props.values.address}</li>
            <li className="list-group-item">Rent: {props.values.rent} Rent Due: {props.values.rentDueDate}</li>
            <li className="list-group-item">Mortgage: {props.values.mortgage}</li>
            <li className="list-group-item">Electric: {props.values.electric}</li>
            <li className="list-group-item">Gas: {props.values.gas}</li>
            <li className="list-group-item">Water: {props.values.water}</li>
          </ul>

          <input placeholder="Confirm" onChange={handleContentChange}/>
              
          <br/>

          <button onClick={handleClickPrev} className="btn btn-primary"> Back </button>
          <button type="submit" className="btn btn-primary"> Save Property </button>
      </form>
    </div>
  );
}

export default PostFormPage;
