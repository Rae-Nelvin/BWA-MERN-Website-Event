const express = require("express");
const router = express();
const { create } = require("./controller");

router.post("/organizers", create);

module.exports = router;
