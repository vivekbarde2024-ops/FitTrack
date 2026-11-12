import BodyProgress from "./pages/BodyProgress";
import WorkoutPlanner from "./pages/WorkoutPlanner";
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import {
  House,
  Dumbbell,
  Utensils,
  ChartNoAxesCombined,
  Ellipsis,
  Plus,
  X,
  ClipboardList,
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import DietPlanner from "./pages/DietPlanner";
import NutritionTracker from "./pages/NutritionTracker";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import "./index.css";

function DashboardLayout() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [showMore, setShowMore] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      localStorage.removeItem("fittrackToken");
      localStorage.removeItem("fittrackUser");

      navigate("/login", { replace: true });
    }
  };

  const navigateTo = (page) => {
    setActivePage(page);
    setShowMore(false);
    setShowQuickActions(false);
  };

  const mobileNavigation = [
    { name: "Dashboard", label: "Home", icon: House },
    { name: "Workout Planner", label: "Train", icon: Dumbbell },
    { name: "Nutrition Tracker", label: "Nutrition", icon: Utensils },
    { name: "Body Progress", label: "Progress", icon: ChartNoAxesCombined },
  ];

  return (
    <div className="app-layout">

     <Sidebar
  activePage={activePage}
  onNavigate={navigateTo}
  onLogout={handleLogout}
/>

      <main className="main-content">

        <Navbar title={activePage} />

        {activePage === "Dashboard" && <Dashboard />}

        {activePage === "Diet Planner" && <DietPlanner />}

        {activePage === "Nutrition Tracker" && <NutritionTracker />}

        {activePage === "Workout Planner" && <WorkoutPlanner />}

        {activePage === "Body Progress" && <BodyProgress />}

        {activePage === "Analytics" && <Analytics />}

        {activePage !== "Dashboard" &&
          activePage !== "Diet Planner" &&
          activePage !== "Nutrition Tracker" &&
          activePage !== "Workout Planner" &&
          activePage !== "Body Progress" &&
          activePage !== "Analytics" && (
            <div className="coming-soon">
              <h2>{activePage}</h2>
              <p>This page is coming soon.</p>
            </div>
          )}

      </main>

      <nav className="mobile-bottom-nav">

        {mobileNavigation.slice(0, 2).map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`mobile-nav-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => navigateTo(item.name)}
            >
              <Icon size={21} />
              <span>{item.label}</span>
            </button>
          );
        })}

        <button
          className={`mobile-add-button ${
            showQuickActions ? "rotated" : ""
          }`}
          onClick={() => setShowQuickActions(!showQuickActions)}
        >
          {showQuickActions ? <X size={27} /> : <Plus size={29} />}
        </button>

        {mobileNavigation.slice(2).map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`mobile-nav-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => navigateTo(item.name)}
            >
              <Icon size={21} />
              <span>{item.label}</span>
            </button>
          );
        })}

        <button
          className={`mobile-nav-item ${showMore ? "active" : ""}`}
          onClick={() => setShowMore(!showMore)}
        >
          <Ellipsis size={21} />
          <span>More</span>
        </button>

      </nav>

      {showQuickActions && (
        <>
          <div
            className="mobile-overlay"
            onClick={() => setShowQuickActions(false)}
          />

          <div className="quick-action-menu">
            <h3>Quick Actions</h3>

            <button onClick={() => navigateTo("Nutrition Tracker")}>
              <Utensils size={19} /> Log Nutrition
            </button>

            <button onClick={() => navigateTo("Workout Planner")}>
              <Dumbbell size={19} /> Log Workout
            </button>

            <button onClick={() => navigateTo("Body Progress")}>
              <ChartNoAxesCombined size={19} /> Update Progress
            </button>
          </div>
        </>
      )}

      {showMore && (
        <>
          <div
            className="mobile-overlay"
            onClick={() => setShowMore(false)}
          />

          <div className="mobile-more-drawer">

            <div className="drawer-heading">
              <h3>More</h3>
              <button onClick={() => setShowMore(false)}>
                <X size={20} />
              </button>
            </div>

            <button onClick={() => navigateTo("Diet Planner")}>
              <ClipboardList size={19} /> Diet Planner
            </button>

            <button onClick={() => navigateTo("AI Assistant")}>
              <Plus size={19} /> AI Assistant
            </button>

            <button onClick={() => navigateTo("Analytics")}>
              <ChartNoAxesCombined size={19} /> Analytics
            </button>

            <button onClick={() => navigateTo("Settings")}>
              <Ellipsis size={19} /> Settings
            </button>

          </div>
        </>
      )}

    </div>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("fittrackToken");

  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

import Analytics from "./pages/Analytics";

import { useNavigate } from "react-router-dom";

