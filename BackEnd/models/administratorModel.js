const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator')

const administratorSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, {timestamps: true});

administratorSchema.statics.register = async function(reqBody) {
    const password = reqBody.password;
    const username = reqBody.username;
    const email = reqBody.email;

    if(!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough');
    }

    if(!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    
    const exists = await this.findOne({username});

    if(exists) {
        throw Error('Username already in use');
    }

    const user = await this.create(reqBody);

    return user
}

administratorSchema.statics.login = async function(username, password) {
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

const Administrator = mongoose.model('Administrator', administratorSchema);
module.exports = Administrator;