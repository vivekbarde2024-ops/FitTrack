const mongoose = require("mongoose");

const mealItemSchema = new mongoose.Schema({
  foodId: {
    type: String,
    required: true
  },
  foodName: {
    type: String,
    required: true
  },
  mealType: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner", "Snacks"],
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0.1
  },
  unit: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true,
    min: 0
  },
  protein: {
    type: Number,
    required: true,
    min: 0
  },
  carbs: {
    type: Number,
    required: true,
    min: 0
  },
  fats: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Meal", mealItemSchema);