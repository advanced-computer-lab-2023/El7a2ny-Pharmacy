const jwt = require('jsonwebtoken');
const Patient = require('../models/patientModel');
const Administrator = require('../models/administratorModel');
const Pharmacist = require('../models/pharmacistModel');

const requireAuthAdmin = async (req, res, next) => {
    const {authorization} = req.headers

    if(!authorization)
        return res.status(401).json({error: 'Request is not authorized'})

    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await Administrator.findOne({_id}).select('_id')
        if(!req.user)
            return res.status(401).json({error: 'Request is not authorized'})
        next()
    } catch(error) {
        res.status(401).json({error: 'Request is not authorized'})
    }
}

const requireAuthPatient = async (req, res, next) => {
    const {authorization} = req.headers

    if(!authorization)
        return res.status(401).json({error: 'Request is not authorized'})

    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await Patient.findOne({_id}).select('_id')
        if(!req.user)
            return res.status(401).json({error: 'Request is not authorized'})
        next()
    } catch(error) {
        res.status(401).json({error: 'Request is not authorized'})
    }
}

const requireAuthPharmacist = async (req, res, next) => {
    const {authorization} = req.headers

    if(!authorization)
        return res.status(401).json({error: 'Request is not authorized'})

    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await Pharmacist.findOne({_id}).select('_id')
        if(!req.user)
            return res.status(401).json({error: 'Request is not authorized'})
        const pharmacist = await Pharmacist.findOne({_id})

        if(pharmacist.status !== 'registered') {
            return res.status(401).json({error: 'Your request to register is still pending or declined'})
        }

        next()
    } catch(error) {
        res.status(401).json({error: 'Request is not authorized'})
    }
}

const requireAuthPendingPharmacist = async (req, res, next) => {
    const {authorization} = req.headers

    if(!authorization)
        return res.status(401).json({error: 'Request is not authorized'})

    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await Pharmacist.findOne({_id}).select('_id')
        if(!req.user)
            return res.status(401).json({error: 'Request is not authorized'})

        next()
    } catch(error) {
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = {
    requireAuthAdmin,
    requireAuthPatient,
    requireAuthPharmacist,
    requireAuthPendingPharmacist
}