const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientPharmacistChatSchema = new Schema({
    patient_id: {
        type: mongoose.Schema.ObjectId, ref: 'Patient',
        required: true
    },
    medicine_list: {
        type: [
        {
          medicine: { type: mongoose.Schema.ObjectId, ref: 'Medicine', required: true },
          quantity: { type: Number, required: true },
        },
      ],
      default: [],
      required: true
    },
    total: {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps: true});

const PatientPharmacistChat = mongoose.model('PatientPharmacistChat', patientPharmacistChatSchema);
module.exports = PatientPharmacistChat;