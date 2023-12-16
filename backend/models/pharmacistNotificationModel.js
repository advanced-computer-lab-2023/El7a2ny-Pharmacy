const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pharmacistNotificationSchema = new Schema({
    content: {
        type: String,
        required: true
    }
    // createdAt
}, {timestamps: true});

const PharmacistNotification = mongoose.model('PharmacistNotification', pharmacistNotificationSchema);
module.exports = PharmacistNotification;