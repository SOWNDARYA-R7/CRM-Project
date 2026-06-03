const mongoose = require('mongoose');
const LeadSchema = new mongoose.Schema({
    customerId:
    {type:Number,
        unique:true,
        required:true},
    name:{type:String,
        required:true},
    email:{type:String,
        required:true,
        unique:true},
    password:{type:String,
        required:true}
});
module.exports = mongoose.model('Lead',LeadSchema);