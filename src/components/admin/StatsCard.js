import "../../styles/admin/StatsCard.css"

const StatsCard = ({ icon, count, label, color }) => {
  return (
    <div className={`admin-stats-card ${color}`}>
      <div className="stats-icon">
        <i className={icon}></i>
      </div>
      <div className="stats-info">
        <h3>{count}</h3>
        <p>{label}</p>
      </div>
    </div>
  )
}

export default StatsCard
