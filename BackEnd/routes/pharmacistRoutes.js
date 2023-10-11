const express = require('express');
const {
    registerRequest,
    getPharmacists,
    getPharmacist,
    removePharmacist,
    updatePharmacist,
    getPending
} = require('../controllers/pharmacistController');

const router = express.Router();

router.post('/register-request', registerRequest); //req 3

router.get('/all-pharmacists', getPharmacists); //req 8,9

router.get('/pending', getPending);

router.get('/one-pharmacist/:id', getPharmacist); //req 9

router.delete('/remove-pharmacist/:id', removePharmacist); //req 8

router.patch('/update-pharmacist/:id', updatePharmacist); //req 14

module.exports = router;
