import React from "react";
import { Link } from "react-router-dom";
import Map from "./Map";

<<<<<<< HEAD
function HomeCard({  address, electric, gas, mortgage, rent, step, tenanted, water, id }) {
  const tempImgUrl = "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?output=thumbnail&cb_client=maps_sv.tactile.gps&panoid=rpTI7Jo7WnpqqMkArgq5WQ&w=883&h=435&thumb=2&yaw=71.51634&pitch=0";

  const deleteProperty = async(id) =>{
    try{
        const deleteProperty = await fetch(".../!id!",{
            method: "DELETE"
        });
    } catch(err){
        console.log(err.message);
    }
  }
=======
function HomeCard({
  address,
  electric,
  gas,
  mortgage,
  rent,
  step,
  tenanted,
  water,
  id,
}) {
  const tempImgUrl =
    "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?output=thumbnail&cb_client=maps_sv.tactile.gps&panoid=rpTI7Jo7WnpqqMkArgq5WQ&w=883&h=435&thumb=2&yaw=71.51634&pitch=0";
>>>>>>> deaf891ffdd64ab51a55af37009df52ae4d119fc

  return (
    <div className="col-10 col-md-8 col-lg-7">
      <div className="card mb-4 shadow">
<<<<<<< HEAD
        
            <img src={tempImgUrl} 
                className="img-fluid card-img-top"
                alt="House"
              />
        

            <ul class="list-group list-group-flush">
                <li class="list-group-item">          
                    <Link to={"/posts/" + id}>{address}</Link>
                </li>
            
                <div class="container">
                    <div class="row">
                            <li class="list-group-item col-sm">rent: {rent}</li>
                            <li class="list-group-item col-sm">mortgage: {mortgage}</li>
                    </div>
                </div>

            </ul>
=======
        <div className="card-body card-text">
          <Map address={address}></Map>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Address: <Link to={"/posts/" + id}>{address}</Link>
          </li>

          <div className="container">
            <div className="row">
              <li className="list-group-item col-sm">rent: {rent}</li>
              <li className="list-group-item col-sm">mortgage: {mortgage}</li>
            </div>
          </div>
        </ul>
>>>>>>> deaf891ffdd64ab51a55af37009df52ae4d119fc

        <div className="card-footer small p-0">
          <div className="w-100">
            <button className = "btn btn-danger w-100" onClick={()=>{deleteProperty(id)}}>Delete Property</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCard;
