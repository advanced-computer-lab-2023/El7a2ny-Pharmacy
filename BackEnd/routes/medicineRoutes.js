const express = require('express');
const {
    addMedicine,
    getMedicines,
    updateMedicine,
    getMedicineSearchByName,
    getMedicineFilterByUsage
} = require('../controllers/medicineController');

const router = express.Router();

router.post('/add-medicine', addMedicine); //req 16

router.get('/all-medicines', getMedicines); //req 12, 13

router.get('/search-by-name/:name', getMedicineSearchByName); //req 14

router.get('/filter-by-medicinal-use/:usage', getMedicineFilterByUsage); //req 15

router.patch('/update-medicine/:id', updateMedicine); //req 18

module.exports = router;

