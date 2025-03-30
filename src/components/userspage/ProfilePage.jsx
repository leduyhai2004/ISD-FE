import React, { useState, useEffect } from "react";
import UserService from "../service/UserService";
import { Link } from "react-router-dom";
import SidebarOfProfile from "../common/SideBarOfProfile";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBInputGroup,
} from "mdb-react-ui-kit";

function ProfilePage() {
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.ourUsers);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  return (
    <MDBContainer fluid className="p-0">
      <MDBRow>
        {/* Sidebar */}
        <SidebarOfProfile />

        {/* Main Content */}
        <MDBCol md="10" className="p-4 bg-light">
          {/* Header */}
          <main className="profile-content ms-100">
            <h2>Xem hồ sơ</h2>
            <div className="profile-card">
              <h3>Thông Tin Cá Nhân</h3>
              <p>
                <strong>Họ Tên:</strong> {profileInfo.name}
              </p>
              <p>
                <strong>Email:</strong> {profileInfo.email}
              </p>
              <p>
                <strong>Vai trò:</strong> {profileInfo.role}
              </p>
              <p>
                <strong>Thành Phố:</strong> {profileInfo.city}
              </p>
              <p>
                <strong>Ngày bắt đầu hợp đồng:</strong> {profileInfo.contract}
              </p>
              <p>
                <strong>Số điênh thoại:</strong> {profileInfo.phone}
              </p>
              <p>
                <strong>Khoa giảng dạy:</strong> {profileInfo.department}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {profileInfo.address}
              </p>
              <p>
                <strong>Ngày sinh:</strong> {profileInfo.dob}
              </p>
              <p>
                <strong>Bằng cấp:</strong> {profileInfo.degree}
              </p>
            </div>
            <Link
              to={`/update-profile/${profileInfo.id}`}
              className="btn btn-primary"
            >
              Cập Nhật Thông Tin
            </Link>
          </main>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default ProfilePage;
