const Pharmacist = require('../models/pharmacistModel');
const mongoose = require('mongoose');
const Patient = require('../models/patientModel');
const Medicine = require('../models/medicineModel');
const PharmacistOTP = require('../models/pharmacistOTPModel');
const multer = require('multer');
const jwt = require('jsonwebtoken')
const validator = require('validator')
const nodemailer = require('nodemailer');


const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: '3d'})
}

const login = async (req, res) => {
    const {username, password} = req.body;
    try{
        const pharmacist = await Pharmacist.login(username, password);

        const token = createToken(pharmacist._id);

        res.status(200).json({pharmacist, token});
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};


const registerRequest = async (req, res) => {
    try {
        const pharmacist = await Pharmacist.register(req.body);
        const token = createToken(pharmacist._id);
        res.status(200).json({pharmacist, token});
    } catch(error) {
        res.status(400).json({error: error.message});
    }
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

const updatePharmacist = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'no such a pharmacist'});

    const pharmacist = await Pharmacist.findOneAndUpdate({_id: id}, {
        ...req.body
    });
    
    if(!pharmacist)
        return res.status(404).json({error: 'no such a pharmacist'});
     
    res.status(200).json(pharmacist); 
};

const sendOTPEmail = async (req, res) => {
    const username = req.body.username;

    const pharmacist = await Pharmacist.find({username: username});
    
    if(!pharmacist)
        return res.status(404).json({error: 'no such pharmacist'});

    const pharmacistEmail = await Pharmacist.find({username: username}).select('email');   
        
    const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    const exists = await DoctorOTP.findOne({username: username});   

    if(exists)
        return res.status(400).json({error: 'one time password already sent to your email'});

    await PharmacistOTP.create({username: username, password: otp});

    const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'abdulla_ahly@hotmail.com',
        pass: 'ahlyplayer'
    }
    });

    const mailOptions = {
    from: 'abdulla_ahly@hotmail.com',
    to: pharmacistEmail,
    subject: 'One Time Password',
    text: ('password: ' + otp.toString())
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        return res.status(400).json({error: error});
    } else {
        return res.status(200).json(pharmacist);
    }
    });
};

const loginOTP = async (req, res) => {
    const {username, password} = req.body;
    try{
        const pharmacist = await PharmacistOTP.loginOTP(username, password);

        const token = createToken(pharmacist._id);

        res.status(200).json({pharmacist, token});
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

const uploadWorkingLicense = async (req, res) => {
    const id = req.user._id

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'no such pharmacist'});

    const pharmacist = await Pharmacist.findOneAndUpdate({_id: id}, {working_license: req.name});
    
    if(!pharmacist)
        return res.status(404).json({error: 'no such pharmacist'});
     
    res.status(200).json(pharmacist);     

};

const uploadPharmacyDegree = async (req, res) => {
    const id = req.user._id

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'no such pharmacist'});

    const pharmacist = await Pharmacist.findOneAndUpdate({_id: id}, {pharmacy_degree: req.name});
    
    if(!pharmacist)
        return res.status(404).json({error: 'no such pharmacist'});
     
    res.status(200).json(pharmacist);     

};

const uploadGovID = async (req, res) => {
    const id = req.user._id

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'no such pharmacist'});

    const pharmacist = await Pharmacist.findOneAndUpdate({_id: id}, {gov_id: req.name});
    
    if(!pharmacist)
        return res.status(404).json({error: 'no such pharmacist'});
     
    res.status(200).json(pharmacist);     

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

const changePassword = async (req, res) => {
    const id = req.user._id

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'no such pharmacist'});

    if(!validator.isStrongPassword(req.body.password)) {
        return res.status(400).json({error: 'Password not strong enough'});
    }

    const pharmacist = await Pharmacist.findOneAndUpdate({_id: id}, {password: req.body.password});
    
    if(!pharmacist)
        return res.status(404).json({error: 'no such pharmacist'});
     
    res.status(200).json(pharmacist); 
};

const addMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.create(req.body);
        res.status(200).json(medicine);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

const updateMedicine = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'no such a medicine'});

    const medicine = await Medicine.findOneAndUpdate({_id: id}, {
        ...req.body
    });
    
    if(!medicine)
        return res.status(404).json({error: 'no such a medicine'});
     
    res.status(200).json(medicine); 
};

const uploadMedicineImage = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'no such medicine'});

    const medicine = await Medicine.findOneAndUpdate({_id: id}, { pictureUrl: req.name });
    
    if(!medicine)
        return res.status(404).json({error: 'no such medicine'});
     
    res.status(200).json(medicine);
};

const getWallet = async (req, res) => {
    const id = req.user._id

    const pharmacist = await Pharmacist.findById(id);
     
    res.status(200).json(pharmacist.wallet);
};

module.exports = {
    registerRequest,
    getPharmacist,
    getPharmacists,
    updatePharmacist,
    login,
    loginOTP,
    sendOTPEmail,
    uploadGovID,
    uploadPharmacyDegree,
    uploadWorkingLicense,
    getMedicines,
    getMedicinesFilterByUsage,
    getMedicinesSearchByName,
    changePassword,
    updateMedicine,
    addMedicine,
    uploadMedicineImage,
    getWallet
};