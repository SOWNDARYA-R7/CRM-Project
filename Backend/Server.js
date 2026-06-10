require("dotenv").config();

const express = require ('express');
const app = express();

const mongoose = require('mongoose');
const Lead = require('../models/Lead');
const Contact = require('../models/contact');
const verifyToken = require("./middleware/authMiddleware");

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/Leaddb')
.then(() => console.log("Connect to mongodb"))
.catch((err)=>console.log("Error",err));

app.get("/",(req,res)=>{
    res.send("Backend is running");
});

const { login } = require("./controllers/authController");
app.post("/login", login)

app.post("/addleads",verifyToken,async (req,res)=>{
    try{
    const { customerId, name, email, password } = req.body;    
    const existingId = await Lead.findOne({customerId});
    const existingemail = await Lead.findOne({email});
    const error = {};
    if(existingId){
        error.customerId = ("CustomerId alread exist");
    }
    if(existingemail){
          error.email = ("Enter Valid email");
    }
    if(Object.keys(error).length > 0){
     return res.status(400).json({errors:error})
    }
    await Lead.create(req.body);
    res.status(201).json({message:"Lead added successfully"});
    }
    catch(err){
        console.log(err);
            res.status(500).json({message:"Error adding lead"});
    }
});

app.get('/leads',verifyToken,async (req,res)=>{
    const Leads = await Lead.find();
    res.json({message:"All Leads as been Displayed Successfully", leads: Leads});
});

app.get('/getContacts',verifyToken,async (req,res)=>{
    const contacts = await Contact.find();
    res.json({message:"All Contacts as been Displayed Successfully", contacts: contacts});
});

app.delete('/deleteLead/:customerId', verifyToken,async (req, res) => {
try{
    const customerId = Number(req.params.customerId);
    const deletedLead = await Lead.findOneAndDelete({ customerId });
    console.log("Deleted Lead:", deletedLead);
    res.json({
        message: deletedLead ? "Lead Deleted Successfully" : "Lead not found"
    });
}
catch(err){
    console.log(err);
    res.status(500).json({message:"Server Error"});
}

});

app.post('/addContact',verifyToken,async(req,res)=>{
    try{
        console.log(req.body);
        const {customerId, contactId, name, email} = req.body;
        const existingId = await Contact.findOne({ customerId });
const existiD = await Contact.findOne({ contactId });
const existemail = await Contact.findOne({ email });
        const errors = {};

if(existingId){
    errors.customerId = ("CustomerId already exists");
}

if(existiD){
    errors.contactId = ("ContactId already exists");
}

if(existemail){
    errors.email = ("Email already exists");
}

if(Object.keys(errors).length > 0){
    return res.status(400).json({ errors });
}

        const contact = await Contact.create({customerId, contactId, name, email});
        console.log(contact);
        res.status(201).json({message:"Contact added successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Server Error "});
    }
})

app.listen(5000,()=>{
    console.log("Server running in port 5000");
});