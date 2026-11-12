import { useState, useEffect } from "react";

function BodyProgress() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("178");
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("fittrackWeightHistory")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("fittrackWeightHistory", JSON.stringify(history));
  }, [history]);

  const currentWeight = history.length
    ? Number(history[history.length - 1].weight)
    : 60;

  const bmi =
    height > 0 ? (currentWeight / ((Number(height) / 100) ** 2)).toFixed(1) : "--";

  const startingWeight = history.length
    ? Number(history[0].weight)
    : currentWeight;

  const weightChange = (currentWeight - startingWeight).toFixed(1);

  const addWeight = (e) => {
    e.preventDefault();

    const value = Number(weight);

    if (!value || value < 20 || value > 400) {
      alert("Please enter a valid weight.");
      return;
    }

    setHistory([
      ...history,
      {
        id: Date.now(),
        weight: value,
        date: new Date().toLocaleDateString()
      }
    ]);

    setWeight("");
  };

  const deleteEntry = (id) => {
    setHistory(history.filter((item) => item.id !== id));
  };

  const chartData = history.slice(-7);
  const minWeight = Math.min(...chartData.map((item) => Number(item.weight)), currentWeight);
  const maxWeight = Math.max(...chartData.map((item) => Number(item.weight)), currentWeight);
  const range = maxWeight - minWeight || 1;

  return (
    <div className="body-progress">
      <div className="body-progress-header">
        <div>
          <h1>Body Progress</h1>
          <p>Track your body measurements and monitor your progress.</p>
        </div>
      </div>

      <div className="body-stats-grid">
        <div className="body-stat-card">
          <span>Current Weight</span>
          <h2>{currentWeight} <small>kg</small></h2>
        </div>

        <div className="body-stat-card">
          <span>BMI</span>
          <h2>{bmi}</h2>
        </div>

        <div className="body-stat-card">
          <span>Starting Weight</span>
          <h2>{startingWeight} <small>kg</small></h2>
        </div>

        <div className="body-stat-card">
          <span>Weight Change</span>
          <h2 className={Number(weightChange) > 0 ? "weight-up" : "weight-down"}>
            {Number(weightChange) > 0 ? "+" : ""}
            {weightChange} <small>kg</small>
          </h2>
        </div>
      </div>

      <div className="body-progress-grid">
        <section className="body-panel">
          <h2>Update Your Weight</h2>
          <p>Record your latest body measurements.</p>

          <form onSubmit={addWeight}>
            <label>Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              min="20"
              max="400"
              placeholder="Enter your weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />

            <label>Height (cm)</label>
            <input
              type="number"
              min="50"
              max="250"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />

            <button type="submit">+ Save Progress</button>
          </form>
        </section>

        <section className="body-panel">
          <h2>Weight Progress</h2>
          <p>Your last 7 recorded entries.</p>

          {chartData.length === 0 ? (
            <div className="body-empty">
              Add your first weight entry to see your chart.
            </div>
          ) : (
            <div className="weight-chart">
              {chartData.map((item) => {
                const percentage =
                  35 + ((Number(item.weight) - minWeight) / range) * 65;

                return (
                  <div className="weight-chart-item" key={item.id}>
                    <strong>{item.weight} kg</strong>
                    <div className="weight-chart-track">
                      <div
                        className="weight-chart-bar"
                        style={{ height: `${percentage}%` }}
                      />
                    </div>
                    <small>{item.date}</small>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <section className="body-panel body-history">
        <h2>Weight History</h2>

        {history.length === 0 ? (
          <p className="body-empty">No records yet. Add your first weight entry.</p>
        ) : (
          <div className="body-history-list">
            {[...history].reverse().map((item) => (
              <div className="body-history-row" key={item.id}>
                <div>
                  <strong>{item.weight} kg</strong>
                  <small>{item.date}</small>
                </div>

                <button onClick={() => deleteEntry(item.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default BodyProgress;