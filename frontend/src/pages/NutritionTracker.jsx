import { useEffect, useMemo, useState } from "react";
import { Search, Plus, Trash2, Utensils, Flame, Beef, Wheat, Droplets } from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_URL}/api/foods`;

function NutritionTracker() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(100);
  const [meal, setMeal] = useState("Breakfast");
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error("Unable to load foods.");
        return res.json();
      })
      .then(result => setFoods(result.data || []))
      .catch(() => setError("Could not connect to the food database."));
  }, []);

  const categories = ["All", ...new Set(foods.map(food => food.category))];

  const filteredFoods = useMemo(() => {
    return foods.filter(food => {
      const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || food.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [foods, search, category]);

  const totals = entries.reduce((sum, item) => ({
    calories: sum.calories + item.nutrition.calories,
    protein: sum.protein + item.nutrition.protein,
    carbs: sum.carbs + item.nutrition.carbs,
    fats: sum.fats + item.nutrition.fats
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

  const addFood = async () => {
    if (!selectedFood || !quantity || Number(quantity) <= 0) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          foodId: selectedFood.id,
          quantity: Number(quantity)
        })
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Nutrition calculation failed.");
      }

      setEntries(previous => [
        ...previous,
        {
          id: Date.now() + Math.random(),
          meal,
          nutrition: result.data
        }
      ]);

      setSelectedFood(null);
      setQuantity(100);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFood = id => {
    setEntries(previous => previous.filter(item => item.id !== id));
  };

  return (
    <div className="nutrition-tracker">
      <div className="tracker-heading">
        <div>
          <span className="tracker-eyebrow">DAILY NUTRITION</span>
          <h1>Nutrition Tracker</h1>
          <p>Track your meals and monitor your daily nutrition.</p>
        </div>
        <div className="tracker-date">{new Date().toLocaleDateString("en-IN", {
          day: "numeric", month: "long", year: "numeric"
        })}</div>
      </div>

      <div className="nutrition-summary">
        <SummaryCard icon={<Flame />} label="Calories" value={totals.calories.toFixed(0)} unit="kcal" />
        <SummaryCard icon={<Beef />} label="Protein" value={totals.protein.toFixed(1)} unit="g" />
        <SummaryCard icon={<Wheat />} label="Carbs" value={totals.carbs.toFixed(1)} unit="g" />
        <SummaryCard icon={<Droplets />} label="Fats" value={totals.fats.toFixed(1)} unit="g" />
      </div>

      <div className="tracker-layout">
        <section className="tracker-panel food-browser">
          <div className="panel-heading">
            <div>
              <h2>Food Database</h2>
              <p>Search and add food to your meals.</p>
            </div>
            <Utensils size={21} />
          </div>

          <div className="food-search">
            <Search size={18} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search rice, paneer, eggs..."
            />
          </div>

          <div className="food-categories">
            {categories.map(item => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {error && <p className="tracker-error">{error}</p>}

          <div className="food-list">
            {filteredFoods.map(food => (
              <button
                className={`food-item ${selectedFood?.id === food.id ? "selected" : ""}`}
                key={food.id}
                onClick={() => {
                  setSelectedFood(food);
                  setQuantity(food.serving);
                }}
              >
                <div>
                  <strong>{food.name}</strong>
                  <span>{food.category} · Per {food.serving} {food.unit}</span>
                </div>
                <div className="food-calories">
                  <strong>{food.calories}</strong>
                  <span>kcal</span>
                </div>
              </button>
            ))}

            {filteredFoods.length === 0 && (
              <p className="empty-foods">No matching foods found.</p>
            )}
          </div>
        </section>

        <section className="tracker-panel meal-panel">
          <div className="panel-heading">
            <div>
              <h2>Add to Meal</h2>
              <p>Select a meal and quantity.</p>
            </div>
            <Plus size={21} />
          </div>

          <label className="tracker-label">Meal</label>
          <select value={meal} onChange={e => setMeal(e.target.value)}>
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snacks</option>
          </select>

          <label className="tracker-label">Selected Food</label>
          <div className="selected-food">
            {selectedFood ? selectedFood.name : "Choose a food from the database"}
          </div>

          <label className="tracker-label">
            Quantity {selectedFood ? `(${selectedFood.unit})` : ""}
          </label>
          <input
            type="number"
            min="0.1"
            max="10000"
            step="any"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          />

          <button
            className="add-food-button"
            disabled={!selectedFood || loading || !quantity || Number(quantity) <= 0}
            onClick={addFood}
          >
            <Plus size={18} />
            {loading ? "Calculating..." : "Add Food"}
          </button>
        </section>
      </div>

      <section className="tracker-panel logged-meals">
        <div className="panel-heading">
          <div>
            <h2>Today's Meals</h2>
            <p>{entries.length} food items logged in this session.</p>
          </div>
        </div>

        {["Breakfast", "Lunch", "Dinner", "Snacks"].map(mealName => {
          const mealItems = entries.filter(item => item.meal === mealName);

          return (
            <div className="meal-group" key={mealName}>
              <h3>{mealName}</h3>
              {mealItems.length === 0 ? (
                <p className="empty-meal">No food added yet.</p>
              ) : mealItems.map(item => (
                <div className="logged-food" key={item.id}>
                  <div>
                    <strong>{item.nutrition.food}</strong>
                    <span>{item.nutrition.quantity} {item.nutrition.unit}</span>
                  </div>
                  <div className="logged-food-calories">
                    {item.nutrition.calories} kcal
                    <button onClick={() => removeFood(item.id)} aria-label="Remove food">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </section>
    </div>
  );
}

function SummaryCard({ icon, label, value, unit }) {
  return (
    <div className="nutrition-summary-card">
      <div className="summary-icon">{icon}</div>
      <span>{label}</span>
      <strong>{value} <small>{unit}</small></strong>
    </div>
  );
}

export default NutritionTracker;