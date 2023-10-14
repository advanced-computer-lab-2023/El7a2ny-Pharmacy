const express = require('express');
const {
    register,
    getPatients,
    removePatient,
    getPatient
} = require('../controllers/patientController');

const router = express.Router();

router.post('/register', register); //req 1

router.get('/all-patients', getPatients); //req 23

router.get('/one-patient/:id', getPatient); //req 23

router.delete('/remove-patient/:id', removePatient); //req 6

module.exports = router;