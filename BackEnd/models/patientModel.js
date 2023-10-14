const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    mobile_number: {
        type: String,
        required: true
    },
    emergency_contact: {
        type: {
            name: {
            type: String,
            required: true
        },
        mobile_number: {
            type: String,
            required: true
        },
        

    },
    required: true
    },
    // health_package: {
    //     type: mongoose.Schema.ObjectId, ref: 'HealthPackage'
    // }
}, {timestamps: true});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;