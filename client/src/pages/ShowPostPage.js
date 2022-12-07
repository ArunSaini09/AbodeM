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
  let params = useParams();

  const generateNewMonthInfoBlock = e => {
    //place a blank PropertyInfoBlock component, unpack the other components after
      setMonthInfoBlocks([<PropertyInfoBlock/>, ...monthInfoBlocks]);
  }

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let response = await fetch("/api/house/" + params.id);
        let postData = await response.json();
        setPost(postData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching /api/house/" + params.id, error);
        setError(true);
      }
    }

    getData();

    return () => {
      // clean up function
    };
  }, [params.id]);

  if (error)
    return (
      <ErrorAlert details={"Micro post with id=" + params.id + " not found"} />
    );
  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="row">
        <div className="col-10">
          <AddressHeader address = {post.address} />
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
        <PropertyInfoBlock post={post}/>
      </div>
    </div>
  );  
}

export default ShowPostPage;
