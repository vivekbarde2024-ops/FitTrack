// FitTrack AI - Nutrition Calculation Engine

// 1. Calculate BMI
const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;

    return Number(
        (weight / (heightInMeters * heightInMeters)).toFixed(2)
    );
};

// 2. Calculate BMR using Mifflin-St Jeor Equation
const calculateBMR = (weight, height, age, gender) => {
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);

    if (gender === "male") {
        bmr += 5;
    } else if (gender === "female") {
        bmr -= 161;
    } else {
        throw new Error("Gender must be male or female for this equation.");
    }

    return Math.round(bmr);
};

// 3. Calculate TDEE
const calculateTDEE = (bmr, activityLevel) => {
    const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        very_active: 1.9
    };

    const multiplier = activityMultipliers[activityLevel];

    if (!multiplier) {
        throw new Error("Invalid activity level.");
    }

    return Math.round(bmr * multiplier);
};

// 4. Calculate calorie target
const calculateCalories = (tdee, goal) => {
    const adjustments = {
        lose_weight: -400,
        maintain_weight: 0,
        gain_weight: 300,
        lean_muscle_gain: 200
    };

    if (adjustments[goal] === undefined) {
        throw new Error("Invalid fitness goal.");
    }

    return tdee + adjustments[goal];
};

// 5. Calculate Macronutrients
const calculateMacros = (calories, weight, goal) => {
    const proteinPerKg = {
        lose_weight: 1.8,
        maintain_weight: 1.6,
        gain_weight: 1.8,
        lean_muscle_gain: 2.0
    };

    const protein = Math.round(weight * proteinPerKg[goal]);

    const fat = Math.round((calories * 0.25) / 9);

    const remainingCalories =
        calories - (protein * 4) - (fat * 9);

    const carbs = Math.max(
        0,
        Math.round(remainingCalories / 4)
    );

    return {
        protein,
        carbs,
        fats: fat
    };
};

// 6. Complete nutrition calculation
const calculateNutrition = ({
    weight,
    height,
    age,
    gender,
    activityLevel,
    goal
}) => {
    if (
        !Number.isFinite(weight) || weight <= 0 ||
        !Number.isFinite(height) || height <= 0 ||
        !Number.isInteger(age) || age < 18 || age > 100
    ) {
        throw new Error("Invalid body measurements or age.");
    }

    const bmi = calculateBMI(weight, height);

    const bmr = calculateBMR(
        weight,
        height,
        age,
        gender
    );

    const tdee = calculateTDEE(bmr, activityLevel);

    const calories = calculateCalories(tdee, goal);

    const macros = calculateMacros(
        calories,
        weight,
        goal
    );

    return {
        bmi,
        bmr,
        tdee,
        dailyCalories: calories,
        macros
    };
};

module.exports = {
    calculateBMI,
    calculateBMR,
    calculateTDEE,
    calculateCalories,
    calculateMacros,
    calculateNutrition
};