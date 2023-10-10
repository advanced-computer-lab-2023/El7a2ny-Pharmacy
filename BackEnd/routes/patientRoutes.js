const express = require('express');
const {
    register,
    getPatients,
    removePatient 
} = require('../controllers/patientController');

const router = express.Router();

router.post('/register', register); //req 1

router.get('/all-patients', getPatients); //req 8

router.delete('/remove-patient/:id', removePatient); //req 8

module.exports = router;