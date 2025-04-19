"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { logout, getCurrentUser } from "../../api/mockAuth"
import UserAvatar from "../UserAvatar"
import "../../styles/admin/AdminSidebar.css"

const AdminSidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeMenu, setActiveMenu] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  useEffect(() => {
    const path = location.pathname

    if (path === "/admin") setActiveMenu("dashboard")
    else if (path.includes("/admin/teachers")) setActiveMenu("teachers")
    else if (path.includes("/admin/leave")) setActiveMenu("leave")
    else if (path.includes("/admin/attendance")) setActiveMenu("attendance")
    else if (path.includes("/admin/notifications")) setActiveMenu("notifications")
    else if (path.includes("/admin/chat")) setActiveMenu("chat")
    else if (path.includes("/admin/contracts")) setActiveMenu("contracts")
    else if (path.includes("/admin/settings")) setActiveMenu("settings")
  }, [location.pathname])

  const handleNavigate = (path, menu) => {
    navigate(path)
    setActiveMenu(menu)
  }

  const handleLogout = () => {
    logout().then(() => {
      navigate("/")
    })
  }

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-header">
        <div className="admin-avatar-container">
          <UserAvatar name={user?.name || "Admin"} size="lg" />
        </div>
        <p className="admin-name">{user?.name || "Admin"}</p>
        <p className="admin-role">{user?.position || "Quản trị viên"}</p>
      </div>

      <ul className="admin-menu">
        {/* Dashboard */}
        <li
          onClick={() => handleNavigate("/admin", "dashboard")}
          className={`admin-menu-item ${activeMenu === "dashboard" ? "active" : ""}`}
        >
          <i className="fas fa-tachometer-alt"></i> Tổng quan
        </li>

        {/* Quản lý giáo viên */}
        <li
          onClick={() => handleNavigate("/admin/teachers", "teachers")}
          className={`admin-menu-item ${activeMenu === "teachers" ? "active" : ""}`}
        >
          <i className="fas fa-user-tie"></i> Quản lý giáo viên
        </li>

        {/* Quản lý nghỉ phép */}
        <li
          onClick={() => handleNavigate("/admin/leave", "leave")}
          className={`admin-menu-item ${activeMenu === "leave" ? "active" : ""}`}
        >
          <i className="fas fa-calendar-alt"></i> Quản lý nghỉ phép
        </li>

        {/* Quản lý điểm danh */}
        <li
          onClick={() => handleNavigate("/admin/attendance", "attendance")}
          className={`admin-menu-item ${activeMenu === "attendance" ? "active" : ""}`}
        >
          <i className="fas fa-clipboard-check"></i> Quản lý điểm danh
        </li>

        {/* Quản lý thông báo */}
        <li
          onClick={() => handleNavigate("/admin/notifications", "notifications")}
          className={`admin-menu-item ${activeMenu === "notifications" ? "active" : ""}`}
        >
          <i className="fas fa-bell"></i> Quản lý thông báo
        </li>

        {/* Tin nhắn */}
        <li
          onClick={() => handleNavigate("/admin/chat", "chat")}
          className={`admin-menu-item ${activeMenu === "chat" ? "active" : ""}`}
        >
          <i className="fas fa-comments"></i> Tin nhắn
        </li>

        {/* Quản lý hợp đồng */}
        <li
          onClick={() => handleNavigate("/admin/contracts", "contracts")}
          className={`admin-menu-item ${activeMenu === "contracts" ? "active" : ""}`}
        >
          <i className="fas fa-file-contract"></i> Quản lý hợp đồng
        </li>

        {/* Cài đặt hệ thống */}
        <li
          onClick={() => handleNavigate("/admin/settings", "settings")}
          className={`admin-menu-item ${activeMenu === "settings" ? "active" : ""}`}
        >
          <i className="fas fa-cog"></i> Cài đặt hệ thống
        </li>

        {/* Đăng xuất */}
        <li onClick={handleLogout} className="admin-menu-item logout">
          <i className="fas fa-sign-out-alt"></i> Đăng xuất
        </li>
      </ul>
    </div>
  )
}

export default AdminSidebar
