"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import {
  getUserProfile,
  submitProfileUpdateRequest,
  getUserProfileRequests,
} from "../../api/mockProfile";
import "../../styles/profile/profile_edit.css";
import "../../styles/form-validation.css";
import { useFormValidation } from "../../components/FormValidation";
import InputField from "../../components/InputField";
import { getCurrentUser } from "../../api/mockAuth";

const ProfileEdit = () => {
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    birthDate: "",
    degree: "",
    subject: "",
  });
  const [loading, setLoading] = useState(true);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { errors, validateGmail, validatePhone, validateForm } =
    useFormValidation();

  useEffect(() => {
    loadUserData();

    // Set up interval to refresh data every 15 seconds
    const interval = setInterval(() => {
      loadUserData(false); // Don't show loading indicator for refreshes
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const loadUserData = (showLoading = true) => {
    if (showLoading) setLoading(true);

    // Get the current user
    const currentUser = getCurrentUser();
    if (!currentUser) {
      setLoading(false);
      setShowError(true);
      setErrorMessage("Không tìm thấy thông tin người dùng");
      return;
    }

    // Load user profile
    getUserProfile()
      .then((data) => {
        if (data) {
          setProfile({
            name: data.name || "",
            phone: data.phone || "",
            email: data.email || "",
            address: data.address || "",
            emergencyContact: data.emergencyContact || "",
            birthDate: data.birthDate || "",
            degree: data.degree || "",
            subject: data.subject || "",
          });
        }

        // Load pending profile update requests
        return getUserProfileRequests(currentUser.id);
      })
      .then((requests) => {
        const pending = requests.filter((req) => req.status === "pending");
        setPendingRequests(pending);
        if (showLoading) setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading user data:", err);
        if (showLoading) {
          setLoading(false);
          setShowError(true);
          setErrorMessage("Không thể tải thông tin người dùng");
        }
      });
  };

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

  // Direct button click handler - separate from form submission
  const handleUpdateButtonClick = () => {
    console.log("UPDATE BUTTON CLICKED");

    // Prevent multiple submissions
    if (submitting) {
      console.log("Already submitting, preventing duplicate submission");
      return;
    }

    setSubmitting(true);
    setShowError(false);
    setShowSuccess(false);

    // Check if there's already a pending request
    if (pendingRequests.length > 0) {
      console.log(
        "Pending requests found, cannot submit new request",
        pendingRequests
      );
      setShowError(true);
      setErrorMessage(
        "Bạn đã có một yêu cầu cập nhật đang chờ phê duyệt. Vui lòng đợi quản trị viên xử lý."
      );
      setSubmitting(false);
      return;
    }

    // Skip complex validation for now to ensure the request goes through
    console.log("Submitting profile update request:", profile);

    // Submit update request with real user data
    submitProfileUpdateRequest(profile)
      .then((response) => {
        console.log("Profile update request submitted successfully:", response);
        setShowSuccess(true);
        setShowError(false);

        // Show success message for longer time
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);

        // Reload data to show pending request
        loadUserData();
      })
      .catch((err) => {
        console.error("Error submitting profile update request:", err);
        setShowError(true);
        setErrorMessage(
          err.message || "Có lỗi xảy ra khi gửi yêu cầu cập nhật"
        );
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FORM SUBMIT TRIGGERED");
    handleUpdateButtonClick(); // Call the button click handler directly
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        <Topbar title="Cập nhật thông tin cá nhân" />
        <div className="scroll-content">
          <h2 className="page-title">Cập nhật Thông tin Cá Nhân</h2>

          {pendingRequests.length > 0 && (
            <div className="alert info">
              Bạn có {pendingRequests.length} yêu cầu cập nhật đang chờ phê
              duyệt. Các thay đổi mới sẽ không được áp dụng cho đến khi yêu cầu
              hiện tại được xử lý.
            </div>
          )}

          {showSuccess && (
            <div className="alert success">
              Yêu cầu cập nhật thông tin đã được gửi và đang chờ phê duyệt!
            </div>
          )}
          {showError && <div className="alert error">{errorMessage}</div>}

          {loading ? (
            <p>Đang tải thông tin...</p>
          ) : (
            <div className="profile-form-container">
              <form className="profile-form" onSubmit={handleSubmit}>
                <InputField
                  type="text"
                  name="name"
                  label="Họ và tên"
                  value={profile.name}
                  onChange={handleChange}
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
                  type="date"
                  name="birthDate"
                  label="Ngày sinh"
                  value={profile.birthDate}
                  onChange={handleChange}
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

                <InputField
                  type="text"
                  name="degree"
                  label="Bằng cấp"
                  value={profile.degree}
                  onChange={handleChange}
                />

                <div className="form-group">
                  <label htmlFor="subject">Môn giảng dạy</label>
                  <select
                    id="subject"
                    name="subject"
                    value={profile.subject}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="">-- Chọn môn giảng dạy --</option>
                    <option value="Toán">Toán</option>
                    <option value="Văn">Văn</option>
                    <option value="Anh">Anh</option>
                    <option value="Lý">Lý</option>
                    <option value="Hóa">Hóa</option>
                    <option value="Sinh">Sinh</option>
                  </select>
                </div>

                {/* Submit button inside the form */}
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={pendingRequests.length > 0 || submitting}
                  style={{
                    backgroundColor: submitting ? "#cccccc" : "#4CAF50",
                    cursor:
                      submitting || pendingRequests.length > 0
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {submitting ? "Đang gửi..." : "Gửi yêu cầu cập nhật"}
                </button>
              </form>

              {/* Direct button outside the form as a backup */}
              <div
                className="form-actions"
                style={{ marginTop: "20px", textAlign: "center" }}
              >
                <button
                  onClick={handleUpdateButtonClick}
                  className="btn-direct-submit"
                  disabled={pendingRequests.length > 0 || submitting}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: submitting ? "#cccccc" : "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor:
                      submitting || pendingRequests.length > 0
                        ? "not-allowed"
                        : "pointer",
                    display: "none", // Hidden by default, only shown if needed
                  }}
                >
                  {submitting ? "Đang gửi..." : "Gửi yêu cầu (Nút dự phòng)"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
