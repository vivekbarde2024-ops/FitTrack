import {
  LayoutDashboard,
  UserRound,
  Dumbbell,
  Salad,
  Utensils,
  Activity,
  Bot,
  ChartNoAxesCombined,
  Settings,
  LogOut,
  Zap
} from "lucide-react";

const menuGroups = [
  {
    title: "OVERVIEW",
    items: [
      { name: "Dashboard", icon: LayoutDashboard }
    ]
  },
  {
    title: "FITNESS",
    items: [
      { name: "Workout Planner", icon: Dumbbell },
      { name: "Diet Planner", icon: Salad },
      { name: "Nutrition Tracker", icon: Utensils },
      { name: "Body Progress", icon: Activity }
    ]
  },
  {
    title: "INTELLIGENCE",
    items: [
      { name: "AI Assistant", icon: Bot },
      { name: "Analytics", icon: ChartNoAxesCombined }
    ]
  }
];

function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon">
          <Zap size={24} />
        </div>

        <div>
          <h2>FITTRACK<span>AI</span></h2>
          <p>SMART FITNESS PLATFORM</p>
        </div>
      </div>

      <div className="sidebar-profile">
        <div className="profile-avatar">V</div>

        <div>
          <h4>Vivek Barde</h4>
          <p>Premium Member</p>
        </div>
      </div>

      <nav className="sidebar-navigation">

        {menuGroups.map((group) => (
          <div className="menu-group" key={group.title}>

            <p className="menu-heading">{group.title}</p>

            {group.items.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  className={`nav-item ${
                    activePage === item.name ? "active" : ""
                  }`}
                  onClick={() => onNavigate(item.name)}
                >
                  <Icon size={19} />
                  <span>{item.name}</span>
                </button>
              );
            })}

          </div>
        ))}

      </nav>

      <div className="sidebar-ai-card">
        <div className="ai-card-icon">
          <Bot size={21} />
        </div>

        <h4>AI Fitness Coach</h4>

        <p>Your personal fitness intelligence is ready.</p>

        <button onClick={() => onNavigate("AI Assistant")}>
          Explore AI Coach
        </button>
      </div>

      <div className="sidebar-bottom">

        <button
          className="nav-item"
          onClick={() => onNavigate("Settings")}
        >
          <Settings size={19} />
          <span>Settings</span>
        </button>

        <button className="nav-item">
          <LogOut size={19} />
          <span>Logout</span>
        </button>

      </div>

      <div className="sidebar-footer">
        <span>FITTRACK AI v1.0</span>
        <span>Made for your goals.</span>
      </div>

    </aside>
  );
}

export default Sidebar;