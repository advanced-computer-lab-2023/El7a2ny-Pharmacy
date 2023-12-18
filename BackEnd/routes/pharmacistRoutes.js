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
    uploadMedicineImage,
    getWallet,
    getSalesReport,
    getSalesReportFilterByDate,
    getSalesReportFilterByMedicine,
    getNotifications,
    getPatientChats,
    getPatientChat,
    sendMessageToPatient,
    getDoctors,
    getDoctor,
    getDoctorChat,
    sendMessageToDoctor
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

router.patch('/update-medicine/:id', updateMedicine); //req 18, 19

router.patch('/upload-medicine-image/:id', upload.single('file'), uploadMedicineImage); //req 17

router.get('/my-wallet', getWallet); //req 38

router.get('/sales-report', getSalesReport); //req 20, 21

router.get('/sales-report-filter-by-date/:startDate/:endDate', getSalesReportFilterByDate); //req 20, 21

router.get('/sales-report-filter-by-medicine/:name', getSalesReportFilterByMedicine); //req 20, 21

router.get('/notifications', getNotifications); //req 40

router.get('/my-patient-chats', getPatientChats); //req 39

router.get('/patient-chat/:id', getPatientChat); //req 39, id is id of the chat

router.patch('/send-message-to-patient/:id', sendMessageToPatient); //req 39, id is id of the chat, send message in req body

router.get('/all-doctors', getDoctors); //req 37

router.get('/one-doctor/:id', getDoctor); //req 37, id is id of the doctor

router.post('/doctor-chat/:id', getDoctorChat); //req 37, id is id of the doctor, response is the full chat

router.patch('/send-message-to-doctor/:id', sendMessageToDoctor); //req 37, id is id of the chat, send message in req body

module.exports = router;
