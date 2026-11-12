import { ArrowUpRight, ArrowDownRight } from "lucide-react";

function StatCard({
  title,
  value,
  unit,
  subtitle,
  icon: Icon,
  trend,
  trendType = "up"
}) {
  return (
    <div className="stat-card">

      <div className="stat-card-header">

        <div className="stat-icon">
          <Icon size={21} />
        </div>

        <span className="stat-trend">
          {trendType === "up" ? (
            <ArrowUpRight size={15} />
          ) : (
            <ArrowDownRight size={15} />
          )}

          {trend}
        </span>

      </div>

      <p className="stat-title">{title}</p>

      <h2 className="stat-value">
        {value}
        <span>{unit}</span>
      </h2>

      <p className="stat-subtitle">{subtitle}</p>

    </div>
  );
}

export default StatCard;