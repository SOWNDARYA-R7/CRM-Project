import "./adminPanel.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function Adminpanel(){

    const navigate = useNavigate();
    const [leads, setLeads] = useState([]);
    const [contacts, setContact] = useState([]);

    const getLeads = async () =>{
           try{
            const token = localStorage.getItem("token");
        const response = await axios.get(
            "http://localhost:5000/leads",{
                headers:{
                    Authorization:
                    `Bearer ${token}`
                }
            }
        );
        setLeads(response.data.leads);
    }
    catch(err){
        if(err.response?.status === 401){
            alert("Session Expired ,kindly log in again.");
            localStorage.removeItem("token");
            navigate("/");
        }
        console.log(err);
    }
};
useEffect(() =>{
    getLeads();
},[]);

    const getContact = async ()=>{
        try{
            const token = localStorage.getItem("token")
        const response = await axios.get("http://localhost:5000/getContacts",{
            headers:{
                Authorization:
                `Bearer ${token}`
            }
        });
        setContact(response.data.contacts);
    }
    catch(err){
        if(err.response?.status === 401){
            alert("Session Expired ,kindly log in again.");
            localStorage.removeItem("token");
            navigate("/");
        }
        console.log(err);
    }
}
    const deleteLead = async(customerId) => {
         try{
            const token = localStorage.getItem("token");
            const response = await axios.delete(`http://localhost:5000/deleteLead/${customerId}`,{
                headers:{
                    Authorization:
                        `Bearer ${token}`
                    
                }
            });
            console.log(response.data);
            setLeads(
                leads.filter(
                    (lead) => lead.customerId !== customerId
                )
            )
         }
         catch(err){
            if(err.response?.status === 401){
            alert("Session Expired ,kindly log in again.");
            localStorage.removeItem("token");
            navigate("/");
        }

            console.log(err);
         }
    }

    const logout = () =>{
        localStorage.removeItem("token");
        navigate("/");
    }

    return(
        <div className="container">
    <h1>Admin Panel</h1>
    <p>Welcome to your admin panel! Here you can manage your users and organize your leads and contacts.</p>
    
    <button onClick={getLeads}>Leads</button>
    <button onClick = {() => navigate("/leads")}>+</button>
    <br/> <br/>
    <table border="1">
        <thead>
            <tr>
                <th>Customer_Id</th>
                <th>Name</th>
                <th>email</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
             {
        leads.map((lead) =>(
            <tr key = {lead._id}>
                <td>{lead.customerId}  </td>
                <td>{lead.name}   </td>
                <td>{lead.email}   </td>
                <td><button onClick={()=>deleteLead(lead.customerId)}>D</button></td>
                </tr>
        ))
    }
        </tbody>
    </table>
    

    <br/><br/>
    <button onClick={getContact}>Contacts</button>
         <button onClick={() => navigate("/contacts")}>+</button>
     <br/><br/>
    <table border="1">
        <thead>
            <tr>
                <th>contact_Id</th>
                <th>Name</th>
                <th>email</th>
            </tr>
        </thead>
        <tbody>
             {
        contacts.map((contact) =>(
            <tr key = {contact._id}>
                <td>{contact.contactId}  </td>
                <td>{contact.name}   </td>
                <td>{contact.email}   </td>
            </tr>
        ))
    }
        </tbody>
    </table>
    <p id="conresult"></p>
    <button id="logout" onClick={logout}>Logout</button>
</div>
    )
}
export default Adminpanel;