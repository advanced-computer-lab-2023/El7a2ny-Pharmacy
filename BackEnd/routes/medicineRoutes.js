const express = require('express');
const {
    addMedicine,
    getMedicines,
    removeMedicine,
    updateMedicine,

} = require('../controllers/medicineController');

const router = express.Router();

router.post('/add-medicine', addMedicine); //req 3

router.get('/all-medicines', getMedicines); //req 8,9

router.delete('/remove-medicine/:id', removeMedicine); //req 8

router.patch('/update-medicine/:id', updateMedicine); //req 14

module.exports = router;

