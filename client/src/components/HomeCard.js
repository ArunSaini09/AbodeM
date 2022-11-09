import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton"



function HomeCard({  address, electric, gas, mortgage, rent, step, tenanted, water, id }) {
const tempImgUrl = "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?output=thumbnail&cb_client=maps_sv.tactile.gps&panoid=rpTI7Jo7WnpqqMkArgq5WQ&w=883&h=435&thumb=2&yaw=71.51634&pitch=0";

  return (
    <div className="col-10 col-md-8 col-lg-7">
      <div className="card mb-4 shadow">
        
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

        <div className="card-footer small p-0">
          <div className="w-100">
            <DeleteButton id ={id}/>
          </div>
        </div>
        {/* <div className="card-footer small text-muted text-end">{createdAt}</div> */}
      </div>
    </div>
  );
}

export default HomeCard;
