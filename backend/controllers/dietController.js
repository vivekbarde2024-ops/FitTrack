const {
    calculateNutrition
} = require("../services/nutritionCalculator");

// Calculate user's nutritional requirements
const generateDietRequirements = (req, res) => {
    try {
        const {
            weight,
            height,
            age,
            gender,
            activityLevel,
            goal
        } = req.body;

        // Validate required fields
        if (
            weight === undefined ||
            height === undefined ||
            age === undefined ||
            !gender ||
            !activityLevel ||
            !goal
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required details."
            });
        }

        // Calculate nutrition
        const nutrition = calculateNutrition({
            weight: Number(weight),
            height: Number(height),
            age: Number(age),
            gender: gender.toLowerCase(),
            activityLevel,
            goal
        });

        return res.status(200).json({
            success: true,
            message: "Nutrition requirements calculated successfully.",
            data: nutrition
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    generateDietRequirements
};