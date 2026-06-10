import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Login(){

    const navigate = useNavigate();

    const changePassword=()=>{
        console.log("password changed");
    }

const validation = async() =>{
    const response = await axios.post("http://localhost:5000/login",
        {
            email,
            password
        }
    );
    localStorage.setItem(
        "token",
        response.data.token
    );
    navigate("/home");
}

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

    return(
        <div className="container">
    <h1>Login Page</h1>
    <input type="email" id="email" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
    <br/>
    <input type="password" id="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>

    <button type ="button" onClick={changePassword}>Forget password</button><br/><br/>
    <button onClick={validation}>Login</button>
    <p id="result"></p>
    </div>
    );
}

export default Login;