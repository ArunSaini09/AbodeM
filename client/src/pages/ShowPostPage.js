import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import { useParams } from "react-router-dom";
import PostsListPage from "./PostsListPage";
import AddressHeader from "../components/AddressHeader";
import PropertyInfoBlock from "../components/PropertyInfoBlock";

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
  console.log("getting id property data below");
  console.log(post)
  
  return (
    <div>
      <div className="row">
        <div className="col-10">
          <AddressHeader address = {post.address} />
        </div>
        <div className="col">
            {/*on click have a new blank propertyInfoBlock rendered,
            map over post info and create infoBlocks in a state outside this return() and render it with {blah} 
            then have the state re-rendered with [new propertyInfoBlock, old state name of propertyInfoBlock] after the click */}
            <button className="btn btn-secondary">+</button>
        </div>
      </div>
      <div>
        <PropertyInfoBlock post={post}/>
      </div>
    </div>
  );  
}

export default ShowPostPage;
