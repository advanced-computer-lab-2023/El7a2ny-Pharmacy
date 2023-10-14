const Pharmacist = require('../models/pharmacistModel');
const mongoose = require('mongoose');

const registerRequest = async (req, res) => {
    const {
    username,
    name,
    password,
    email,
    hourlyRate,
    DOB,
    education,
    affiliation,
    speciality,
    session_price} = req.body;
    try {
        const pharmacist = await Pharmacist.create({
            username,
            name,
            password,
            email,
            hourlyRate,
            DOB,
            education,
            affiliation,
            speciality,
            status: 'pending'});
        res.status(200).json(pharmacist);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

const getPharmacists = async (req, res) => {
    const pharmacists = await Pharmacist.find({}).sort({createdAt: -1}).select({password: 0});
    res.status(200).json(pharmacists);
};

const getPending = async (req, res) => {
    const pending = await Pharmacist.find({"status": "pending"}).sort({createdAt: -1}).select({password: 0});
    res.status(200).json(pending);
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

module.exports = {
    registerRequest,
    getPharmacist,
    getPharmacists,
    removePharmacist,
    updatePharmacist,
    getPending
};