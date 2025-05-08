"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logout, getCurrentUser } from "../../api/mockAuth";
import { getPendingProfileUpdateRequests } from "../../api/mockProfile";
import UserAvatar from "../UserAvatar";
import "../../styles/Sidebar.css";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("");
  const [user, setUser] = useState(null);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === "admin") {
      setUser(currentUser);
    } else {
      // Redirect to login if not an admin
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    // Load pending profile update requests count
    getPendingProfileUpdateRequests()
      .then((requests) => {
        setPendingRequests(requests.length);
      })
      .catch((error) => {
        console.error("Error loading pending requests:", error);
      });

    // Refresh count every 30 seconds
    const interval = setInterval(() => {
      getPendingProfileUpdateRequests()
        .then((requests) => {
          setPendingRequests(requests.length);
        })
        .catch((error) => {
          console.error("Error loading pending requests:", error);
        });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const path = location.pathname;

    if (path === "/admin") setActiveMenu("dashboard");
    else if (path.includes("/admin/teachers")) setActiveMenu("teachers");
    else if (path.includes("/admin/leave")) setActiveMenu("leave");
    else if (path.includes("/admin/attendance")) setActiveMenu("attendance");
    else if (path.includes("/admin/notifications"))
      setActiveMenu("notifications");
    else if (path.includes("/admin/chat")) setActiveMenu("chat");
    else if (path.includes("/admin/contracts")) setActiveMenu("contracts");
    else if (path.includes("/admin/accounts")) setActiveMenu("accounts");
    else if (path.includes("/admin/settings")) setActiveMenu("settings");
    else if (path.includes("/admin/profile-requests"))
      setActiveMenu("profile-requests");

    // Auto-expand dropdown menus based on active path
    if (path.includes("/admin/profile")) setShowProfileMenu(true);
  }, [location.pathname]);

  const handleNavigate = (path, menu) => {
    navigate(path);
    setActiveMenu(menu);
  };

  const handleLogout = () => {
    logout().then(() => {
      navigate("/");
    });
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
        {/* Dashboard */}
        <li
          onClick={() => handleNavigate("/admin", "dashboard")}
          className={`menu-item ${activeMenu === "dashboard" ? "active" : ""}`}
        >
          <i className="fas fa-tachometer-alt"></i> Tổng quan
        </li>

        {/* Quản lý giáo viên */}
        <li
          onClick={() => handleNavigate("/admin/teachers", "teachers")}
          className={`menu-item ${activeMenu === "teachers" ? "active" : ""}`}
        >
          <i className="fas fa-user-tie"></i> Quản lý giáo viên
        </li>

        {/* Quản lý tài khoản */}
        <li
          onClick={() => handleNavigate("/admin/accounts", "accounts")}
          className={`menu-item ${activeMenu === "accounts" ? "active" : ""}`}
        >
          <i className="fas fa-users-cog"></i> Quản lý tài khoản
        </li>

        {/* Quản lý nghỉ phép */}
        <li
          onClick={() => handleNavigate("/admin/leave", "leave")}
          className={`menu-item ${activeMenu === "leave" ? "active" : ""}`}
        >
          <i className="fas fa-calendar-alt"></i> Quản lý nghỉ phép
        </li>

        {/* Quản lý điểm danh */}
        <li
          onClick={() => handleNavigate("/admin/attendance", "attendance")}
          className={`menu-item ${activeMenu === "attendance" ? "active" : ""}`}
        >
          <i className="fas fa-clipboard-check"></i> Quản lý điểm danh
        </li>

        {/* Quản lý thông báo */}
        <li
          onClick={() =>
            handleNavigate("/admin/notifications", "notifications")
          }
          className={`menu-item ${
            activeMenu === "notifications" ? "active" : ""
          }`}
        >
          <i className="fas fa-bell"></i> Quản lý thông báo
        </li>

        {/* Tin nhắn */}
        <li
          onClick={() => handleNavigate("/admin/chat", "chat")}
          className={`menu-item ${activeMenu === "chat" ? "active" : ""}`}
        >
          <i className="fas fa-comments"></i> Tin nhắn
        </li>

        {/* Quản lý hợp đồng */}
        <li
          onClick={() => handleNavigate("/admin/contracts", "contracts")}
          className={`menu-item ${activeMenu === "contracts" ? "active" : ""}`}
        >
          <i className="fas fa-file-contract"></i> Quản lý hợp đồng
        </li>

        {/* Quản lý yêu cầu cập nhật hồ sơ */}
        <li
          onClick={() =>
            handleNavigate("/admin/profile-requests", "profile-requests")
          }
          className={`menu-item ${
            activeMenu === "profile-requests" ? "active" : ""
          }`}
        >
          <i className="fas fa-user-edit"></i> Yêu cầu cập nhật hồ sơ
          {pendingRequests > 0 && (
            <span className="notification-badge">{pendingRequests}</span>
          )}
        </li>

        {/* Đăng xuất */}
        <li onClick={handleLogout} className="menu-item logout">
          <i className="fas fa-sign-out-alt"></i> Đăng xuất
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
