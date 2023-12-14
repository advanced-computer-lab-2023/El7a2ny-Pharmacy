require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const patientRoutes = require('./routes/patientRoutes.js');
const pharmacistRoutes = require('./routes/pharmacistRoutes.js');
const administratorRoutes = require('./routes/administratorRoutes.js');


const app = express();


app.use(cors()); // Enable CORS for all routes

app.use(express.json());

app.use('/api/patients', patientRoutes);
app.use('/api/pharmacists', pharmacistRoutes);
app.use('/api/administrators', administratorRoutes);

mongoose.connect(process.env.MONGO_URI_2)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening to port '+ process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });