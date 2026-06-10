import { useNavigate } from "react-router-dom"; 
import { useState } from "react";
import axios from "axios";
import "./contact.css"; 

function Contact(){
    const navigate = useNavigate();
    const addContacts = async() =>{
       try{
        const token = localStorage.getItem("token");
      await axios.post(
    "http://localhost:5000/addContact",
    {
        customerId,
        contactId,
        name,
        email
    },
    {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
);
        setError({});
        
        setCustomerId("");
        setContactId("");
        setEmail("");
        setName("");
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

}
    }

    const [customerId, setCustomerId] = useState("");
        const [contactId, setContactId] = useState("");
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [error, setError] = useState({})

    return (
         <div className="container">
     <h1>Contact Form</h1>
    <p>Fill out the form to add a new contact.</p>
    <table>
        <tbody>
        <tr>
            <td>Customer ID:</td>
            <td>
                <input type="number" id="customerId" required value={customerId} onChange={(e)=>setCustomerId(e.target.value)}/>
                <p>{error.customerId}</p>
            
            </td>
        </tr>
        <tr>
            <td>Contact ID:</td>
            <td>
                <input type="number" id="contactId" required value={contactId} onChange={(e)=>setContactId(e.target.value)}/>
                <p>{error.contactId}</p>
            </td>
        </tr>
        <tr>
            <td>Name:</td>
            <td>
               <input type="text" id="name" required value={name} onChange={(e)=>setName(e.target.value)}/>
            </td>
        </tr>
        <tr>
            <td>Email:</td>
            <td>
                <input type="email" id="email" required value={email} onChange={(e)=>setEmail(e.target.value)
                    
                }/>
                <p>{error.email}</p>
            </td>
        </tr>
        </tbody>
    </table><br/>
    <button onClick={addContacts}>Add Contact</button><br/><br/>
    <button onClick={() => navigate("/home")}>Back</button>
    
    </div>
    )
}
export default Contact;