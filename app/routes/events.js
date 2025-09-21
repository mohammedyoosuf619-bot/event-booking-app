const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Event = require("../models/Event");
const auth = require("../middleware/auth");

// Public: view all events
router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// Admin: create event
router.post(
  "/",
  auth(["admin"]),
  [
    body("name").notEmpty().withMessage("Event name is required"),
    body("date").isISO8601().withMessage("Valid date required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price must be positive"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const event = new Event(req.body);
      await event.save();
      res.json(event);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Admin: update event
router.put(
  "/:id",
  auth(["admin"]),
  [
    body("name").optional().notEmpty(),
    body("date").optional().isISO8601(),
    body("price").optional().isFloat({ gt: 0 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(event);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.delete("/:id", auth(["admin"]), async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ msg: "Event deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
