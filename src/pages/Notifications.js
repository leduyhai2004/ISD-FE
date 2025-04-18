"use client"

// src/pages/Notifications.js
import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import "../styles/notifications.css"
import { getNotifications } from "../api/mockNotification"

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getNotifications()
      .then((data) => {
        setNotifications(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        <Topbar title="Thông báo" />
        <div className="scroll-content">
          <div className="notifications-container">
            <h3 className="section-title">Danh sách thông báo</h3>

            {loading ? (
              <p>Đang tải thông báo...</p>
            ) : (
              <div className="notifications-list">
                {notifications.map((notification) => (
                  <div key={notification.id} className="notification-item">
                    <div className={`notification-badge ${notification.type.toLowerCase().replace(" ", "-")}`}>
                      {notification.type}
                    </div>
                    <div className="notification-content">
                      <p>{notification.content}</p>
                      <span className="notification-date">{notification.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications
