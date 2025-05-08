"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { getNotifications, markAsRead } from "../api/mockNotification";
import { getCurrentUser } from "../api/mockAuth";
import { useDataSync } from "../components/DataSyncProvider";
import "../styles/notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { lastUpdate } = useDataSync();

  useEffect(() => {
    loadNotifications();
  }, [lastUpdate.notifications]);

  const loadNotifications = () => {
    setLoading(true);
    const currentUser = getCurrentUser();

    if (currentUser) {
      getNotifications()
        .then((data) => {
          // Sort notifications by date (newest first) and read status (unread first)
          const sortedNotifications = [...data].sort((a, b) => {
            if (a.read !== b.read) return a.read ? 1 : -1;
            return new Date(b.date) - new Date(a.date);
          });

          setNotifications(sortedNotifications);
          setLoading(false);
        })
        .catch((err) => {
          setError("Không thể tải thông báo");
          setLoading(false);
        });
    } else {
      setError("Không tìm thấy thông tin người dùng");
      setLoading(false);
    }
  };

  const handleMarkAsRead = (notificationId) => {
    const currentUser = getCurrentUser();

    if (currentUser) {
      markAsRead(notificationId)
        .then((success) => {
          if (success) {
            // Update the notification in the state
            setNotifications(
              notifications.map((notif) =>
                notif.id === notificationId ? { ...notif, read: true } : notif
              )
            );
          }
        })
        .catch((err) => {
          console.error("Error marking notification as read:", err);
        });
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        <Topbar title="Thông báo" />
        <div className="scroll-content">
          <h2 className="page-title">Thông báo</h2>

          {loading ? (
            <p>Đang tải thông báo...</p>
          ) : error ? (
            <div className="alert error">{error}</div>
          ) : notifications.length > 0 ? (
            <div className="notifications-list">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${
                    notification.read ? "read" : "unread"
                  }`}
                  onClick={() =>
                    !notification.read && handleMarkAsRead(notification.id)
                  }
                >
                  <div className="notification-icon">
                    <i className={getNotificationIcon(notification.type)}></i>
                  </div>
                  <div className="notification-content">
                    <div className="notification-header">
                      <h4 className="notification-type">{notification.type}</h4>
                      <span className="notification-date">
                        {notification.date}
                      </span>
                    </div>
                    <p className="notification-message">
                      {notification.content}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="notification-badge">
                      <span>Mới</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-notifications">Không có thông báo nào</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to get appropriate icon for notification type
const getNotificationIcon = (type) => {
  switch (type) {
    case "Thông báo chung":
      return "fas fa-bullhorn";
    case "Chính sách":
      return "fas fa-file-alt";
    case "Cập nhật hồ sơ":
      return "fas fa-user-edit";
    case "Yêu cầu cập nhật":
      return "fas fa-user-edit";
    default:
      return "fas fa-bell";
  }
};

export default Notifications;
