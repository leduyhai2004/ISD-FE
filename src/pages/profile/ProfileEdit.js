"use client"

import { useState, useEffect } from "react"
import Sidebar from "../../components/Sidebar"
import Topbar from "../../components/Topbar"
import { getUserProfile, updateUserProfile } from "../../api/mockProfile"
import "../../styles/profile/profile_edit.css"

const ProfileEdit = () => {
  const [profile, setProfile] = useState({
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
  })
  const [loading, setLoading] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    getUserProfile()
      .then((data) => {
        if (data) {
          setProfile({
            phone: data.phone || "",
            email: data.email || "",
            address: data.address || "",
            emergencyContact: data.emergencyContact || "",
          })
        }
        setLoading(false)
      })
      .catch((err) => {
        setError("Không thể tải thông tin người dùng")
        setLoading(false)
      })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile({
      ...profile,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    updateUserProfile(profile)
      .then(() => {
        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false)
        }, 3000)
      })
      .catch((err) => {
        setError(err.message || "Có lỗi xảy ra khi cập nhật thông tin")
      })
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        <Topbar title="Cập nhật thông tin cá nhân" />
        <div className="scroll-content">
          <h2 className="page-title">Cập nhật Thông tin Cá Nhân</h2>

          {showSuccess && <div className="alert success">Thông tin cá nhân đã được cập nhật thành công!</div>}

          {error && <div className="alert error">{error}</div>}

          {loading ? (
            <p>Đang tải thông tin...</p>
          ) : (
            <form className="profile-form" onSubmit={handleSubmit}>
              <label>Số điện thoại *</label>
              <input type="text" name="phone" value={profile.phone} onChange={handleChange} required />

              <label>Email *</label>
              <input type="email" name="email" value={profile.email} onChange={handleChange} required />

              <label>Địa chỉ *</label>
              <input type="text" name="address" value={profile.address} onChange={handleChange} required />

              <label>Người liên hệ khẩn cấp *</label>
              <input
                type="text"
                name="emergencyContact"
                value={profile.emergencyContact}
                onChange={handleChange}
                required
              />

              <button type="submit" className="btn-submit">
                Cập nhật thông tin
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit
