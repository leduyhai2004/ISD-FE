import React from 'react';
import '../styles/teacher_dashboard.css';

const Topbar = () => {
  return (
    <div className="topbar">
      <h2>Trang chủ</h2>
      <div className="topbar-right">
        <input type="text" placeholder="Tìm kiếm..." />
        <i className="fas fa-bell"></i>
        <i className="fas fa-envelope"></i>
        <i className="fas fa-user-circle"></i>
      </div>
    </div>
  );
};

export default Topbar;
