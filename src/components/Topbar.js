"use client";

import { useState, useEffect, useRef } from "react";
import { getNotifications, markAsRead } from "../api/mockNotification";
import { getCurrentUser } from "../api/mockAuth";
import "../styles/teacher_dashboard.css";
import "../styles/notifications.css";

// Cho phép truyền title để tái sử dụng cho các trang khác
const Topbar = ({ title = "Trang chủ" }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationRef = useRef(null);

  useEffect(() => {
    loadNotifications();

    // Set up interval to check for new notifications
    const interval = setInterval(() => {
      loadNotifications();
    }, 10000); // Check every 10 seconds

    // Close notifications dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      clearInterval(interval);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const loadNotifications = () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      console.log("Topbar: Loading notifications for user:", currentUser.id);
      getNotifications()
        .then((data) => {
          console.log("Topbar: Notifications loaded:", data);
          // Sort notifications by date (newest first) and read status (unread first)
          const sortedNotifications = [...data].sort((a, b) => {
            if (a.read !== b.read) return a.read ? 1 : -1;
            return new Date(b.date) - new Date(a.date);
          });

          setNotifications(sortedNotifications);
          setUnreadCount(
            sortedNotifications.filter((notif) => !notif.read).length
          );
        })
        .catch((err) => {
          console.error("Topbar: Error loading notifications:", err);
        });
    } else {
      console.log("Topbar: No current user found, cannot load notifications");
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
            setUnreadCount((prev) => Math.max(0, prev - 1));
          }
        })
        .catch((err) => {
          console.error("Error marking notification as read:", err);
        });
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
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

  return (
    <div className="topbar">
      <h2>{title}</h2>
      <div className="topbar-right">
        <input type="text" placeholder="Tìm kiếm..." />

        <div className="notification-container" ref={notificationRef}>
          <div className="notification-icon" onClick={toggleNotifications}>
            <i className="fas fa-bell"></i>
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </div>

          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="notifications-header">
                <h3>Thông báo</h3>
                {unreadCount > 0 && <span>{unreadCount} chưa đọc</span>}
              </div>

              <div className="notifications-list">
                {notifications.length > 0 ? (
                  notifications.slice(0, 5).map((notification) => (
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
                        <i
                          className={getNotificationIcon(notification.type)}
                        ></i>
                      </div>
                      <div className="notification-content">
                        <div className="notification-header">
                          <h4 className="notification-type">
                            {notification.type}
                          </h4>
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
                  ))
                ) : (
                  <p className="no-notifications">Không có thông báo nào</p>
                )}
              </div>

              <div className="notifications-footer">
                <a href="/notifications">Xem tất cả thông báo</a>
              </div>
            </div>
          )}
        </div>

        <i className="fas fa-envelope"></i>
        <i className="fas fa-user-circle"></i>
      </div>
    </div>
  );
};

export default Topbar;
