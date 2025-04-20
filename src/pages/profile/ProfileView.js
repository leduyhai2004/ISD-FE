"use client"

import { useState, useEffect } from "react"
import Sidebar from "../../components/Sidebar"
import Topbar from "../../components/Topbar"
import { getUserProfile } from "../../api/mockProfile"
import "../../styles/profile/profile_view.css"

const ProfileView = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getUserProfile()
      .then((data) => {
        setProfile(data)
        setLoading(false)
      })
      .catch((err) => {
        setError("Không thể tải thông tin người dùng")
        setLoading(false)
      })
  }, [])

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        <Topbar title="Xem hồ sơ" />
        <div className="scroll-content">
          <h2 className="page-title">Xem Hồ Sơ</h2>

          {loading ? (
            <p>Đang tải thông tin...</p>
          ) : error ? (
            <div className="alert error">{error}</div>
          ) : profile ? (
            <div className="profile-card">
              <h3>Thông Tin Cá Nhân</h3>
              <p>
                <strong>Họ Tên:</strong> {profile.name}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Điện thoại:</strong> {profile.phone}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {profile.address}
              </p>
              <p>
                <strong>Người liên hệ khẩn cấp:</strong> {profile.emergencyContact}
              </p>
              <p>
                <strong>Bằng cấp:</strong> {profile.degree || "Chưa cập nhật"}
              </p>
              <p>
                <strong>Môn giảng dạy:</strong> {profile.subject}
              </p>
              <p>
                <strong>Ngày vào làm:</strong> {profile.joinDate}
              </p>
            </div>
          ) : (
            <p>Không tìm thấy thông tin hồ sơ</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileView
