import { useState } from "react";

function Analytics() {
  const [period, setPeriod] = useState("7 Days");

  const weightHistory = (() => {
    try {
      return JSON.parse(localStorage.getItem("fittrackWeightHistory")) || [];
    } catch {
      return [];
    }
  })();

  const currentWeight = weightHistory.length
    ? Number(weightHistory[weightHistory.length - 1].weight)
    : 60;

  const startingWeight = weightHistory.length
    ? Number(weightHistory[0].weight)
    : currentWeight;

  const weightChange = (currentWeight - startingWeight).toFixed(1);

  const weeklyData = [
    { day: "Mon", calories: 1850, protein: 95 },
    { day: "Tue", calories: 2100, protein: 110 },
    { day: "Wed", calories: 1950, protein: 105 },
    { day: "Thu", calories: 2300, protein: 120 },
    { day: "Fri", calories: 2050, protein: 115 },
    { day: "Sat", calories: 2400, protein: 130 },
    { day: "Sun", calories: 1900, protein: 100 }
  ];

  const totalCalories = weeklyData.reduce(
    (sum, item) => sum + item.calories,
    0
  );

  const averageCalories = Math.round(totalCalories / weeklyData.length);

  const averageProtein = Math.round(
    weeklyData.reduce((sum, item) => sum + item.protein, 0) /
      weeklyData.length
  );

  const maxCalories = Math.max(...weeklyData.map(item => item.calories));

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div>
          <h1>Analytics</h1>
          <p>Understand your fitness journey through your activity data.</p>
        </div>

        <select value={period} onChange={e => setPeriod(e.target.value)}>
          <option>7 Days</option>
          <option>30 Days</option>
          <option>90 Days</option>
        </select>
      </div>

      <div className="analytics-stats">
        <div className="analytics-card">
          <span>Weekly Calories</span>
          <h2>{totalCalories.toLocaleString()}</h2>
          <small>Total calories in sample data</small>
        </div>

        <div className="analytics-card">
          <span>Average Calories</span>
          <h2>{averageCalories.toLocaleString()}</h2>
          <small>Calories per day</small>
        </div>

        <div className="analytics-card">
          <span>Average Protein</span>
          <h2>{averageProtein}g</h2>
          <small>Protein per day</small>
        </div>

        <div className="analytics-card">
          <span>Current Weight</span>
          <h2>{currentWeight} kg</h2>
          <small>
            {Number(weightChange) > 0 ? "+" : ""}
            {weightChange} kg since first recorded entry
          </small>
        </div>
      </div>

      <div className="analytics-content">
        <section className="analytics-panel">
          <h2>Weekly Calorie Overview</h2>
          <p>Illustrative daily calorie data</p>

          <div className="analytics-chart">
            {weeklyData.map(item => (
              <div className="analytics-bar-item" key={item.day}>
                <strong>{item.calories}</strong>

                <div className="analytics-bar-track">
                  <div
                    className="analytics-bar"
                    style={{
                      height: `${(item.calories / maxCalories) * 100}%`
                    }}
                  />
                </div>

                <small>{item.day}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="analytics-panel">
          <h2>Nutrition Summary</h2>
          <p>Average daily protein intake</p>

          <div className="analytics-nutrition">
            <div>
              <span>Protein</span>
              <strong>{averageProtein}g</strong>
            </div>

            <div>
              <span>Carbohydrates</span>
              <strong>250g</strong>
            </div>

            <div>
              <span>Fats</span>
              <strong>65g</strong>
            </div>
          </div>
        </section>
      </div>

      <section className="analytics-panel analytics-insights">
        <h2>Fitness Insights</h2>

        <div className="analytics-insight">
          <span>⚡</span>
          <div>
            <strong>Consistency matters</strong>
            <p>Maintain a regular workout and nutrition routine.</p>
          </div>
        </div>

        <div className="analytics-insight">
          <span>🥗</span>
          <div>
            <strong>Monitor your nutrition</strong>
            <p>Track protein, carbohydrates and fats to understand your intake.</p>
          </div>
        </div>

        <div className="analytics-insight">
          <span>📈</span>
          <div>
            <strong>Track your body progress</strong>
            <p>
              {weightHistory.length
                ? `You have recorded your weight ${weightHistory.length} time(s).`
                : "Add weight entries in Body Progress to start tracking changes."}
            </p>
          </div>
        </div>
      </section>

      <p className="analytics-disclaimer">
        Note: Calorie and nutrition charts currently use illustrative demo data.
        Weight information comes from your Body Progress records.
      </p>
    </div>
  );
}

export default Analytics;