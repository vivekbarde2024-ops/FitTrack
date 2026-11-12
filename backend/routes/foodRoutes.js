const express = require("express");

const {
    getFoods,
    calculateFoodNutrition
} = require("../controllers/foodController");

const router = express.Router();

router.get("/", getFoods);
router.post("/calculate", calculateFoodNutrition);

module.exports = router;