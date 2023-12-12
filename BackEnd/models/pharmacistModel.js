const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator')

const pharmacistSchema = new Schema({
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
    status: {
        type: String,
        required: true
    },
    pharmacy_degree: {
        type: String
    },
    working_license: {
        type: String
    },
    gov_id: {
        type: String
    },
    wallet: {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps: true});

pharmacistSchema.statics.register = async function(reqBody) {
    const {
        username,
        name,
        password,
        email,
        hourlyRate,
        DOB,
        education,
        affiliation} = reqBody;

    if(!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }

    if(!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough');
    }
    
    const exists = await this.findOne({username});

    if(exists) {
        throw Error('Username already in use');
    }

    const user = await this.create({
        username,
        name,
        password,
        email,
        hourlyRate,
        DOB,
        education,
        affiliation,
        status: 'pending'});

    return user
}

pharmacistSchema.statics.login = async function(username, password) {
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

    return user;
}


const Pharmacist = mongoose.model('Pharmacist', pharmacistSchema);
module.exports = Pharmacist;