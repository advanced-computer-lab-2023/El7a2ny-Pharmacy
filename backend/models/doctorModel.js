const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
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
    speciality: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    medical_degree: {
        type: String
    },
    medical_license: {
        type: String
    },
    gov_id: {
        type: String
    }
}, {timestamps: true});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;