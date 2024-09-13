const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['cpf'],
        required: true
    },
    value: {type: String, required: true},
});

module.exports = documentSchema;