const Patient = require('../models/patientModel');
const mongoose = require('mongoose');
const PatientOTP = require('../models/patientOTPModel');
const Medicine = require('../models/medicineModel');
const jwt = require('jsonwebtoken')
const validator = require('validator')
const nodemailer = require('nodemailer');


const register = async (req, res) => {
    try {
        const patient = await Patient.register(req.body);
        const token = createToken(patient._id);
        res.status(200).json({patient, token});
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: '3d'})
}

const login = async (req, res) => {
    const {username, password} = req.body;
    try{
        const patient = await Patient.login(username, password);

        const token = createToken(patient._id);

        res.status(200).json({patient, token});
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

const sendOTPEmail = async (req, res) => {
    const username = req.body.username;

    const patient = await Patient.find({username: username});
    
    if(!patient)
        return res.status(404).json({error: 'no such patient'});

    const patientEmail = await Patient.find({username: username}).select('email');   
        
    const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    const exists = await PatientOTP.findOne({username: username});   

    if(exists)
        return res.status(400).json({error: 'one time password already sent to your email'});

    await PatientOTP.create({username: username, password: otp});

    const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'abdulla_ahly@hotmail.com',
        pass: 'ahlyplayer'
    }
    });

    const mailOptions = {
    from: 'abdulla_ahly@hotmail.com',
    to: patientEmail,
    subject: 'One Time Password',
    text: ('password: ' + otp.toString())
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        return res.status(400).json({error: error});
    } else {
        return res.status(200).json(patient);
    }
    });
};

const loginOTP = async (req, res) => {
    const {username, password} = req.body;
    try{
        const patient = await PatientOTP.loginOTP(username, password);

        const token = createToken(patient._id);

        res.status(200).json({patient, token});
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

const getMedicines = async (req, res) => {
    const medicines = await Medicine.find({}).sort({createdAt: -1});
    res.status(200).json(medicines);
};

const getMedicinesSearchByName = async (req, res) => {
    const {name} = req.params;

    const medicines = await Medicine.find({name: name});
    
    if(!medicines)
        return res.status(404).json({error: 'no such medicine'});
     
    res.status(200).json(medicines);
};

const getMedicinesFilterByUsage = async (req, res) => {
    const {usage} = req.params;

    const medicines = await Medicine.find({medicinal_use: usage});
    
    if(!medicines)
        return res.status(404).json({error: 'no such medicine'});
     
    res.status(200).json(medicines);
};

const changePassword = async (req, res) => {
    const id = req.user._id

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'no such patient'});

    if(!validator.isStrongPassword(req.body.password)) {
        return res.status(400).json({error: 'Password not strong enough'});
    }

    const patient = await Patient.findOneAndUpdate({_id: id}, {password: req.body.password});
    
    if(!patient)
        return res.status(404).json({error: 'no such patient'});
     
    res.status(200).json(patient); 
};

const addAddress = async (req, res) => {
    const id = req.user._id

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'no such patient'});

    const patient = await Patient.findOneAndUpdate({_id: id}, { $push: { addresses: req.body.address } });
    
    if(!patient)
        return res.status(404).json({error: 'no such patient'});
     
    res.status(200).json(patient); 
};

module.exports = {
    register,
    login,
    sendOTPEmail,
    loginOTP,
    getMedicines,
    getMedicinesFilterByUsage,
    getMedicinesSearchByName,
    changePassword,
    addAddress
};