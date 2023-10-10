const Administrator = require('../models/administratorModel');
const mongoose = require('mongoose');

const addAdmin = async (req, res) => {
    try {
        const admin = await Administrator.create(req.body);
        res.status(200).json(admin);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

const getAdmins = async (req, res) => {
    const admins = await Administrator.find({}).sort({createdAt: -1}).select({password: 0});
    res.status(200).json(admins);
};

const removeAdmin = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'no such admin'});

    const admin = await Administrator.findOneAndDelete({_id: id});
    
    if(!admin)
        return res.status(404).json({error: 'no such admin'});
     
    res.status(200).json(admin); 
};

module.exports = {
    addAdmin,
    getAdmins,
    removeAdmin
};