const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
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
    }
}, {timestamps: true});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;