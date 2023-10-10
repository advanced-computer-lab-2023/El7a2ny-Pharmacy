const express = require('express');
const {
    addAdmin,
    getAdmins,
    removeAdmin
} = require('../controllers/administratorController');

const router = express.Router();

router.post('/add-admin', addAdmin); //req 7

router.get('/all-admins', getAdmins); //req 8

router.delete('/remove-admin/:id', removeAdmin); //req 8

module.exports = router;