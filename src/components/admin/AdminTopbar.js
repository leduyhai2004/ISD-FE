"use client"

import { useState } from "react"
import UserAvatar from "../UserAvatar"
import "../../styles/admin/AdminTopbar.css"

const AdminTopbar = ({ title = "Tổng quan" }) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  // Mock notifications
  const notifications = [
    {
      id: 1,
      content: "Có 3 yêu cầu nghỉ phép mới cần duyệt",
      time: "5 phút trước",
    },
    {
      id: 2,
      content: "Giáo viên Trần Thị B vừa gửi đơn nghỉ phép",
      time: "10 phút trước",
    },
    {
      id: 3,
      content: "Hôm nay có 2 giáo viên đi muộn",
      time: "30 phút trước",
    },
  ]

  return (
    <div className="admin-topbar">
      <h2>{title}</h2>
      <div className="admin-topbar-right">
        <div className="admin-search">
          <input type="text" placeholder="Tìm kiếm..." />
          <i className="fas fa-search"></i>
        </div>

        <div className="admin-notifications">
          <div className="notification-icon" onClick={() => setShowNotifications(!showNotifications)}>
            <i className="fas fa-bell"></i>
            <span className="notification-badge">3</span>
          </div>

          {showNotifications && (
            <div className="notifications-dropdown">
              <h3>Thông báo mới</h3>
              <ul>
                {notifications.map((notification) => (
                  <li key={notification.id}>
                    <p>{notification.content}</p>
                    <span>{notification.time}</span>
                  </li>
                ))}
              </ul>
              <div className="view-all">Xem tất cả</div>
            </div>
          )}
        </div>

        <div className="admin-user-menu">
          <div className="user-avatar" onClick={() => setShowUserMenu(!showUserMenu)}>
            <UserAvatar name="Admin" size="sm" />
          </div>

          {showUserMenu && (
            <div className="user-dropdown">
              <ul>
                <li>
                  <i className="fas fa-user"></i> Hồ sơ
                </li>
                <li>
                  <i className="fas fa-cog"></i> Cài đặt
                </li>
                <li>
                  <i className="fas fa-sign-out-alt"></i> Đăng xuất
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminTopbar
