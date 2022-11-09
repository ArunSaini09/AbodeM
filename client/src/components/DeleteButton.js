import React from 'react'

export default function DeleteButton(props){

    const deleteProperty = async(id) =>{
        try{
            const deleteProperty = await fetch(".../!id!",{
                method: "DELETE"
            });
        } catch(err){
            console.log(err.message);
        }
    }

    return(
        <button className = "btn btn-danger w-100" onClick={()=>{deleteProperty(props.id)}}>Delete Property</button>
    )
}