import React, {useState} from 'react'
import FormAdress from "../form/FormAddress"
import FormInfo from "../form/FormRentMort"
import FormBills from "../form/FormBills"
import PostFormPage from "../PostFormPage"

function PropertyForm() {
    const [step, setStep] = useState(1);

    const [address, setAddress] = useState("");
    //
    const [stNum, setStNum] = useState("");
    const [stName, setStName] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    //

    const [rent, setRent] = useState("");
    const [rentDueDate, setRentDueDate] = useState("");
    const [tenanted, setTenanted] = useState(false);
    
    const [mortgage, setMortgage] = useState("");
    const [mortDueDate, setMortDueDate] = useState("");

    const [electric, setElectric] = useState("");
    const [electricDueDate, setElectricDueDate] = useState("");

    const [gas, setGas] = useState("");
    const [gasDueDate, setGasDueDate] = useState("");

    const [water, setWater] = useState("");
    const [waterDueDate, setWaterDueDate] = useState("");

    //proceed to next step
    const nextStep = () => {
        setStep(step + 1);
    };

    //go back to previous step
    const prevStep = () => {
        setStep(step - 1);
    };

    //handle field changes
    const handleChange = (input) => e => {
        if(input === "address"){
            setAddress(e.target.value);
        }else if(input ==="st_num"){
            setStNum(e.target.value);
        }else if(input ==="st_name"){
            setStName(e.target.value);
        }else if(input ==="city"){
            setCity(e.target.value);
        }else if(input ==="state"){
            setState(e.target.value);
        }else if(input ==="zip"){
            setZip(e.target.value);
        } else if(input ==="rent"){
            setRent(Number(e.target.value));
        } else if(input==="rent-due-date"){
            setRentDueDate(e.target.value);
        } else if(input ==="tenanted"){
            setTenanted(!tenanted);
        } else if(input ==="mortgage"){
            setMortgage(Number(e.target.value));
        } else if(input==="mort-due-date"){
            setMortDueDate(e.target.value);
        } else if(input ==="electric"){
            setElectric(Number(e.target.value));
        } else if(input==="electric-due-date"){
            setElectricDueDate(e.target.value);
        } else if(input ==="gas"){
            setGas(Number(e.target.value));
        } else if(input==="gas-due-date"){
            setGasDueDate(e.target.value);
        } else if(input ==="water"){
            setWater(Number(e.target.value));
        } else if(input==="water-due-date"){
            setWaterDueDate(e.target.value);
        }
    }

    const values = {step, stNum, stName, city, state, zip, address, rent, rentDueDate, tenanted, mortgage, mortDueDate, electric, electricDueDate, gas, gasDueDate, water, waterDueDate};

    if(step === 1){
        return(
            <FormAdress
            nextStep = {nextStep}
            handleChange = {handleChange}
            values = {values}
            />
        )
    }
    if(step === 2)
        return <FormInfo
                prevStep = {prevStep}
                nextStep = {nextStep}
                handleChange = {handleChange}
                values = {values}
                />
    if(step === 3)
        return <FormBills
                prevStep = {prevStep}
                nextStep = {nextStep}
                handleChange = {handleChange}
                values = {values}
                />
    if(step === 4)
        return <PostFormPage
                prevStep = {prevStep}
                values = {values}
                />
}

export default PropertyForm;