import "../../styles/admin/ActivityList.css"

const ActivityList = ({ activities, title = "Hoạt động gần đây" }) => {
  return (
    <div className="activity-list">
      <h3>{title}</h3>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <div className="activity-content">
              <strong>{activity.user}</strong> {activity.action}
            </div>
            <div className="activity-time">{activity.time}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ActivityList
