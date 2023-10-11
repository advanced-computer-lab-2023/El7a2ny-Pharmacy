const Medicine = require('../models/medicineModel');
const mongoose = require('mongoose');

const addMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.create(req.body);
        res.status(200).json(medicine);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

const getMedicines = async (req, res) => {
    const filter = req.query //name=marwan ===> {name: marwan}
    //console.log(filter)
    const medicines = await Medicine.find(filter).sort({createdAt: -1}).select({password: 0});
    res.status(200).json(medicines);
};

const removeMedicine = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'no such a medicine'});

    const medicine = await Medicine.findOneAndDelete({_id: id});
    
    if(!medicine)
        return res.status(404).json({error: 'no such a medicine'});
     
    res.status(200).json(medicine); 
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
module.exports = {
    addMedicine,
    getMedicines,
    removeMedicine,
    updateMedicine
};