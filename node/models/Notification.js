const mongoose = require('mongoose');


const NotificationSchema = new mongoose.Schema({
    userId: String,
    message: String,
    productId: String,
    likedProduct: String,
    dislikedProduct: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', NotificationSchema);
