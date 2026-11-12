const indianFoods = require("../data/indianFoods");

// Get all foods or search by name
const getFoods = (req, res) => {
    try {
        const { search, category } = req.query;

        let foods = [...indianFoods];

        if (search) {
            foods = foods.filter(food =>
                food.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category) {
            foods = foods.filter(food =>
                food.category.toLowerCase() === category.toLowerCase()
            );
        }

        res.status(200).json({
            success: true,
            count: foods.length,
            data: foods
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Calculate nutrition based on quantity
const calculateFoodNutrition = (req, res) => {
    try {
        const { foodId, quantity } = req.body;

        const food = indianFoods.find(item => item.id === foodId);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found."
            });
        }

        const amount = Number(quantity);

        if (!Number.isFinite(amount) || amount <= 0 || amount > 10000) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid quantity."
            });
        }

        const multiplier = amount / food.serving;

        const nutrition = {
            food: food.name,
            quantity: amount,
            unit: food.unit,
            calories: Number((food.calories * multiplier).toFixed(2)),
            protein: Number((food.protein * multiplier).toFixed(2)),
            carbs: Number((food.carbs * multiplier).toFixed(2)),
            fats: Number((food.fats * multiplier).toFixed(2))
        };

        return res.status(200).json({
            success: true,
            message: "Food nutrition calculated successfully.",
            data: nutrition
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getFoods,
    calculateFoodNutrition
};