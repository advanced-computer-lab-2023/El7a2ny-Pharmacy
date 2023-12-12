const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
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
    address: {
        type: String,
        required: true
    },
    payment_method: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }

    // createdAt
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;