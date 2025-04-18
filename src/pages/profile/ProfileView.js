import React from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import '../../styles/profile/profile_view.css';

const ProfileView = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        <Topbar />
        <div className="scroll-content">
          <h2 className="page-title">Xem Hồ Sơ</h2>
          <div className="profile-card">
            <h3>Thông Tin Cá Nhân</h3>
            <p>
              <strong>Họ Tên:</strong> Nguyễn Văn A
            </p>
            <p>
              <strong>Email:</strong> teacher@example.com
            </p>
            <p>
              <strong>Điện thoại:</strong> 0123-456-789
            </p>
            <p>
              <strong>Bằng cấp:</strong> Thạc sĩ Toán học
            </p>
            <p>
              <strong>Kinh nghiệm:</strong> Giáo viên Toán tại THPT ABC từ 2018 - nay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
