const Patient = require('../models/patientModel');
const mongoose = require('mongoose');

const register = async (req, res) => {
    try {
        const patient = await Patient.create(req.body);
        res.status(200).json(patient);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

const getPatients = async (req, res) => {
    const patients = await Patient.find({}).sort({createdAt: -1}).select({password: 0});
    res.status(200).json(patients);
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

module.exports = {
    register,
    getPatients,
    removePatient
};