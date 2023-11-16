const express = require('express');
const {
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
    changePassword
} = require('../controllers/administratorController');
const {requireAuthAdmin} = require('../middleware/requireAuth');

const router = express.Router();

router.post('/login', login); //req 3

router.post('/OTP-email', sendOTPEmail); //req 11

router.post('/OTP-login', loginOTP); //req 11

router.use(requireAuthAdmin);

router.post('/add-admin', addAdmin); //req 5

router.get('/all-patients', getPatients); //req 23

router.get('/one-patient/:id', getPatient); //req 23

router.delete('/remove-patient/:id', removePatient); //req 6

router.get('/all-medicines', getMedicines); //req 12, 13

router.get('/all-medicines-search-by-name/:name', getMedicinesSearchByName); //req 14

router.get('/all-medicines-filter-by-medicinal-use/:usage', getMedicinesFilterByUsage); //req 15

router.get('/all-pharmacists', getPharmacists); //req 22

router.get('/one-pharmacist/:id', getPharmacist); //req 22

router.delete('/remove-pharmacist/:id', removePharmacist); //req 6

router.patch('/pharmacist-request/:id', updatePharmacistStatus); //req 8

router.get('/all-pharmacists-requests', getRequests); //req 8

router.patch('/change-password', changePassword); //req 10

module.exports = router;