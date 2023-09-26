const express = require("express");
const router = express();
const {
  signup,
  activeParticipant,
  signin,
  getAllLandingPage,
  getDashboard,
  getDetailLandingPage,
  checkout,
} = require("./controller");

const { authenticateParticipant } = require("../../../middlewares/auth");

router.post("/auth/signup", signup);
router.put("/active", activeParticipant);
router.post("/auth/signin", signin);
router.get("/events", getAllLandingPage);
router.get("/events/:id", getDetailLandingPage);
router.get("/orders", authenticateParticipant, getDashboard);
router.post("/checkout", authenticateParticipant, checkout);

module.exports = router;
