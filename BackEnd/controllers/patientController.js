const Patient = require('../models/patientModel');
const mongoose = require('mongoose');
const PatientOTP = require('../models/patientOTPModel');
const Medicine = require('../models/medicineModel');
const Prescription = require('../models/prescriptionModel');
const jwt = require('jsonwebtoken')
const validator = require('validator')
const nodemailer = require('nodemailer');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const PharmacistNotification = require('../models/pharmacistNotificationModel');
const Pharmacist = require('../models/pharmacistModel');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

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
    
    const medicine = await Medicine.findById(id);
    const cartTemp1 = await Cart.findOne({patient_id: patient_id});
    const cartTemp = await Cart.findOne({ patient_id: patient_id, 'medicine_list.medicine': id }).select('medicine_list.$');
    const currentQuantity = cartTemp.medicine_list[0].quantity;
    const newTotal = (cartTemp1.total - (currentQuantity * medicine.price));
    const cart = await Cart.updateOne({patient_id: patient_id}, { $pull: { 'medicine_list': { medicine: id } }, total: newTotal});
    
    res.status(200).json(cart); 
};

const updateMedicineQuantityInCart = async (req, res) => {
    const patient_id = req.user._id
    const {id} = req.params;
    const {quantity} = req.body

    const medicine = await Medicine.findById(id);

    let cart = null;
    if(quantity <= medicine.availableQuantity) {
        const cartTemp1 = await Cart.findOne({patient_id: patient_id});
        const cartTemp = await Cart.findOne({ patient_id: patient_id, 'medicine_list.medicine': id }).select('medicine_list.$');
        const currentQuantity = cartTemp.medicine_list[0].quantity;
        const newTotal = (cartTemp1.total - (currentQuantity * medicine.price)) + (quantity * medicine.price);
        cart = await Cart.updateOne({"patient_id": patient_id, "medicine_list.medicine": id}, { $set: { "medicine_list.$.quantity": quantity }, total: newTotal});
    }
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

    const exists = await Cart.findOne({ "patient_id": patient_id, "medicine_list": { $elemMatch: { medicine: id } } });
    if(exists)
        return res.status(400).json({error: 'this item is already in your cart'});

    const cartTemp = await Cart.findOne({patient_id: patient_id});
    const cart = await Cart.updateOne({patient_id: patient_id}, { $push: { 'medicine_list': { medicine: id, quantity: 1 } }, total: medicine.price + cartTemp.total});
     
    res.status(200).json(cart); 
};

const getOverTheCounterMedicines = async (req, res) => {
    const medicines = await Medicine.find({isOverTheCounter: true, isArchived: false}); 
    res.status(200).json(medicines);
};

const getAddresses = async (req, res) => {
    const id = req.user._id

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'no such patient'});

    const patient = await Patient.findById(id).select({password: 0});
    
    if(!patient)
        return res.status(404).json({error: 'no such patient'});
     
    res.status(200).json(patient.addresses);
};

const creditCardPayment = async (req, res) => {
    const id = req.user._id
   
    const cart = await Cart.findOne({patient_id: id}).populate('medicine_list.medicine');
    let items = [];
    for(let i = 0; i < cart.medicine_list.length; i++) {
        items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: cart.medicine_list[i].medicine.name
                },
                unit_amount: cart.medicine_list[i].medicine.price * 100
            },
            quantity: cart.medicine_list[i].quantity
        })
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: items,
            success_url: "https://google.com", // when user press pay button redirects to link
            cancel_url: "https://facebook.com" // if user cancelled payment (pressed back) redirects to link
        })

        res.json({url: session.url})
    } catch(e) {
        res.status(500).json({error: e.message});
    }
};

const placeOrder = async (req, res) => {
    const patient_id = req.user._id
    const {address, payment_method} = req.body
    
    const cart = await Cart.findOne({patient_id: patient_id});

    if(payment_method == 'wallet') {
        const patient = await Patient.findById(patient_id);
        if(patient.wallet >= cart.total) 
            await Patient.findOneAndUpdate({_id: patient_id}, {wallet: patient.wallet - cart.total});
        else
            return res.status(400).json({error: 'Sorry, the amount in your wallet is not enough'});
    }

    try {
        const order = await Order.create({
            patient_id, 
            medicine_list: cart.medicine_list,
            address,
            payment_method,
            status: 'confirmed',
            total: cart.total
        });

        //update medicine, cart, prescription
        for(let i = 0; i < cart.medicine_list.length; i++) {
            const medicine = await Medicine.findById(cart.medicine_list[i].medicine);
            await Medicine.findOneAndUpdate({_id: cart.medicine_list[i].medicine}, {availableQuantity: medicine.availableQuantity - cart.medicine_list[i].quantity, sales: medicine.sales + cart.medicine_list[i].quantity});
        }

        await Cart.findOneAndUpdate({patient_id: patient_id}, {medicine_list: [], total: 0});

        const medicinesOrdered = [];
        order.medicine_list.forEach(e => {medicinesOrdered.push(e.medicine)});

        const outOfStockMedicines = await Medicine.find({_id: {$in: medicinesOrdered}, availableQuantity: {$lte: 0}});
        let medicineNames = [];
        for(let i = 0; i < outOfStockMedicines.length; i++) {
            await PharmacistNotification.create({content: 'The medicine ' + outOfStockMedicines[i].name + ' is out of stock'});
            medicineNames.push(outOfStockMedicines[i].name);
        }

        if(medicineNames.length > 0) {
            const text = medicineNames.join(', ');

            const transporter = nodemailer.createTransport({
                service: 'hotmail',
                auth: {
                    user: 'abdulla_ahly@hotmail.com',
                    pass: 'ahlyplayer'
                }
                });
            
            
            const pharmacists = await Pharmacist.find();
            let emails = [];
            pharmacists.forEach(e => {emails.push(e.email)});
            
            const mailOptions = {
                from: 'abdulla_ahly@hotmail.com',
                to: emails,
                subject: 'Medicine Out Of Stock',
                text: 'The following medicines are out of stock: ' + text
                };
            
            transporter.sendMail(mailOptions);
        }    

        res.status(200).json(order);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

const getMyOrders = async (req, res) => {
    const id = req.user._id

    const orders = await Order.find({patient_id: id}).populate('medicine_list.medicine');
    
    res.status(200).json(orders);
};

const getOrder = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'no such order'});

    const order = await Order.findById(id).populate('medicine_list.medicine');
    
    if(!order)
        return res.status(404).json({error: 'no such order'});
     
    res.status(200).json(order);
};

const cancelOrder = async (req, res) => {
    const patient_id = req.user._id
    const {id} = req.params

    const order = await Order.findById(id).populate('medicine_list.medicine');

    if(order.payment_method == 'wallet' || order.payment_method == 'credit card') {
        const patient = await Patient.findById(patient_id);
        await Patient.findOneAndUpdate({_id: patient_id}, {wallet: patient.wallet + order.total});
    }

    //update medicine, prescription
    for(let i = 0; i < order.medicine_list.length; i++) {
        const medicine = await Medicine.findById(order.medicine_list[i].medicine);
        await Medicine.findOneAndUpdate({_id: medicine._id}, {availableQuantity: medicine.availableQuantity + order.medicine_list[i].quantity, sales: medicine.sales - order.medicine_list[i].quantity});
    }    
        
    const order2 = await Order.findOneAndUpdate({_id: id}, {status: 'cancelled'});

    res.status(200).json(order2);
    
};

const getWallet = async (req, res) => {
    const id = req.user._id

    const patient = await Patient.findById(id);
     
    res.status(200).json(patient.wallet);
};

const getMedicineAlternatives = async (req, res) => {
    const {id} = req.params
    const medicine = await Medicine.findById(id);
    const medicines = await Medicine.find({isArchived: false, availableQuantity: {$gt: 0}, main_ingredient: medicine.main_ingredient, _id: {$ne: id}});
    res.status(200).json(medicines);
};

const getPharmacists = async (req, res) => {
    const pharmacists = await Pharmacist.find({status: 'registered'}).select({password: 0});
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
    getOverTheCounterMedicines,
    getAddresses,
    creditCardPayment,
    placeOrder,
    getMyOrders,
    getOrder,
    cancelOrder,
    getWallet,
    getMedicineAlternatives,
    getPharmacists,
    getPharmacist
};