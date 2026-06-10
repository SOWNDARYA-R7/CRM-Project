import { useNavigate } from "react-router-dom";
import { useState} from "react";
import axios from "axios";
import "./Lead.css";

function Lead(){
    const navigate = useNavigate();
    const addLeads = async () => {

    const newErrors = {};

    if(!customerId){
        newErrors.customerId = "Customer ID is required";
    }

    if(!name){
        newErrors.name = "Name is required";
    }

    if(!email){
        newErrors.email = "Email is required";
    }

    if(!password){
        newErrors.password = "Password is required";
    }
    else{
        const passwordRegex =
        /^[A-Z](?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{7,}$/;

        if(!passwordRegex.test(password)){
            newErrors.password =
            "Password must start with a capital letter, contain at least 8 characters, 1 number and 1 special character";
        }
    }

    if(Object.keys(newErrors).length > 0){
        setError(newErrors);
        return;
    }

    try{
        const token = localStorage.getItem("token");

        await axios.post(
            "http://localhost:5000/addleads",
            {
                customerId,
                name,
                email,
                password
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        setError({});

        setCustomerId("");
        setName("");
        setEmail("");
        setPassword("");

    }
    catch(err){
        if(err.response?.status === 401){
            alert("Session Expired ,kindly log in again.");
            localStorage.removeItem("token");
            navigate("/");
        }
        if(err.response?.data?.errors){
            setError(err.response.data.errors);
        }
        else{
            console.log(err);
        }

    }
};

    const [customerId, setCustomerId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});

    return(

         <div className="container">
    <h1>Lead Form</h1>
    <p>Fill out the form to add a new lead.</p>
    <table>
        <tbody>
        <tr>
            <td>Customer ID:</td>
            <td><input type="number" id="customerId" value={customerId} onChange={(e)=> setCustomerId(e.target.value)}/>
            <span>{error.customerId}</span></td>
        </tr>
        <tr>
            <td>Name:</td>
            <td><input type="text" id="name" required value={name} onChange={(e)=>setName(e.target.value)}/><span>{error.name}</span></td>
        </tr>
        <tr>
            <td>Email:</td>
            <td><input type="email" id="email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <span>{error.email}</span></td>
        </tr>
        <tr>
            <td>Password:</td>
            <td><input type="password" id="password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <span>{error.password}</span></td>
        </tr>
        </tbody>
    </table>
    <br/>
    <button onClick={addLeads}>Add Lead</button><br/><br/>
    <button onClick={()=>navigate("/home")}>Back</button>
    </div>
    )
}
export default Lead;