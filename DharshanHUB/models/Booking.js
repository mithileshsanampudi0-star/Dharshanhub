const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    bookingReference: { 
        type: String, 
        required: true, 
        unique: true 
    },
    items: [{
        name: String,
        details: String,
        price: Number,
        type: { type: String } // 'seva', 'darshan', or 'accommodation'
    }],
    donationAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    status: { 
        type: String, 
        default: 'Confirmed',
        enum: ['Pending', 'Confirmed', 'Cancelled']
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);