const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const Administrator = require('./administratorModel');

const adminOTPSchema = new Schema({
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

adminOTPSchema.statics.loginOTP = async function(username, password) {
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

    const admin = await Administrator.findOne({username});

    if(!admin) {
        throw Error('Incorrect username');
    }

    await this.findOneAndDelete({username});    

    return admin;
}

const AdminOTP = mongoose.model('AdminOTP', adminOTPSchema);
module.exports = AdminOTP;