import {
  Search,
  Bell,
  ChevronDown,
  CalendarDays,
} from "lucide-react";

function Navbar({ title = "Dashboard" }) {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="navbar">

      <div className="navbar-heading">
        <h1>{title}</h1>
        <p>Welcome back! Here's your fitness overview.</p>
      </div>

      <div className="navbar-actions">

        <div className="navbar-date">
          <CalendarDays size={17} />
          <span>{today}</span>
        </div>

        <button className="navbar-search">
          <Search size={19} />
          <span>Search anything...</span>
          <kbd>⌘ K</kbd>
        </button>

        <button className="notification-button">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <button className="navbar-profile">
          <div className="navbar-avatar">V</div>

          <div className="navbar-user-info">
            <strong>Vivek Barde</strong>
            <span>Premium Member</span>
          </div>

          <ChevronDown size={16} />
        </button>

      </div>

    </header>
  );
}

export default Navbar;