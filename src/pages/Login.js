"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/teacher_login.css";
import "../styles/form-validation.css";
import { login } from "../api/mockAuth";
import { useFormValidation } from "../components/FormValidation";
import InputField from "../components/InputField";
import { isValidGmail, isValidPhone } from "../utils/validation";

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { errors, validatePassword, setError, clearErrors } =
    useFormValidation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear errors when user types
    if (errors[name]) {
      clearErrors();
    }
  };

  const validateEmailOrUsername = (value) => {
    if (!value) {
      setError(
        "emailOrUsername",
        "Email hoặc tên đăng nhập không được để trống"
      );
      return false;
    }

    // If it looks like an email and specifically a Gmail
    if (value.includes("@")) {
      if (!isValidGmail(value)) {
        setError("emailOrUsername", "Email phải có định dạng @gmail.com");
        return false;
      }
    }
    // If it looks like a phone number
    else if (value.match(/^\d+$/)) {
      if (!isValidPhone(value)) {
        setError(
          "emailOrUsername",
          "Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số"
        );
        return false;
      }
    }

    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate form
    const isEmailOrUsernameValid = validateEmailOrUsername(
      formData.emailOrUsername
    );
    const isPasswordValid = validatePassword(formData.password);

    if (!isEmailOrUsernameValid || !isPasswordValid) {
      return;
    }

    setLoading(true);
    clearErrors();

    // Use the mock login function from the API
    login(formData.emailOrUsername, formData.password)
      .then((user) => {
        setLoading(false);
        // Check user role and navigate to appropriate dashboard
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(
          "login",
          "Thông tin đăng nhập không chính xác. Vui lòng thử lại."
        );
      });
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-content">
          <h2>Đăng Nhập</h2>
          <p>Vui lòng nhập thông tin để truy cập hệ thống.</p>

          {errors.login && (
            <div className="alert alert-danger">{errors.login}</div>
          )}

          <form onSubmit={handleLogin}>
            <InputField
              type="text"
              name="emailOrUsername"
              label="Email hoặc Tên đăng nhập"
              placeholder="Nhập email hoặc tên đăng nhập"
              value={formData.emailOrUsername}
              onChange={handleChange}
              error={errors.emailOrUsername}
              required
            />

            <InputField
              type="password"
              name="password"
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <div className="form-check">
              <label>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                Ghi nhớ đăng nhập
              </label>
              <a href="#" onClick={() => alert("Liên hệ Admin")}>
                Quên mật khẩu?
              </a>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
            </button>
          </form>

          <div className="text-center">
            <span>Chưa có tài khoản? </span>
            <a href="#" onClick={() => alert("Liên hệ quản trị viên")}>
              Đăng ký ngay
            </a>
          </div>
        </div>
      </div>

      <div className="login-right"></div>
    </div>
  );
};

export default Login;
