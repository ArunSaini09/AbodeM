import React, {useState} from 'react'
import { useParams } from "react-router-dom";

export default function EditButtonMortgage(props){
    const [newMortgage, setNewMortgage] = useState(props.mortgage);
    let params = useParams();

    const updateMortgage = async (e) => {
        e.preventDefault();
        try{
            //send put request
            //TODO: use the correct fetch url when backend is set
            const body = {newMortgage};
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
        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#UtilityModal">
             Edit
        </button>

        
        <div className="modal fade" id="UtilityModal" tabIndex="-1" aria-labelledby="UtilityModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="UtilityModalLabel">Utilities</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick ={() => {setNewUtility(props.utility)}}></button>
            </div>

            <div className="modal-body">
                <input type="text" className="form-control" value={newUtility} onChange={e => {setNewUtility(e.target.value)}}/>
                <input type="text" className="form-control" value={newUtility} onChange={e => {setNewUtility(e.target.value)}}/>
                <input type="text" className="form-control" value={newUtility} onChange={e => {setNewUtility(e.target.value)}}/>
            </div>

            <div className="modal-footer">
                {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                <button type="button" className="btn btn-primary" onClick={e => {updateMortgage(e)}}> Save </button>
            </div>
            </div>
        </div>
        </div>

    </>
    );
}