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
    getPharmacist,
    getChat,
    sendMessage
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

router.patch('/add-medicine-to-cart/:id', addMedicineToCart); //req 24, 25, id is the medicine id

router.get('/over-the-counter-medicines', getOverTheCounterMedicines); //req 24

router.get('/my-addresses', getAddresses); //req 31

router.post('/credit-card-payment', creditCardPayment); //req 32, response is the payment url

router.post('/place-order', placeOrder); //req 29

router.get('/my-orders', getMyOrders); //req 33

router.get('/one-order/:id', getOrder); //req 34, id is id of the order

router.patch('/cancel-order/:id', cancelOrder); //req 35, id is id of the order

router.get('/my-wallet', getWallet); //req 38

router.get('/medicine-alternatives/:id', getMedicineAlternatives); //req 36, id is id of the medicine

router.get('/all-pharmacists', getPharmacists); //req 39

router.get('/one-pharmacist/:id', getPharmacist); //req 39

router.post('/chat/:id', getChat); //req 39, id is id of the pharmacist, response is the full chat

router.patch('/send-message/:id', sendMessage); //req 39, id is id of the chat, send message in req body

module.exports = router;