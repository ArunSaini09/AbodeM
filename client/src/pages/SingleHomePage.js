import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import { useParams } from "react-router-dom";
import PostsListPage from "./HomeListPage";
import AddressHeader from "../components/AddressHeader";
import PropertyInfoBlock from "../components/PropertyInfoBlock";
import { useHouseData } from "../context/HouseDataContext";
import "./form/Style/SingleHomePage.css";
/*
  make call to get all rent, mortgage, bill records of property
  render 'PropertyInfoBlocks' with the correct information
  'onClicking' the + button, a new (possibly blank) 'PropertyInfoBlock' should be rendered ontop of the preexisting ones
*/

function ShowHomePage() {
  const houseData = useHouseData();
  const { loading, setLoading } = houseData;
  const { error, setError } = houseData;
  const { userHouses, setUserHouses } = houseData;

  const [house, setHouse] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  //array that will hold <PropertyInfoBlock/> component info in objects
  const [monthInfoBlocks, setMonthInfoBlocks] = useState([]);
  const [address, setAddress] = useState([]);

  let params = useParams();

  const generateNewMonthInfoBlock = (e) => {
    //place a blank PropertyInfoBlock component, unpack the other components after
    setMonthInfoBlocks([monthInfoBlocks[0], ...monthInfoBlocks]);
  };

  useEffect(() => {
    console.log("User houses on first render: ", userHouses);
    console.log("House id: ", params.id);

    if (userHouses.length === 0) {
      console.log("Skipping effect because user houses not filled yet");
      return;
    }

    getHouse();
    async function getHouse() {
      try {
        const tempHouse = userHouses.find(
          (house) => house.id === parseInt(params.id)
        );
        console.log("Found the temp house: ", tempHouse);

        if (house) {
          setAddress(house.address);
          setHouse(tempHouse);
          getData(tempHouse);
          console.log(tempHouse);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching /api/house/" + params.id, error);
        setError(true);
      }
    }
    return () => {
      // clean up function
    };
  }, [userHouses]);

  async function getData(house) {
    setLoading(true);
    try {
      //set it to an array holding an object
      const billTypes = ["Gas", "Mortgage", "Water", "Electric"];
      const tempMonthInfoObject = {};

      //getting the latest bills of each billType
      for (const billType of billTypes) {
        const bill = house.bills?.find((bill) => bill.billType === billType);
        console.log("found bill: ", bill);
        tempMonthInfoObject[billType.toLowerCase() + "Info"] = bill;
      }
      //getting the latest rent of the month
      tempMonthInfoObject["rentInfo"] = house.rents?.[0];

      setMonthInfoBlocks([tempMonthInfoObject]);
      //console.log(post);
      setLoading(false);
    } catch (error) {
      console.error(
        "Error fetching /api/house/" + params.id + "/records",
        error
      );
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
        <div className="col-9 address-header">
          <AddressHeader address={house.address} />
        </div>
        <div className="col">
          <button
            className="btn btn-secondary add-btn"
            onClick={generateNewMonthInfoBlock}
          >
            +
          </button>
        </div>
      </div>
      <div>
        {monthInfoBlocks.map((infoBlock, index) => {
          console.log("this is the info block: ", infoBlock);
          return (
            <PropertyInfoBlock
              key={index}
              electricInfo={infoBlock.electricInfo}
              gasInfo={infoBlock.gasInfo}
              mortInfo={infoBlock.mortgageInfo}
              waterInfo={infoBlock.waterInfo}
              rentInfo={infoBlock.rentInfo}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ShowHomePage;
