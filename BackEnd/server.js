require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const patientRoutes = require('./routes/patientRoutes');
const pharmacistRoutes = require('./routes/pharmacistRoutes');
const administratorRoutes = require('./routes/administratorRoutes');
//const healthPackageRoutes = require('./routes/healthPackageRoutes');
//const familyMemberRoutes = require('./routes/familyMemberRoutes');

const app = express();

app.use(express.json());

app.use('/api/patients', patientRoutes);
app.use('/api/doctors', pharmacistRoutes);
app.use('/api/administrators', administratorRoutes);
//app.use('/api/packages', healthPackageRoutes);
//app.use('/api/family-members', familyMemberRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening to port');
        });
    })
    .catch((error) => {
        console.log(error);
    });