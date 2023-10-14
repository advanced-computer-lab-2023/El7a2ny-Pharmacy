const express = require('express');
const {
    addAdmin,
    getAdmins,
    removeAdmin
} = require('../controllers/administratorController');

const router = express.Router();

router.post('/add-admin', addAdmin); //req 5

//router.get('/all-admins', getAdmins); 

//router.delete('/remove-admin/:id', removeAdmin); 

module.exports = router;