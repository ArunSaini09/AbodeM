import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import Button from "../components/Button";
import HomeCard from "../components/HomeCard";
import { useHouseData } from "../context/HouseDataContext";

function PostsListPage() {
  const houseData = useHouseData();

	console.log("Trying to render postListsPage");
	const {loading, setLoading} = houseData;
	const {error, setError} = houseData;
	const {userHouses, setUserHouses} = houseData;

	useEffect(() => {
		/* let isMounted = true; */
		
      console.log(houseData);
      houseData.getUserHouses();
			return () => {
				// clean up function
			};
		}, []);

	if (error)
		return <ErrorAlert details="Failed to fetch all micro userHouses" />;
	if (loading) return <LoadingSpinner />;

	const refresh = (id) => {
		setUserHouses(userHouses.filter((userHouse) => userHouse.id !== id));
	};

	return (
		<div className="container-fluid text-center">
			<div className="row justify-content-center">
				<Button />
				{userHouses.map((house) => {
					const getMortgageBill = () =>
						house.bills?.find(
							(bill) => bill.billType === "Mortgage"
						);

					console.log("Rendering a house: ", house);

					return (
						<HomeCard
							{...house}
							address={house.address}
							rent={house.rents?.[0]}
							mortgage={getMortgageBill()}
							refresh={refresh}
							key={house.id}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default PostsListPage;
