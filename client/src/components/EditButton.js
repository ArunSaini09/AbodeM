import React, { useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import {TextField, Modal} from "@mui/material";
import { AdapterDayjs, } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useHouseData } from "../context/HouseDataContext";

export default function EditButton(props) {
	// console.log("edit button got: ", props);
	const houseData = useHouseData();
	const [amount, setAmount] = useState(props.amount);
	const [dueDate, setDueDate] = useState(dayjs(props.dueDate));  

	let params = useParams();

	const updateRent = async (e) => {
		e.preventDefault();
		try {
			//send put request
			const body = {
				amount: amount,
				dueDate: dueDate,
			};
			const response = await fetch("/api/houses/house/" + params.id + "/rent/" + props.id, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			let data = await response.json();
			console.log("changed to", data);
      props.refresh(data);
      houseData.getUserHouses();
    } catch (err) {
			console.log(err.message);
		}
	};

  
  const handleDueDateChange = (newValue) => {
    if (newValue !== dueDate) {
      setDueDate(newValue);
      console.log("Changed date to: ", newValue);
    }
  };

	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
					Edit
				</button>

				<div
					className="modal fade"
					id="exampleModal"
					tabIndex="-1"
					aria-labelledby="exampleModalLabel"
					aria-hidden="true"
				>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">
									Rent
								</h5>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
									onClick={() => {
										setAmount(props.amount);
                    setDueDate(dayjs(props.dueDate));
									}}
								></button>
							</div>

							{/* Drop down input fields */}
							<div className="modal-body">
                
								<div className="row">
									<div className="col-2">
										<label htmlFor="amountInput" className="text-left mt-1 align-middle">
											Amount:
										</label>
									</div>

									<div className="col-10">
										<input
											id="amountInput"
											type="text"
											className="form-control"
											value={amount}
											onChange={(e) => {
												setAmount(e.target.value);
											}}
										/>
									</div>
								</div>

								<br></br>

								<div className="row">
									<div className="col-2">
										<label htmlFor="dueDateInput" className="text-left mt-1 align-middle">
											Date:
										</label>
									</div>
                  
									<div className="col-10">
										<DateTimePicker
                      id = "dueDateInput"
											label="Due Date"
											value={dueDate}
											onChange={handleDueDateChange}
											renderInput={(params) => <TextField {...params} />}
										/>
									</div>
								</div>
							</div>

							<div className="modal-footer">
								{/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
								<button
									type="button"
									className="btn btn-primary"
									onClick={(e) => {
										updateRent(e);
									}}
								>
									Save
								</button>
							</div>
						</div>
					</div>
				</div>
			</LocalizationProvider>
		</>
	);
}


