import React, {useState} from 'react'
import { useParams } from "react-router-dom";

export default function EditButton(props){

    const [newRent, setNewRent] = useState(props.rent);
    let params = useParams();

    const updateRent = async (e) => {
        e.preventDefault();
        try{
            //send put request
            //TODO: use the correct fetch url when backend is set
            const body = {newRent};
            const response = await fetch("/api/micro_posts/house/" + params.id +"/", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            //TODO:
            //need to refresh state, to reflect new change
            //*****HERE*****//

        } catch(err){
            console.log(err.message);
        }
    }

    return(
    <>    
        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
             Edit
        </button>

        
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Rent</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick ={() => {setNewRent(props.rent)}}></button>
            </div>

            <div className="modal-body">
                <input type="text" className="form-control" value={newRent} onChange={e => {setNewRent(e.target.value)}}/>
            </div>

            <div className="modal-footer">
                {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                <button type="button" className="btn btn-primary" onClick={e => {updateRent(e)}}> Save </button>
            </div>
            </div>
        </div>
        </div>

    </>
    );
}