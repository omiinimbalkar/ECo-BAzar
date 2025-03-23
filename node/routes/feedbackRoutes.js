const express = require("express");
const router = express.Router();
const { submitFeedback, getFeedbacks } = require("../controllers/feedbackController");

router.post("/feedback", submitFeedback); // Submit feedback
router.get("/feedback", getFeedbacks); // Get all feedback

module.exports = router;
