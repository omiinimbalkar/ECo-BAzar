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
// const mongoose = require('mongoose');

// const notificationSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   message: { type: String, required: true },
//   productId: { type: String },
//   actionType: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }  // ✅ Correct timestamp field
// });

// module.exports = mongoose.model('Notification', notificationSchema);
