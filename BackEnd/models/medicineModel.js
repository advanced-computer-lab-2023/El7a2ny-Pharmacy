const mongoose = require('mongoose');
const { float } = require('webidl-conversions');
const Schema = mongoose.Schema;

const medicineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
     pictureUrl: {
         type: String
    },
    price: {
        type: Number,
        required: true
    },
    availableQuantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sales: {
        type: Number,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    medicinal_use: {
        type: String,
        required: true
    },
    isArchived: {
        type: Boolean,
        default: false,
        required: true
    },
    isOverTheCounter: {
        type: Boolean,
        default: false,
        required: true
    }
}, {timestamps: true});

const Medicine = mongoose.model('Medicine', medicineSchema);
module.exports = Medicine;