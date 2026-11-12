const express = require("express");

const {
    generateDietRequirements
} = require("../controllers/dietController");

const router = express.Router();

// Calculate daily nutritional requirements
router.post("/calculate", generateDietRequirements);

module.exports = router;