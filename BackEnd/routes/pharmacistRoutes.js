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

router.post('/register-request', registerRequest); //req 2

router.get('/all-pharmacists', getPharmacists); //req 22

router.get('/one-pharmacist/:id', getPharmacist); //req 22

router.delete('/remove-pharmacist/:id', removePharmacist); //req 6

router.patch('/update-pharmacist/:id', updatePharmacist); //req 14

module.exports = router;
