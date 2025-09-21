const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Booking = require("../models/Booking");
const Event = require("../models/Event");
const auth = require("../middleware/auth");

// User: create booking
router.post(
  "/",
  auth(["user"]),
  [
    body("eventId").notEmpty().withMessage("Event ID is required"),
    body("quantity").isInt({ gt: 0 }).withMessage("Quantity must be at least 1"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { eventId, quantity } = req.body;
      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ msg: "Event not found" });

      const booking = new Booking({
        user: req.user._id,
        event: eventId,
        quantity,
      });
      await booking.save();
      res.json(booking);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.get("/my", auth(["user"]), async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate("event");
  res.json(bookings);
});

// Admin: view all bookings
router.get("/", auth(["admin"]), async (req, res) => {
  const bookings = await Booking.find().populate("user event");
  res.json(bookings);
});

// Admin: update booking status
router.put("/:id", auth(["admin"]), async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
