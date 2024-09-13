const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['cellphone', 'telephone', 'email', 'whatsapp', 'telegram'],
        required: true
    },
    value: {type:String, required: true},
    
    userType: {
        type: String,
        enum: ["User", "Especialist"],
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'userType'
    }

})

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;