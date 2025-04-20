"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import { getUserProfile, updateUserProfile } from "../../api/mockProfile";
import "../../styles/admin/AdminProfileEdit.css";
import "../../styles/form-validation.css";
import { useFormValidation } from "../../components/FormValidation";
import InputField from "../../components/InputField";

const AdminProfileEdit = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    currentPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    errors,
    validateGmail,
    validatePhone,
    validatePassword,
    validateForm,
  } = useFormValidation();

  useEffect(() => {
    getUserProfile()
      .then((data) => {
        if (data) {
          setProfile({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            password: "",
            confirmPassword: "",
            currentPassword: "",
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage("Không thể tải thông tin người dùng");
        setShowError(true);
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
    } else if (name === "password") {
      validatePassword(value, name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const isValid = validateForm({
      email: profile.email,
      phone: profile.phone,
      password: profile.password,
    });

    if (!isValid) return;

    // Check if passwords match if changing password
    if (profile.password && profile.password !== profile.confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp");
      setShowError(true);
      return;
    }

    // Create update object (only include fields that should be updated)
    const updateData = {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
    };

    // Only include password if it's being changed
    if (profile.password) {
      updateData.password = profile.password;
    }

    updateUserProfile(updateData)
      .then(() => {
        setShowSuccess(true);
        setShowError(false);

        // Reset password fields
        setProfile({
          ...profile,
          password: "",
          confirmPassword: "",
          currentPassword: "",
        });

        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      })
      .catch((err) => {
        setErrorMessage(err.message || "Có lỗi xảy ra khi cập nhật thông tin");
        setShowError(true);
      });
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <AdminTopbar title="Cập nhật thông tin cá nhân" />
        <div className="admin-content-body">
          <div className="admin-profile-edit-container">
            <h3 className="section-title">Cập nhật thông tin cá nhân</h3>

            {showSuccess && (
              <div className="alert success">
                Thông tin cá nhân đã được cập nhật thành công!
              </div>
            )}
            {showError && <div className="alert error">{errorMessage}</div>}

            {loading ? (
              <div className="loading">Đang tải thông tin...</div>
            ) : (
              <form className="admin-profile-form" onSubmit={handleSubmit}>
                <InputField
                  type="text"
                  name="name"
                  label="Họ và tên"
                  value={profile.name}
                  onChange={handleChange}
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
                  type="tel"
                  name="phone"
                  label="Số điện thoại"
                  value={profile.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.phone}
                  required
                />

                <div className="password-section">
                  <h4>Thay đổi mật khẩu</h4>
                  <p className="password-hint">
                    Để trống nếu không muốn thay đổi mật khẩu
                  </p>

                  <InputField
                    type="password"
                    name="currentPassword"
                    label="Mật khẩu hiện tại"
                    value={profile.currentPassword}
                    onChange={handleChange}
                  />

                  <InputField
                    type="password"
                    name="password"
                    label="Mật khẩu mới"
                    value={profile.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password}
                  />

                  <InputField
                    type="password"
                    name="confirmPassword"
                    label="Xác nhận mật khẩu mới"
                    value={profile.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Cập nhật thông tin
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileEdit;
