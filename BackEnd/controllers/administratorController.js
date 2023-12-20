const Administrator = require('../models/administratorModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const Patient = require('../models/patientModel');
const Medicine = require('../models/medicineModel');
const nodemailer = require('nodemailer');
const Pharmacist = require('../models/pharmacistModel');
const validator = require('validator');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const AdminOTP = require('../models/adminOTPModel');

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
        await AdminOTP.findOneAndUpdate({username: username}, {password: otp});
    else
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

    await Cart.deleteMany({patient_id: id});
    await Order.deleteMany({patient_id: id});

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

const getSalesReport = async (req, res) => {
    try {
        const orders = await Order.find({ status: { $ne: 'cancelled' } }).populate('medicine_list.medicine');
        
        let totalMoney = 0;
        let totalMedicinesSold = 0;
        let medicineSales = {};

        orders.forEach(order => {
            if (order.status !== 'cancelled') {
                order.medicine_list.forEach(item => {
                    const medicine = item.medicine;
                    const quantity = item.quantity;
                    const price = medicine.price;

                    totalMedicinesSold += quantity;
                    totalMoney += quantity * price;

                    if (medicineSales[medicine._id]) {
                        medicineSales[medicine._id].quantity += quantity;
                        medicineSales[medicine._id].total += quantity * price;
                    } else {
                        medicineSales[medicine._id] = {
                            name: medicine.name,
                            quantity,
                            total: quantity * price
                        };
                    }
                });
            }
        });

        const report = {
            totalMoney,
            totalMedicinesSold,
            medicineSales: Object.values(medicineSales),
        };

        res.json(report);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSalesReportFilterByDate = async (req, res) => {
    try {
        // Get start and end dates from request parameters
        const startDate = req.params.startDate;
        const endDate = req.params.endDate;

        // Build the date filter object
        const dateFilter = {};
        if (startDate && endDate) {
            dateFilter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        // Use date filter in the Order query
        const orders = await Order.find({
            status: { $ne: 'cancelled' },
            ...dateFilter,
        }).populate('medicine_list.medicine');

        let totalMoney = 0;
        let totalMedicinesSold = 0;
        let medicineSales = {};

        orders.forEach(order => {
            if (order.status !== 'cancelled') {
                order.medicine_list.forEach(item => {
                    const medicine = item.medicine;
                    const quantity = item.quantity;
                    const price = medicine.price;

                    totalMedicinesSold += quantity;
                    totalMoney += quantity * price;

                    if (medicineSales[medicine._id]) {
                        medicineSales[medicine._id].quantity += quantity;
                        medicineSales[medicine._id].total += quantity * price;
                    } else {
                        medicineSales[medicine._id] = {
                            name: medicine.name,
                            quantity,
                            total: quantity * price
                        };
                    }
                });
            }
        });

        const report = {
            totalMoney,
            totalMedicinesSold,
            medicineSales: Object.values(medicineSales),
        };

        res.json(report);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSalesReportFilterByMedicine = async (req, res) => {
    const {name} = req.params;
    
    try {
        const orders = await Order.find({ status: { $ne: 'cancelled' }}).populate('medicine_list.medicine');
        
        let totalMoney = 0;
        let totalMedicinesSold = 0;
        let medicineSales = {};

        orders.forEach(order => {
            if (order.status !== 'cancelled') {
                order.medicine_list.forEach(item => {
                    const medicine = item.medicine;
                    const quantity = item.quantity;
                    const price = medicine.price;

                    if(medicine.name == name) {

                    totalMedicinesSold += quantity;
                    totalMoney += quantity * price;

                    if (medicineSales[medicine._id]) {
                        medicineSales[medicine._id].quantity += quantity;
                        medicineSales[medicine._id].total += quantity * price;
                    } else {
                        medicineSales[medicine._id] = {
                            name: medicine.name,
                            quantity,
                            total: quantity * price
                        };
                    }
                }
                });
            }
        });

        const report = {
            totalMoney,
            totalMedicinesSold,
            medicineSales: Object.values(medicineSales),
        };

        res.json(report);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
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
    changePassword,
    getSalesReport,
    getSalesReportFilterByDate,
    getSalesReportFilterByMedicine
};