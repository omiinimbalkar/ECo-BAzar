const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    userId: String,
    message: String,
    productId: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', NotificationSchema);
