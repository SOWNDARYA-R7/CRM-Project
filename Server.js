const express = require ('express');
const app = express();

const mongoose = require('mongoose');
const Lead = require('./models/Lead');
const Contact = require('./models/contact');


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

app.post("/addleads",async (req,res)=>{
    try{
    const { customerId, name, email, password } = req.body;     
    
    if(!customerId || !name || !email || !password){
        return res.status(400).json({message:"Kindly fill all the details"});
    }
    
    const existingId = await Lead.findOne({customerId});
    if(existingId){
        return res.status(400).json({message:"customerId already exists"});
    }

    const existingemail = await Lead.findOne({email});
    if(existingemail){
        return res.status(400).json({message:"Email already exists"});
    }
    await Lead.create(req.body);
    res.status(201).json({message:"Lead added successfully"});
    }
    catch(err){
        console.log(err);
            res.status(500).json({message:"Error adding lead"});
    }
});

app.get('/leads',async (req,res)=>{
    const Leads = await Lead.find();
    res.json({message:"All Leads as been Displayed Successfully", leads: Leads});
});

app.get('/getContacts',async (req,res)=>{
    const contacts = await Contact.find();
    res.json({message:"All Contacts as been Displayed Successfully", contacts: contacts});
});

app.delete('/deleteLead/:customerId', async (req, res) => {

    const customerId = Number(req.params.customerId);
    const deletedLead = await Lead.findOneAndDelete({ customerId });
    console.log("Deleted Lead:", deletedLead);
    res.json({
        message: deletedLead ? "Lead Deleted Successfully" : "Lead not found"
    });

});

app.post('/addContact',async(req,res)=>{
    try{
        console.log(req.body);
        const {customerId, contactId, name, email} = req.body;
        if(!customerId || !contactId || !name || !email){
            console.log("test1");
            return res.status(400).json({message:"Kindly Fill All Details"});
        }
        const existingId = await Contact.findOne({ customerId });
        if(existingId){
            console.log("test2");
            return res.status(400).json({message:"CustomerId already exists"});
        }
        const existiD = await Contact.findOne({contactId});
        if(existiD){
            console.log("test3");
            return res.status(400).json({message:"ContactId already exist"});
        }
        const existemail = await Contact.findOne({email});
        if(existemail){
            console.log("test4");
            return res.status(400).json({message:"Email already exists"});
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