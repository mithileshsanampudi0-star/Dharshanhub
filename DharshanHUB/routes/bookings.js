const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');

// Create a new booking
router.post('/', auth, async (req, res) => {
    try {
        const { items, donationAmount, totalAmount } = req.body;
        const bookingReference = 'BKG-' + Math.floor(100000 + Math.random() * 900000);

        const newBooking = new Booking({
            user: req.user.id,
            bookingReference,
            items,
            donationAmount,
            totalAmount
        });

        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (err) {
        res.status(500).json({ error: 'Server Error: Could not process booking' });
    }
});

// Get bookings for user
router.get('/', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: 'Server Error: Could not fetch bookings' });
    }
});

module.exports = router;