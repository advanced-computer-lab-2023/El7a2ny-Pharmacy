const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const administratorSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Administrator = mongoose.model('Administrator', administratorSchema);
module.exports = Administrator;