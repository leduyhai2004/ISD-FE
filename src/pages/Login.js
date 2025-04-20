"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/teacher_login.css"
import { login } from "../api/mockAuth" // Import the login function

const Login = () => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
    rememberMe: false,
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Use the mock login function from the API
    login(formData.emailOrUsername, formData.password)
      .then((user) => {
        setLoading(false)
        // Check user role and navigate to appropriate dashboard
        if (user.role === "admin") {
          navigate("/admin")
        } else {
          navigate("/dashboard")
        }
      })
      .catch((error) => {
        setLoading(false)
        setError("Thông tin đăng nhập không chính xác. Vui lòng thử lại.")
      })
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-content">
          <h2>Đăng Nhập</h2>
          <p>Vui lòng nhập thông tin để truy cập hệ thống.</p>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="emailOrUsername">Email hoặc Tên đăng nhập</label>
              <input
                type="text"
                id="emailOrUsername"
                name="emailOrUsername"
                className="form-control"
                placeholder="Nhập email hoặc tên đăng nhập"
                value={formData.emailOrUsername}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-check">
              <label>
                <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
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
  )
}

export default Login
