import React from 'react'

function AddressHeader(props){
    return(
        <div>
           <h1 className="text-start mb-4"> {props.address} </h1>
        </div>
    );
}

export default AddressHeader