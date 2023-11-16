const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator')

const patientSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
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
    addresses: {
        type: [String]    
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
        relation: {
            type: String,
            required: true
        }
        

    },
    required: true
    }
}, {timestamps: true});

patientSchema.statics.register = async function(reqBody) {
    const email = reqBody.email;
    const password = reqBody.password;
    const username = reqBody.username;
    const gender = reqBody.gender;

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

    if(gender!=='male' && gender!=='female') {
        throw Error('Invalid gender');
    }

    const user = await this.create(reqBody);

    return user
}

patientSchema.statics.login = async function(username, password) {
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

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;