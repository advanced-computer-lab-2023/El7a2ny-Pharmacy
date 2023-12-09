const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
    patient_id: {
        type: mongoose.Schema.ObjectId, ref: 'Patient',
        required: true
    },
    doctor_id: {
        type: mongoose.Schema.ObjectId, ref: 'Doctor',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    isFilled: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports = Prescription;