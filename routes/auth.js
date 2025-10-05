const express = require("express");
const router = express.Router();
const { signup, signin, me } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

// POST /api/auth/signup
router.post("/signup", signup);

// POST /api/auth/signin
router.post("/signin", signin);

// POST /api/auth/signout
router.post("/signout", (req, res) => {
  const { signout } = require("../controllers/authController");
  return signout(req, res);
});

// GET /api/auth/me - requires auth
router.get("/me", authMiddleware, me);

module.exports = router;
