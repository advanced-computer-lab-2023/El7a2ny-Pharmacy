const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const Pharmacist = require('./pharmacistModel');

const pharmacistOTPSchema = new Schema({
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

pharmacistOTPSchema.statics.loginOTP = async function(username, password) {
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

    const pharmacist = await Pharmacist.findOne({username});

    if(!pharmacist) {
        throw Error('Incorrect username');
    }

    await this.findOneAndDelete({username});    

    return pharmacist;
}

const PharmacistOTP = mongoose.model('PharmacistOTP', pharmacistOTPSchema);
module.exports = PharmacistOTP;