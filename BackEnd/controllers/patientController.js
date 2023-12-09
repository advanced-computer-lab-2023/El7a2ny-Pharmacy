const Patient = require('../models/patientModel');
const mongoose = require('mongoose');
const PatientOTP = require('../models/patientOTPModel');
const Medicine = require('../models/medicineModel');
const Prescription = require('../models/prescriptionModel');
const jwt = require('jsonwebtoken')
const validator = require('validator')
const nodemailer = require('nodemailer');
const Cart = require('../models/cartModel');


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
        
        const cart = await Cart.findOne({patient_id: patient._id});
    
        if(!cart)
            await Cart.create({patient_id: patient._id});

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
    const medicines = await Medicine.find({isArchived: false}).sort({createdAt: -1});
    res.status(200).json(medicines);
};

const getMedicinesSearchByName = async (req, res) => {
    const {name} = req.params;

    const medicines = await Medicine.find({name: name, isArchived: false});
    
    if(!medicines)
        return res.status(404).json({error: 'no such medicine'});
     
    res.status(200).json(medicines);
};

const getMedicinesFilterByUsage = async (req, res) => {
    const {usage} = req.params;

    const medicines = await Medicine.find({medicinal_use: usage, isArchived: false});
    
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

const getCart = async (req, res) => {
    const id = req.user._id

    const cart = await Cart.findOne({patient_id: id}).populate('medicine_list.medicine');

    res.status(200).json(cart.medicine_list);
};

const removeMedicineFromCart = async (req, res) => {
    const patient_id = req.user._id
    const {id} = req.params;

    const cart = await Cart.updateOne({patient_id: patient_id}, { $pull: { 'medicine_list': { medicine: id } } });
     
    res.status(200).json(cart); 
};

const updateMedicineQuantityInCart = async (req, res) => {
    const patient_id = req.user._id
    const {id} = req.params;
    const {quantity} = req.body

    const medicine = await Medicine.findById(id);

    let cart = null;
    if(quantity <= medicine.availableQuantity)
        cart = await Cart.updateOne({"patient_id": patient_id, "medicine_list.medicine": id}, { $set: { "medicine_list.$.quantity": quantity } });
    else
        return res.status(400).json({error: 'you exceeded the available quantity of this item'});

    res.status(200).json(cart); 
};

const getNotFilledPrescriptions = async (req, res) => {
    const id = req.user._id

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'no such patient'});

    const patient = await Patient.findById({_id: id});
    
    if(!patient)
        return res.status(404).json({error: 'no such patient'});
     
    const prescriptions = await Prescription.find({patient_id: id, isFilled: false});
    
    res.status(200).json(prescriptions);
};

const getPrescription = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'no such prescription'});

    const prescription = await Prescription.findById(id);
    
    if(!prescription)
        return res.status(404).json({error: 'no such prescription'});
     
    res.status(200).json(prescription);
};

const addMedicineToCart = async (req, res) => {
    const patient_id = req.user._id
    const {id} = req.params;
    
    const medicine = await Medicine.findById(id);

    if(medicine.availableQuantity <= 0 || medicine.isArchived)
        return res.status(400).json({error: 'sorry, this item is not available right now'});

    const cart = await Cart.updateOne({patient_id: patient_id}, { $push: { 'medicine_list': { medicine: id, quantity: 1 } } });
     
    res.status(200).json(cart); 
};

const getOverTheCounterMedicines = async (req, res) => {
    const medicines = await Medicine.find({isOverTheCounter: true, isArchived: false}); 
    res.status(200).json(medicines);
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
    addAddress,
    getCart,
    removeMedicineFromCart,
    updateMedicineQuantityInCart,
    getNotFilledPrescriptions,
    getPrescription,
    addMedicineToCart,
    getOverTheCounterMedicines
};