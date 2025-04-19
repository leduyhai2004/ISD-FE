import "../../styles/admin/EventsList.css"

const EventsList = ({ events, title = "Sự kiện sắp tới" }) => {
  return (
    <div className="events-list">
      <h3>{title}</h3>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <div className="event-date">
              <div className="event-day">{event.date.split("/")[0]}</div>
              <div className="event-month">{event.date.split("/")[1]}</div>
            </div>
            <div className="event-details">
              <h4>{event.title}</h4>
              <p>
                <i className="fas fa-clock"></i> {event.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EventsList
