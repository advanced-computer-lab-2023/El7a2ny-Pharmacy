const Administrator = require('../models/administratorModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const Patient = require('../models/patientModel');
const Medicine = require('../models/medicineModel');
const nodemailer = require('nodemailer');
const Pharmacist = require('../models/pharmacistModel');
const validator = require('validator')

const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: '3d'})
}

const login = async (req, res) => {
    const {username, password} = req.body;
    try{
        const admin = await Administrator.login(username, password);

        const token = createToken(admin._id);

        res.status(200).json({admin, token});
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

const addAdmin = async (req, res) => {
    try {
        const admin = await Administrator.register(req.body);
        res.status(200).json(admin);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

const sendOTPEmail = async (req, res) => {
    const username = req.body.username;

    const admin = await Administrator.find({username: username});
    
    if(!admin)
        return res.status(404).json({error: 'no such admin'});

    const adminEmail = await Administrator.find({username: username}).select('email');   
        
    const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    const exists = await AdminOTP.findOne({username: username});   

    if(exists)
        return res.status(400).json({error: 'one time password already sent to your email'});

    await AdminOTP.create({username: username, password: otp});

    const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'abdulla_ahly@hotmail.com',
        pass: 'ahlyplayer'
    }
    });

    const mailOptions = {
    from: 'abdulla_ahly@hotmail.com',
    to: adminEmail,
    subject: 'One Time Password',
    text: ('password: ' + otp.toString())
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        return res.status(400).json({error: error});
    } else {
        return res.status(200).json(admin);
    }
    });

    
};

const loginOTP = async (req, res) => {
    const {username, password} = req.body;
    try{
        const admin = await AdminOTP.loginOTP(username, password);

        const token = createToken(admin._id);

        res.status(200).json({admin, token});
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

const getPatients = async (req, res) => {
    const patients = await Patient.find({}).sort({createdAt: -1}).select({password: 0});
    res.status(200).json(patients);
};

const getPatient = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'no such patient'});

    const patient = await Patient.findById(id).select({password: 0});
    
    if(!patient)
        return res.status(404).json({error: 'no such patient'});
     
    res.status(200).json(patient);
};

const removePatient = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'no such patient'});

    const patient = await Patient.findOneAndDelete({_id: id});
    
    if(!patient)
        return res.status(404).json({error: 'no such patient'});

    res.status(200).json(patient); 
};

const getMedicines = async (req, res) => {
    const medicines = await Medicine.find({}).sort({createdAt: -1});
    res.status(200).json(medicines);
};

const getMedicinesSearchByName = async (req, res) => {
    const {name} = req.params;

    const medicine = await Medicine.find({name: name});
    
    if(!medicine)
        return res.status(404).json({error: 'no such medicine'});
     
    res.status(200).json(medicine);
};

const getMedicinesFilterByUsage = async (req, res) => {
    const {usage} = req.params;

    const medicine = await Medicine.find({medicinal_use: usage});
    
    if(!medicine)
        return res.status(404).json({error: 'no such medicine'});
     
    res.status(200).json(medicine);
};

const getPharmacists = async (req, res) => {
    const pharmacists = await Pharmacist.find({}).sort({createdAt: -1}).select({password: 0});
    res.status(200).json(pharmacists);
};

const getPharmacist = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'no such a pharmacist'});

    const pharmacist = await Pharmacist.findById(id).select({password: 0});
    
    if(!pharmacist)
        return res.status(404).json({error: 'no such a pharmacist'});
     
    res.status(200).json(pharmacist);
};

const removePharmacist = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'no such a pharmacist'});

    const pharmacist = await Pharmacist.findOneAndDelete({_id: id});
    
    if(!pharmacist)
        return res.status(404).json({error: 'no such a pharmacist'});
     
    res.status(200).json(pharmacist); 
};

const updatePharmacistStatus = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'no such pharmacist'});

    const pharmacist = await Pharmacist.findOneAndUpdate({_id: id}, {status: req.body.status});
    
    if(!pharmacist)
        return res.status(404).json({error: 'no such pharmacist'});
     
    res.status(200).json(pharmacist); 
};

const getRequests = async (req, res) => {
    const pharmacists = await Pharmacist.find({status: 'pending'}).sort({createdAt: -1}).select({password: 0});
    res.status(200).json(pharmacists);
};

const changePassword = async (req, res) => {
    const id = req.user._id

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'no such admin'});

    if(!validator.isStrongPassword(req.body.password)) {
        return res.status(400).json({error: 'Password not strong enough'});
    }

    const admin = await Administrator.findOneAndUpdate({_id: id}, {password: req.body.password});
    
    if(!admin)
        return res.status(404).json({error: 'no such admin'});
     
    res.status(200).json(admin); 
};


module.exports = {
    addAdmin,
    login,
    sendOTPEmail,
    loginOTP,
    getPatients,
    getPatient,
    removePatient,
    getMedicines,
    getMedicinesSearchByName,
    getMedicinesFilterByUsage,
    getPharmacists,
    getPharmacist,
    removePharmacist,
    updatePharmacistStatus,
    getRequests,
    changePassword
};