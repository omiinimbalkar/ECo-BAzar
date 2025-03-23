const Feedback = require("../models/FeedbackModel");

// Save feedback to database
exports.submitFeedback = async (req, res) => {
  try {
    const { userName, email, message } = req.body;

    if (!userName || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const feedback = new Feedback({ userName, email, message });
    await feedback.save();

    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all feedbacks
exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
