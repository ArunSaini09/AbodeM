import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import Button from "../components/Button";
import HomeCard from "../components/HomeCard";

function PostsListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [houseIDs, setHouseIDs] = useState([]);
  const [mortValues, setMortValues] = useState([]);
  const [rentValues, setRentValues] = useState([]);

  /* let isMounted = true; */
  async function getData() {
    setLoading(true);
    try {
      let response = await fetch("/api/houses/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        let allPosts = await response.json();

        setPosts(allPosts);

        const idList = [];
        for (let i = 0; i < allPosts.length; i++) {
          idList.push(allPosts[i].id);
        }
        //console.log(idList);
        setHouseIDs((prev) => [...prev, idList]);

        //getValues();
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching all micro_posts", error);
      setError(true);
    }
  } //end getData

  async function getValues() {
    const mortArr = [];
    const rentArr = [];
    for (let i = 0; i < houseIDs.length; i++) {
      try {
        let response = await fetch(
          "/api/houses/house/" + houseIDs[i] + "/records",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let record = await response.json();
        if (record.bills.length === 0) {
          mortArr.push(0);
        } else {
          mortArr.push(record.bills[2].amount);
        }

        if (record.rents.length === 0) {
          rentArr.push(0);
        } else {
          rentArr.push(record.rents[0].amount);
        }
      } catch (error) {
        console.error("Error fetching all mort/rent values", error);
        setError(true);
      }
    }
    let newPost = posts;
    for (let i = 0; i < newPost.length; i++) {
      newPost[i].rent = rentArr[i];
      newPost[i].mortgage = mortArr[i];
    }

    setPosts((prev) => {
      return [...prev, newPost];
    });
    //console.log(posts);
    setLoading(false);
  } //end getValues()
  useEffect(() => {
    getData();
    getValues();

    return () => {
      // clean up function
    };
  }, []); // esline-disable-next-line react-hooks/exhaustive-deps

  if (error) return <ErrorAlert details="Failed to fetch all micro posts" />;
  if (loading) return <LoadingSpinner />;

  const refresh = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="container-fluid text-center">
      <div className="row justify-content-center">
        <Button />
        {posts.map((entryData) => (
          <HomeCard
            {...entryData}
            address={entryData.address}
            rent={entryData.rent}
            mortgage={entryData.mortgage}
            key={entryData.id}
            refresh={refresh}
          />
        ))}
      </div>
    </div>
  );
}

export default PostsListPage;
