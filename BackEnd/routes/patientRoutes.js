const express = require('express');
const {
    register,
    login,
    sendOTPEmail,
    loginOTP,
    getMedicines,
    getMedicinesFilterByUsage,
    getMedicinesSearchByName,
    changePassword,
    addAddress
} = require('../controllers/patientController');
const {requireAuthPatient} = require('../middleware/requireAuth');

const router = express.Router();

router.post('/register', register); //req 1

router.post('/login', login); //req 3

router.post('/OTP-email', sendOTPEmail); //req 13

router.post('/OTP-login', loginOTP); //req 13

router.use(requireAuthPatient);

router.get('/all-medicines', getMedicines); //req 12, 13

router.get('/all-medicines-search-by-name/:name', getMedicinesSearchByName); //req 14

router.get('/all-medicines-filter-by-medicinal-use/:usage', getMedicinesFilterByUsage); //req 15

router.patch('/change-password', changePassword); //req 10

router.patch('/add-address', addAddress); //req 30

module.exports = router;