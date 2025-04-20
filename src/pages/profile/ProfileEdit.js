"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { getUserProfile, updateUserProfile } from "../../api/mockProfile";
import "../../styles/profile/profile_edit.css";
import "../../styles/form-validation.css";
import { useFormValidation } from "../../components/FormValidation";
import InputField from "../../components/InputField";

const ProfileEdit = () => {
  const [profile, setProfile] = useState({
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
  });
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const { errors, validateGmail, validatePhone, validateForm } =
    useFormValidation();

  useEffect(() => {
    getUserProfile()
      .then((data) => {
        if (data) {
          setProfile({
            phone: data.phone || "",
            email: data.email || "",
            address: data.address || "",
            emergencyContact: data.emergencyContact || "",
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      validateGmail(value, name);
    } else if (name === "phone") {
      validatePhone(value, name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const isValid = validateForm({
      email: profile.email,
      phone: profile.phone,
    });

    if (!isValid) return;

    updateUserProfile(profile)
      .then(() => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      })
      .catch((err) => {
        // Handle error
      });
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        <Topbar title="Cập nhật thông tin cá nhân" />
        <div className="scroll-content">
          <h2 className="page-title">Cập nhật Thông tin Cá Nhân</h2>

          {showSuccess && (
            <div className="alert success">
              Thông tin cá nhân đã được cập nhật thành công!
            </div>
          )}

          {loading ? (
            <p>Đang tải thông tin...</p>
          ) : (
            <form className="profile-form" onSubmit={handleSubmit}>
              <InputField
                type="tel"
                name="phone"
                label="Số điện thoại"
                value={profile.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.phone}
                required
              />

              <InputField
                type="email"
                name="email"
                label="Email"
                value={profile.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                required
              />

              <InputField
                type="text"
                name="address"
                label="Địa chỉ"
                value={profile.address}
                onChange={handleChange}
                required
              />

              <InputField
                type="text"
                name="emergencyContact"
                label="Người liên hệ khẩn cấp"
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
  );
};

export default ProfileEdit;
