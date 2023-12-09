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
    addAddress,
    getCart,
    removeMedicineFromCart,
    updateMedicineQuantityInCart,
    getNotFilledPrescriptions,
    getPrescription,
    addMedicineToCart,
    getOverTheCounterMedicines
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

router.get('/view-cart', getCart); //req 26

router.patch('/remove-medicine-from-cart/:id', removeMedicineFromCart); //req 27, id is the medicine id

router.patch('/update-medicine-quantity-in-cart/:id', updateMedicineQuantityInCart); //req 28, id is the medicine id, pass new quantity in req body

router.get('/all-not-filled-prescriptions', getNotFilledPrescriptions); //req 25

router.get('/one-prescription/:id', getPrescription); //req 25, the id of the prescription

router.patch('/add-medicine-to-cart/:id', addMedicineToCart); //req 25, id is the medicine id

router.get('/over-the-counter-medicines', getOverTheCounterMedicines); //req 24

module.exports = router;