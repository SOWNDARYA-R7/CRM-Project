const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    customerId: {type:Number, required:true},
    contactId: {type:Number, required:true, unique:true},
    name: {type:String, required:true},
    email: {type:String, required:true}
})
module.exports = mongoose.model('Contact',contactSchema);