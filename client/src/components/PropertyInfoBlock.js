import React from 'react'
import RentCard from "./RentCard";
import MortgageCard from "./MortgageCard";
import UtilityCard from "./UtilityCard"; 

export default function PropertyInfoBlock(props){
    return (
        <div>
            <div className="container">
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col">
                        <RentCard  rent = {props.post.rent} rentDueDate = {props.post.rentDueDate}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <MortgageCard mortgage = {props.post.mortgage} mortDueDate = {props.post.mortDueDate}/>
                        </div>
                    </div>       
                </div>
                <div className="col">
                    <UtilityCard 
                    electric = {props.post.electric}
                    gas = {props.post.gas}
                    water = {props.post.water}
                    /> 
                </div>
            </div>
            </div>
        </div>
    )
}