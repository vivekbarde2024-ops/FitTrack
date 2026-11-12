import {
  Flame,
  Beef,
  Scale,
  Dumbbell,
  Wheat,
  Droplets,
  CalendarDays,
  Bot,
  ArrowUpRight,
  Activity
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import StatCard from "../components/StatCard";

// Sample weight data
const weightData = [
  { day: "Mon", weight: 59.5 },
  { day: "Tue", weight: 59.7 },
  { day: "Wed", weight: 59.6 },
  { day: "Thu", weight: 60 },
  { day: "Fri", weight: 60.1 },
  { day: "Sat", weight: 60.3 },
  { day: "Sun", weight: 60.5 }
];

function Dashboard() {
  return (
    <div className="dashboard">

      {/* Welcome Section */}
      <section className="welcome-section">
        <div>
          <span className="welcome-label">
            YOUR FITNESS JOURNEY
          </span>

          <h2>Welcome back! 👋</h2>

          <p>
            Every workout brings you one step closer
            to your fitness goals.
          </p>
        </div>

        <button className="log-button">
          <Activity size={18} />
          Log Activity
        </button>
      </section>

      {/* Statistics Cards */}
      <section className="stats-grid">

        <StatCard
          title="Daily Calories"
          value="1,850"
          unit="kcal"
          subtitle="Target: 2,500 kcal"
          icon={Flame}
          trend="+8%"
          trendType="up"
        />

        <StatCard
          title="Protein Intake"
          value="85"
          unit="g"
          subtitle="Target: 120 g"
          icon={Beef}
          trend="+12%"
          trendType="up"
        />

        <StatCard
          title="Current Weight"
          value="60"
          unit="kg"
          subtitle="Target: 70 kg"
          icon={Scale}
          trend="+0.5 kg"
          trendType="up"
        />

        <StatCard
          title="Weekly Workouts"
          value="4"
          unit="/ 6"
          subtitle="2 sessions remaining"
          icon={Dumbbell}
          trend="+1"
          trendType="up"
        />

      </section>

      {/* Main Dashboard Grid */}
      <section className="dashboard-main-grid">

        {/* Nutrition Overview */}
        <div className="dashboard-panel">

          <div className="panel-heading">
            <div>
              <h3>Nutrition Overview</h3>
              <p>Your daily nutritional intake</p>
            </div>

            <CalendarDays size={20} />
          </div>

          <div className="nutrition-summary">

            <div className="calorie-ring">
              <div>
                <Flame size={23} />
                <h2>1,850</h2>
                <span>of 2,500 kcal</span>
              </div>
            </div>

            <div className="calorie-description">
              <h4>650 kcal remaining</h4>

              <p>
                Keep tracking your meals to reach
                your daily calorie target.
              </p>
            </div>

          </div>

          <div className="macro-container">

            <div className="macro-row">
              <div className="macro-info">
                <span>
                  <Beef size={16} /> Protein
                </span>
                <b>85 / 120 g</b>
              </div>

              <div className="macro-progress">
                <div className="protein-progress"></div>
              </div>
            </div>

            <div className="macro-row">
              <div className="macro-info">
                <span>
                  <Wheat size={16} /> Carbs
                </span>
                <b>210 / 300 g</b>
              </div>

              <div className="macro-progress">
                <div className="carbs-progress"></div>
              </div>
            </div>

            <div className="macro-row">
              <div className="macro-info">
                <span>
                  <Droplets size={16} /> Fats
                </span>
                <b>45 / 70 g</b>
              </div>

              <div className="macro-progress">
                <div className="fats-progress"></div>
              </div>
            </div>

          </div>
        </div>

        {/* Today's Workout */}
        <div className="dashboard-panel">

          <div className="panel-heading">
            <div>
              <h3>Today's Workout</h3>
              <p>Your training schedule</p>
            </div>

            <Dumbbell size={21} />
          </div>

          <div className="workout-highlight">

            <div>
              <span>STRENGTH TRAINING</span>
              <h3>Chest & Triceps</h3>
              <p>60 minutes · Intermediate</p>
            </div>

            <Dumbbell size={35} />

          </div>

          <div className="workout-exercises">

            <div>
              <span>01</span>
              <p>Bench Press</p>
              <b>3 × 12</b>
            </div>

            <div>
              <span>02</span>
              <p>Incline Dumbbell Press</p>
              <b>3 × 12</b>
            </div>

            <div>
              <span>03</span>
              <p>Cable Fly</p>
              <b>3 × 15</b>
            </div>

            <div>
              <span>04</span>
              <p>Triceps Pushdown</p>
              <b>3 × 12</b>
            </div>

          </div>

          <button className="workout-button">
            Start Workout
            <ArrowUpRight size={17} />
          </button>

        </div>

        {/* Body Progress */}
        <div className="dashboard-panel progress-panel">

          <div className="panel-heading">
            <div>
              <h3>Body Progress</h3>
              <p>Your weekly weight tracking</p>
            </div>

            <Scale size={21} />
          </div>

          <div className="weight-summary">
            <h2>
              60.5 <span>kg</span>
            </h2>

            <span className="positive-trend">
              +1.0 kg this week
            </span>
          </div>

          <div className="chart-container">

            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={weightData}>

                <defs>
                  <linearGradient
                    id="weightGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#ff7a18"
                      stopOpacity={0.35}
                    />

                    <stop
                      offset="95%"
                      stopColor="#ff7a18"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#292929"
                />

                <XAxis
                  dataKey="day"
                  stroke="#888"
                  tickLine={false}
                />

                <YAxis
                  domain={["dataMin - 0.5", "dataMax + 0.5"]}
                  stroke="#888"
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="weight"
                  stroke="#ff7a18"
                  strokeWidth={3}
                  fill="url(#weightGradient)"
                />

              </AreaChart>
            </ResponsiveContainer>

          </div>
        </div>

        {/* AI Fitness Insights */}
        <div className="dashboard-panel ai-panel">

          <div className="panel-heading">
            <div>
              <h3>AI Fitness Insights</h3>
              <p>Personalized recommendations</p>
            </div>

            <Bot size={22} />
          </div>

          <div className="ai-insight">

            <div className="ai-icon">
              <Bot size={24} />
            </div>

            <div>
              <h4>Great progress!</h4>

              <p>
                Your weight trend is moving upward.
                Maintain consistent nutrition and
                progressive overload in your workouts.
              </p>
            </div>

          </div>

          <div className="ai-recommendation">
            <span>RECOMMENDATION</span>

            <p>
              Focus on reaching your daily protein
              target of 120g to support muscle growth.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;