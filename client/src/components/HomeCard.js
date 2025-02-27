import React from "react";
import { Link } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import Map from "./Map";

function HomeCard({
  address,
  bills,
  rents,
  mortgage,
  rent,
  id,
  refresh
}) {
  /* const tempImgUrl =
    "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?output=thumbnail&cb_client=maps_sv.tactile.gps&panoid=rpTI7Jo7WnpqqMkArgq5WQ&w=883&h=435&thumb=2&yaw=71.51634&pitch=0";
 */

  const deleteCard = async e => {
    e.preventDefault();
    try{
      const deleteCard = await fetch("/api/houses/house/" + id,{
        method: "DELETE"
      });

      console.log(deleteCard);
      refresh(id);
    } catch(err) {
      console.log(err.message);
    }
  }


  return (
    <div className="col-10 col-md-8 col-lg-7">
      <div className="card mb-4 shadow">
        <div className="card-body card-text">
          {address?.length>0 ? <Map address={address}></Map> : "Invalid Address"}
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Address: <Link to={"/home/" + id}>{address}</Link>
          </li>

          <div className="container">
            <div className="row">
              <li className="list-group-item col-sm w-100">Rent: {rent ? `$${rent.amount}` : "Not Yet Entered" }</li>
              <li className="list-group-item col-sm w-100">Mortgage: {mortgage ? `$${mortgage.amount}` : "Not Yet Entered" }</li>
            </div>
          </div>
        </ul>

        <div className="card-footer small p-0">
          <div className="w-100">
            <button className = "btn btn-danger w-100" onClick={deleteCard}>Delete Property</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCard;
