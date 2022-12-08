import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import { useParams } from "react-router-dom";
import PostsListPage from "./PostsListPage";
import AddressHeader from "../components/AddressHeader";
import PropertyInfoBlock from "../components/PropertyInfoBlock";

/*
  make call to get all rent, mortgage, bill records of property
  render 'PropertyInfoBlocks' with the correct information
  'onClicking' the + button, a new (possibly blank) 'PropertyInfoBlock' should be rendered ontop of the preexisting ones
*/

function ShowPostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  //array that will hold <PropertyInfoBlock/> components with each months info in them
  const [monthInfoBlocks, setMonthInfoBlocks] = useState([]);

  const [address, setAddress] = useState([]);

  let params = useParams();

  const generateNewMonthInfoBlock = e => {
    //place a blank PropertyInfoBlock component, unpack the other components after
      setMonthInfoBlocks([<PropertyInfoBlock/>, ...monthInfoBlocks]);
  }

  useEffect(() => {
    let isMounted = true;
    

    async function getAddress() {
      try {
        let response = await fetch("/api/houses/house/" + params.id, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });;
        let homeRecord = await response.json();
        
        if(response.ok)
        {
          setAddress(homeRecord.address);
          getData();
        } else {
          setError(true);
        }
        
      } catch (error) {
        console.error("Error fetching /api/house/" + params.id, error);
        setError(true);
      }
    }

    getAddress();
    
    return () => {
      // clean up function
    };
  }, [params.id]);

  async function getData() {
    setLoading(true);
    try {
      let response = await fetch("/api/houses/house/" + params.id + "/records", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });;

      let postData = await response.json();
      
      
      /* console.log("postdata:");
      console.log(postData); */

      setPost(postData);

      //console.log(post);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching /api/house/" + params.id + "/records", error);
      setError(true);
    }
  }

  if (error)
    return (
      <ErrorAlert details={"Micro post with id=" + params.id + " not found"} />
    );
  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="row">
        <div className="col-9">
          <AddressHeader address = {address} />
        </div>
        <div className="col">
            {
            //TODO:
            /*on click have a new blank propertyInfoBlock rendered ontop of the pre existing ones.*/
            }
            <button className="btn btn-secondary" onClick ={generateNewMonthInfoBlock}>+</button>
        </div>
      </div>
      <div>
        <PropertyInfoBlock 
        electricInfo ={[post.bills[0].amount, post.bills[0].paidOff,post.bills[0].dueDate]}
        gasInfo = {[post.bills[1].amount, post.bills[1].paidOff,post.bills[1].dueDate]}
        mortInfo = {[post.bills[2].amount, post.bills[2].paidOff,post.bills[2].dueDate]}
        waterInfo = {[post.bills[3].amount, post.bills[3].paidOff,post.bills[3].dueDate]}
        rentInfo = {[post.rents[0].amount, post.rents[0].recieved,post.rents[0].dueDate]}
        />
      </div> 
    </div>
  );  
}

export default ShowPostPage;
