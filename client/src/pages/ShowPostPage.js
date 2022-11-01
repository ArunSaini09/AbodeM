import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import { useParams } from "react-router-dom";
import PostsListPage from "./PostsListPage";
import AddressHeader from "../components/AddressHeader";
import RentCard from "../components/RentCard";
import MortgageCard from "../components/MortgageCard";
import UtilityCard from "../components/UtilityCard";


function ShowPostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  let params = useParams();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let response = await fetch("/api/micro_posts/house/" + params.id);
        let postData = await response.json();
        setPost(postData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching /api/micro_posts/house/" + params.id, error);
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
    <div className="container">
      <div className="row">
        <AddressHeader address = {post.address} />
      </div>
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <RentCard  rent = {post.rent} rentDueDate = {post.rentDueDate}/>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <MortgageCard mortgage = {post.mortgage}/>
            </div>
          </div>   
        </div>
        <div className="col">
          <UtilityCard 
          electric = {post.electric}
          gas = {post.gas}
          water = {post.water}
          /> 
        </div>
      </div>
    </div>
  );
}

export default ShowPostPage;
