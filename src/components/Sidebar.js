"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import { getCurrentUser } from "../api/mockAuth";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAttendanceMenu, setShowAttendanceMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === "teacher") {
      setUser(currentUser);
    } else {
      // Redirect to login if not a teacher
      navigate("/");
    }
  }, [navigate]);

  // Set active menu based on current path when component mounts or path changes
  useEffect(() => {
    const path = location.pathname;

    if (path === "/dashboard") setActiveMenu("dashboard");
    else if (path === "/profile/view") setActiveMenu("viewProfile");
    else if (path === "/profile/edit") setActiveMenu("editProfile");
    else if (path === "/contract") setActiveMenu("contract");
    else if (path === "/leave") setActiveMenu("leave");
    else if (path === "/attendance") setActiveMenu("attendance");
    else if (path === "/attendance/history")
      setActiveMenu("attendance-history");
    else if (path === "/notifications") setActiveMenu("notifications");
    else if (path === "/messages") setActiveMenu("messages");

    // Auto-expand dropdown menus based on active path
    if (path.includes("/profile")) setShowProfileMenu(true);
    if (path.includes("/attendance")) setShowAttendanceMenu(true);
  }, [location.pathname]);

  const handleNavigate = (path, menu) => {
    navigate(path);
    setActiveMenu(menu);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="avatar-container">
          <UserAvatar name={user.name} size="lg" />
        </div>
        <p className="teacher-name">{user.name}</p>
        <p className="teacher-role">{user.position}</p>
      </div>

      <ul className="menu">
        {/* Trang Chủ */}
        <li
          onClick={() => handleNavigate("/dashboard", "dashboard")}
          className={`menu-item ${activeMenu === "dashboard" ? "active" : ""}`}
        >
          <i className="fas fa-home"></i> Trang Chủ
        </li>

        {/* Hồ sơ */}
        <li
          className={`menu-item has-dropdown ${
            showProfileMenu ? "expanded" : ""
          } ${
            activeMenu === "viewProfile" || activeMenu === "editProfile"
              ? "active"
              : ""
          }`}
        >
          <div
            className="sidebar-dropdown-header"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <i className="fas fa-user"></i> Hồ sơ
            <span className="dropdown-icon">{showProfileMenu ? "▲" : "▼"}</span>
          </div>
          <ul
            className={`sidebar-dropdown-menu ${showProfileMenu ? "show" : ""}`}
          >
            <li
              onClick={() => handleNavigate("/profile/view", "viewProfile")}
              className={`submenu-item ${
                activeMenu === "viewProfile" ? "active-submenu" : ""
              }`}
            >
              Xem Hồ sơ
            </li>
            <li
              onClick={() => handleNavigate("/profile/edit", "editProfile")}
              className={`submenu-item ${
                activeMenu === "editProfile" ? "active-submenu" : ""
              }`}
            >
              Chỉnh sửa Hồ sơ
            </li>
          </ul>
        </li>

        {/* Hợp đồng */}
        <li
          onClick={() => handleNavigate("/contract", "contract")}
          className={`menu-item ${activeMenu === "contract" ? "active" : ""}`}
        >
          <i className="fas fa-file-contract"></i> Hợp đồng
        </li>

        {/* Nghỉ phép */}
        <li
          onClick={() => handleNavigate("/leave", "leave")}
          className={`menu-item ${activeMenu === "leave" ? "active" : ""}`}
        >
          <i className="fas fa-calendar-times"></i> Nghỉ phép
        </li>

        {/* Điểm danh */}
        <li
          className={`menu-item has-dropdown ${
            showAttendanceMenu ? "expanded" : ""
          } ${
            activeMenu === "attendance" || activeMenu === "attendance-history"
              ? "active"
              : ""
          }`}
        >
          <div
            className="sidebar-dropdown-header"
            onClick={() => setShowAttendanceMenu(!showAttendanceMenu)}
          >
            <i className="fas fa-check-circle"></i> Điểm danh
            <span className="dropdown-icon">
              {showAttendanceMenu ? "▲" : "▼"}
            </span>
          </div>
          <ul
            className={`sidebar-dropdown-menu ${
              showAttendanceMenu ? "show" : ""
            }`}
          >
            <li
              onClick={() => handleNavigate("/attendance", "attendance")}
              className={`submenu-item ${
                activeMenu === "attendance" ? "active-submenu" : ""
              }`}
            >
              Check In/Out
            </li>
            <li
              onClick={() =>
                handleNavigate("/attendance/history", "attendance-history")
              }
              className={`submenu-item ${
                activeMenu === "attendance-history" ? "active-submenu" : ""
              }`}
            >
              Lịch Sử Điểm Danh
            </li>
          </ul>
        </li>

        {/* Thông báo */}
        <li
          onClick={() => handleNavigate("/notifications", "notifications")}
          className={`menu-item ${
            activeMenu === "notifications" ? "active" : ""
          }`}
        >
          <i className="fas fa-bell"></i> Thông báo
        </li>

        {/* Tin nhắn */}
        <li
          onClick={() => handleNavigate("/messages", "messages")}
          className={`menu-item ${activeMenu === "messages" ? "active" : ""}`}
        >
          <i className="fas fa-envelope"></i> Tin nhắn
        </li>

        {/* Đăng xuất */}
        <li onClick={handleLogout} className="menu-item logout">
          <i className="fas fa-sign-out-alt"></i> Đăng xuất
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
