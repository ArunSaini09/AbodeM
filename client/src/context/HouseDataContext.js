import React, { useState, useEffect, createContext } from "react";
import { useLocation, Navigate } from 'react-router-dom';

const HouseDataContext = createContext();
const { Provider } = HouseDataContext;

const HouseDataProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [userHouses, setUserHouses] = useState([]);
	let location = useLocation();


	useEffect(() => {
		console.log("use effect of HouseData Context called");
		getUserHouses();

        return () => {
            // clean up function
        };
	}, []);

	async function getUserHouses() {
		console.log("getUserHouses called");

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
				let userHousesResponse = await response.json();
				console.log("The users houses are: ", userHousesResponse);
				getAllHouseRecords(userHousesResponse);
			} else {
				setError(true);
			}
		} catch (error) {
			console.error("Error fetching all user houses", error);
			setError(true);
		}
	} //end getUserHouses

	//houseID: houseRecordsObject
	async function getAllHouseRecords(userHousesResponse) {
		const tempHousesArray = [];
		console.log("getAllHouseRecords called");
		console.log(
			"get all house records got the userHousesResponseObject: ",
			userHousesResponse
		);

		const numUserHouses = userHousesResponse.length;
		let numFetchesFinished = 0;
		for (const house of userHousesResponse) {
			console.log("fetching house with houseid of: " + house.id);
			try {
				let response = await fetch(
					"/api/houses/house/" + house.id + "/records",
					{
						method: "GET",
						credentials: "include",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				let records = await response.json();
				console.log("Before sorting: ", JSON.stringify(records));
				records.bills.sort((a, b) => sortByDate(a, b));
				records.rents.sort((a, b) => sortByDate(a, b));
				function sortByDate(a, b) {
					// Convert the date strings to Date objects
					const dateA = new Date(a.createdAt);
					const dateB = new Date(b.createdAt);

					// Compare the dates
					if (dateA > dateB) {
						return -1;
					} else if (dateA < dateB) {
						return 1;
					} else {
						return 0;
					}
				}
				console.log("After sorting: ", JSON.stringify(records));

				tempHousesArray.push({
					...house,
					bills: records.bills,
					rents: records.rents,
				});

				numFetchesFinished++;

				if (numFetchesFinished === numUserHouses) {
					setUserHouses(tempHousesArray);
					console.log("After setting: ", [tempHousesArray]);
                    setLoading(false);
				}
			} catch (error) {
				console.error("Error fetching all house records", error);
				setError(true);
			}

		}
	}

	return (
		<Provider
			value={{
				loading,
                setLoading,
				error,
                setError,
				userHouses,
                setUserHouses,
                getAllHouseRecords,
                getUserHouses
			}}
		>
			{children}
		</Provider>
	);
};

// Create our own hook for accessing the context from any functional component
function useHouseData() {
	return React.useContext(HouseDataContext);
}

export { useHouseData, HouseDataProvider };
