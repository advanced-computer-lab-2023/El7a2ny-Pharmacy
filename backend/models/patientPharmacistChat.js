const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientPharmacistChatSchema = new Schema({
    patient_id: {
        type: mongoose.Schema.ObjectId, ref: 'Patient',
        required: true
    },
    pharmacist_id: {
        type: mongoose.Schema.ObjectId, ref: 'Pharmacist',
        required: true
    },
    messages: {
        type: [
        {
          message: { type: String, required: true },
          sender_name: { type: String, required: true },
          date: { type: Date, required: true }
        },
      ],
      default: [],
      required: true
    }
}, {timestamps: true});

const PatientPharmacistChat = mongoose.model('PatientPharmacistChat', patientPharmacistChatSchema);
module.exports = PatientPharmacistChat;