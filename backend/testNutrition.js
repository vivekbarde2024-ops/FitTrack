const {
    calculateNutrition
} = require("./services/nutritionCalculator");

const result = calculateNutrition({
    weight: 60,
    height: 178,
    age: 23,
    gender: "male",
    activityLevel: "active",
    goal: "lean_muscle_gain"
});

console.log("FitTrack AI Nutrition Results:");
console.log(result);