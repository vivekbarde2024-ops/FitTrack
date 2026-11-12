import { useState } from "react";
import {
  Flame,
  Scale,
  Activity,
  Beef,
  Wheat,
  Droplets,
  Calculator,
  LoaderCircle,
  RefreshCw
} from "lucide-react";

function DietPlanner() {
  const [form, setForm] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "male",
    activityLevel: "moderate",
    goal: "lean_muscle_gain"
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/diet/calculate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...form,
            weight: Number(form.weight),
            height: Number(form.height),
            age: Number(form.age)
          })
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Calculation failed.");
      }

      setResult(data.data);

    } catch (err) {
      setError(
        err.message || "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResult(null);
    setError("");

    setForm({
      weight: "",
      height: "",
      age: "",
      gender: "male",
      activityLevel: "moderate",
      goal: "lean_muscle_gain"
    });
  };

  return (
    <div className="diet-planner">

      {/* Header */}
      <div className="diet-header">
        <div>
          <span className="diet-label">SMART NUTRITION ENGINE</span>
          <h2>Diet Planner</h2>
          <p>
            Calculate your daily calorie and macronutrient requirements.
          </p>
        </div>

        <div className="diet-header-icon">
          <Flame size={30} />
        </div>
      </div>

      {/* Main Layout */}
      <div className="diet-layout">

        {/* Input Form */}
        <section className="diet-form-panel">

          <div className="diet-panel-heading">
            <Calculator size={20} />
            <h3>Your Fitness Details</h3>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="diet-form-grid">

              <div className="diet-field">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  placeholder="e.g. 60"
                  value={form.weight}
                  onChange={handleChange}
                  min="20"
                  max="300"
                  step="0.1"
                  required
                />
              </div>

              <div className="diet-field">
                <label>Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  placeholder="e.g. 178"
                  value={form.height}
                  onChange={handleChange}
                  min="100"
                  max="250"
                  required
                />
              </div>

              <div className="diet-field">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Enter age"
                  value={form.age}
                  onChange={handleChange}
                  min="18"
                  max="100"
                  required
                />
              </div>

              <div className="diet-field">
                <label>Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="diet-field">
                <label>Activity Level</label>
                <select
                  name="activityLevel"
                  value={form.activityLevel}
                  onChange={handleChange}
                >
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Lightly Active</option>
                  <option value="moderate">Moderately Active</option>
                  <option value="active">Active</option>
                  <option value="very_active">Very Active</option>
                </select>
              </div>

              <div className="diet-field">
                <label>Fitness Goal</label>
                <select
                  name="goal"
                  value={form.goal}
                  onChange={handleChange}
                >
                  <option value="lose_weight">Lose Weight</option>
                  <option value="maintain_weight">Maintain Weight</option>
                  <option value="gain_weight">Gain Weight</option>
                  <option value="lean_muscle_gain">Lean Muscle Gain</option>
                </select>
              </div>

            </div>

            {error && (
              <div className="diet-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="diet-calculate-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoaderCircle className="spin" size={19} />
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator size={19} />
                  Calculate Nutrition
                </>
              )}
            </button>

          </form>
        </section>

        {/* Results */}
        <section className="diet-results-panel">

          <div className="diet-panel-heading">
            <Activity size={20} />
            <h3>Nutrition Results</h3>
          </div>

          {!result ? (
            <div className="diet-empty-state">
              <div className="diet-empty-icon">
                <Flame size={35} />
              </div>

              <h3>Your results will appear here</h3>

              <p>
                Enter your fitness details and calculate
                your daily nutritional requirements.
              </p>
            </div>
          ) : (
            <>
              <div className="diet-calorie-card">
                <Flame size={25} />

                <span>DAILY CALORIE TARGET</span>

                <h2>
                  {result.dailyCalories.toLocaleString("en-IN")}
                </h2>

                <small>kcal / day</small>
              </div>

              <div className="diet-stats-grid">

                <div className="diet-stat">
                  <Scale size={20} />
                  <span>BMI</span>
                  <h3>{result.bmi}</h3>
                </div>

                <div className="diet-stat">
                  <Activity size={20} />
                  <span>BMR</span>
                  <h3>{result.bmr}</h3>
                  <small>kcal</small>
                </div>

                <div className="diet-stat">
                  <Flame size={20} />
                  <span>TDEE</span>
                  <h3>{result.tdee}</h3>
                  <small>kcal</small>
                </div>

              </div>

              <h4 className="macro-title">
                Daily Macronutrient Targets
              </h4>

              <div className="diet-macro-list">

                <div className="diet-macro-item">
                  <div className="macro-icon protein-icon">
                    <Beef size={20} />
                  </div>

                  <div>
                    <span>Protein</span>
                    <h3>{result.macros.protein} g</h3>
                  </div>
                </div>

                <div className="diet-macro-item">
                  <div className="macro-icon carbs-icon">
                    <Wheat size={20} />
                  </div>

                  <div>
                    <span>Carbohydrates</span>
                    <h3>{result.macros.carbs} g</h3>
                  </div>
                </div>

                <div className="diet-macro-item">
                  <div className="macro-icon fats-icon">
                    <Droplets size={20} />
                  </div>

                  <div>
                    <span>Fats</span>
                    <h3>{result.macros.fats} g</h3>
                  </div>
                </div>

              </div>

              <button
                className="diet-reset-button"
                onClick={resetForm}
              >
                <RefreshCw size={16} />
                Calculate Again
              </button>
            </>
          )}

        </section>

      </div>

      <p className="diet-disclaimer">
        Estimates are based on the current calculation formulas.
        They are not medical advice or a substitute for professional guidance.
      </p>

    </div>
  );
}

export default DietPlanner;