const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pharmacistSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hourlyRate: {
        type: Number,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    affiliation: {
        type: String,
        required: true
    },
    status: {
        type: String
    }
}, {timestamps: true});

const Pharmacist = mongoose.model('Pharmacist', pharmacistSchema);
module.exports = Pharmacist;