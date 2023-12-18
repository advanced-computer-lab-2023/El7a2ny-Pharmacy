const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pharmacistDoctorChatSchema = new Schema({
    pharmacist_id: {
        type: mongoose.Schema.ObjectId, ref: 'Pharmacist',
        required: true
    },
    doctor_id: {
        type: mongoose.Schema.ObjectId, ref: 'Doctor',
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

const PharmacistDoctorChat = mongoose.model('PharmacistDoctorChat', pharmacistDoctorChatSchema);
module.exports = PharmacistDoctorChat;