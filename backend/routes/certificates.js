const express = require("express");
const db = require("../db");
const jwt = require("jsonwebtoken");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// Middleware for token verification
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// Create certificate
router.post("/", authMiddleware, async (req, res) => {
  const { recipient_name, course_name, issue_date } = req.body;
  const user_id = req.user.id;
  if (!recipient_name || !course_name || !issue_date)
    return res.status(400).json({ message: "Missing fields" });

  try {
    // Generate a unique certificate code
    const certificate_code = `CER-${Date.now()}-${Math.floor(
      Math.random() * 1000
    )}`;

    await db.query(
      "INSERT INTO certificates (user_id, recipient_name, course_name, issue_date, certificate_code) VALUES (?, ?, ?, ?, ?)",
      [user_id, recipient_name, course_name, issue_date, certificate_code]
    );

    res.status(201).json({ message: "Certificate created", certificate_code });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// List certificates for logged user
router.get("/", authMiddleware, async (req, res) => {
  const user_id = req.user.id;
  try {
    const [certificates] = await db.query(
      "SELECT * FROM certificates WHERE user_id = ?",
      [user_id]
    );
    res.json({ certificates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
