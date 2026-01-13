import express from "express";
import { sendEmailAPI } from "../utils/emailService.js";

const router = express.Router();

router.post("/send-email", async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ error: "Missing required fields: to, subject, message" });
  }

  try {
    const response = await sendEmailAPI({ to, subject, message });
    res.json(response);
  } catch (error) {
    console.error("Email route error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;