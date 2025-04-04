import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
} from "mdb-react-ui-kit";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError("Email không hợp lệ.");
      isValid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự.");
      isValid = false;
    }

    if (!isValid) return;

    try {
      const userData = await UserService.login(email, password);
      console.log(userData);
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
        navigate("/profile");
      } else {
        setError(userData.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow>
        {/* Left Side - Login Form */}
        <MDBCol
          md="6"
          className="d-flex align-items-center justify-content-center"
        >
          <MDBCard className="p-4 w-75">
            <MDBCardBody>
              <h2 className="text-primary text-center fw-bold mb-3">
                Đăng Nhập
              </h2>
              <p className="text-muted text-center">
                Vui lòng nhập thông tin để truy cập hệ thống.
              </p>
              {error && <p className="error-message">{error}</p>}
              <form onSubmit={handleSubmit}>
                <MDBInput
                  label="Địa chỉ Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mb-3"
                />
                {emailError && <p className="text-danger">{emailError}</p>}
                <MDBInput
                  label="Mật khẩu"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mb-3"
                />
                {passwordError && (
                  <p className="text-danger">{passwordError}</p>
                )}

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <MDBCheckbox label="Ghi nhớ đăng nhập" />
                  <a href="#!" className="text-primary">
                    Quên mật khẩu?
                  </a>
                </div>

                <button type="submit">Login</button>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        {/* Right Side - Blue Background */}
        <MDBCol
          md="6"
          className="d-none d-md-block vh-100"
          style={{
            backgroundImage:
              "url('https://images2.alphacoders.com/114/thumb-1920-1145107.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginPage;
