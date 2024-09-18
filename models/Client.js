const mongoose = require('mongoose')
const documentSchema = require('./Document');

const ClientSchema = new mongoose.Schema({
    name: {type: String},
    documents: [documentSchema],
    contacts: [{type: mongoose.Schema.Types.ObjectId, ref:'Contact'}],
    roles: [{type: mongoose.Schema.Types.ObjectId, ref:'Role'}],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})

const Client = mongoose.model("Client", ClientSchema);
module.exports = Client;