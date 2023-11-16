const express = require('express');
const {
    registerRequest,
    login,
    loginOTP,
    sendOTPEmail,
    uploadGovID,
    uploadPharmacyDegree,
    uploadWorkingLicense,
    getMedicines,
    getMedicinesFilterByUsage,
    getMedicinesSearchByName,
    changePassword,
    updateMedicine,
    addMedicine,
    uploadMedicineImage
} = require('../controllers/pharmacistController');
const {requireAuthPharmacist, requireAuthPendingPharmacist} = require('../middleware/requireAuth');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        req.name = '' + (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000) + file.originalname;
        return cb(null, req.name)
    }
})
const upload = multer({ storage });

const router = express.Router();

router.post('/register-request', registerRequest); //req 2

router.post('/login', login); //req 3

router.post('/OTP-email', sendOTPEmail); //req 11

router.post('/OTP-login', loginOTP); //req 11

router.use(requireAuthPendingPharmacist);

router.patch('/upload-working-license', upload.single('file'), uploadWorkingLicense); //req 9

router.patch('/upload-pharmacy-degree', upload.single('file'), uploadPharmacyDegree); //req 9

router.patch('/upload-gov-id', upload.single('file'), uploadGovID); //req 9

router.use(requireAuthPharmacist);

router.get('/all-medicines', getMedicines); //req 12, 13

router.get('/all-medicines-search-by-name/:name', getMedicinesSearchByName); //req 14

router.get('/all-medicines-filter-by-medicinal-use/:usage', getMedicinesFilterByUsage); //req 15

router.patch('/change-password', changePassword); //req 10

router.post('/add-medicine', addMedicine); //req 16

router.patch('/update-medicine/:id', updateMedicine); //req 18

router.patch('/upload-medicine-image/:id', upload.single('file'), uploadMedicineImage); //req 17

module.exports = router;
