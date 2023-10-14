require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const patientRoutes = require('./routes/patientRoutes.js');
const pharmacistRoutes = require('./routes/pharmacistRoutes.js');
const administratorRoutes = require('./routes/administratorRoutes.js');
const medicineRoutes = require('./routes/medicineRoutes.js');
//const healthPackageRoutes = require('./routes/healthPackageRoutes');
//const familyMemberRoutes = require('./routes/familyMemberRoutes');

const app = express();




app.use(cors()); // Enable CORS for all routes

app.use(express.json());

app.use('/api/patients', patientRoutes);
app.use('/api/pharmacist', pharmacistRoutes);
app.use('/api/administrators', administratorRoutes);
app.use('/api/medicine', medicineRoutes);
//app.use('/api/packages', healthPackageRoutes);
//app.use('/api/family-members', familyMemberRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening to port'+ process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });