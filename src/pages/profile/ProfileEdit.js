import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import '../../styles/profile/profile_edit.css';

const ProfileEdit = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);

    // Ẩn thông báo sau 3 giây
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        <Topbar />
        <div className="scroll-content">
          <h2 className="page-title">Cập nhật Thông tin Cá Nhân</h2>
          {showSuccess && (
            <div className="alert success">
              Yêu cầu cập nhật đã được gửi. Quản trị sẽ phê duyệt trước khi thông tin được thay đổi.
            </div>
          )}
          <form className="profile-form" onSubmit={handleSubmit}>
            <label>Số điện thoại *</label>
            <input type="text" defaultValue="0123-456-789" required />

            <label>Email *</label>
            <input type="email" defaultValue="teacher@example.com" required />

            <label>Địa chỉ *</label>
            <input type="text" defaultValue="123 Đường ABC, Quận 1, TP.HCM" required />

            <label>Người liên hệ khẩn cấp *</label>
            <input type="text" defaultValue="Nguyễn Văn B - Cha - 0987-111-222" required />

            <button type="submit" className="btn-submit">
              Gửi Yêu Cầu Cập Nhật
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
