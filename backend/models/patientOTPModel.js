const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const Patient = require('./patientModel');

const patientOTPSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

patientOTPSchema.statics.loginOTP = async function(username, password) {
    if(!username || !password) {
        throw Error('All fields must be filled');
    }

    const user = await this.findOne({username});

    if(!user) {
        throw Error('Incorrect username');
    }

    if(password !== user.password) {
        throw Error('Incorrect password');
     }

    const patient = await Patient.findOne({username});

    if(!patient) {
        throw Error('Incorrect username');
    }

    await this.findOneAndDelete({username});    

    return patient;
}

const patientOTP = mongoose.model('PatientOTP', patientOTPSchema);
module.exports = patientOTP;