import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/teacher_login.css';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  navigate('/dashboard'); // sau khi login

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    // Tạm kiểm tra cứng – sẽ thay bằng API thật sau
    if (email === 'teacher@example.com' && password === '123456') {
      navigate('/dashboard');
    } else {
      setError('Thông tin đăng nhập không chính xác. Vui lòng thử lại.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-content">
          <h2>Đăng Nhập</h2>
          <p>Vui lòng nhập thông tin để truy cập hệ thống.</p>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Địa chỉ Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Nhập email"
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
                required
              />
            </div>

            <div className="form-check">
              <label>
                <input type="checkbox" />
                Ghi nhớ đăng nhập
              </label>
              <a href="#" onClick={() => alert('Liên hệ Admin')}>
                Quên mật khẩu?
              </a>
            </div>

            <button type="submit" className="btn-primary">
              Đăng Nhập
            </button>
          </form>

          <div className="text-center">
            <span>Chưa có tài khoản? </span>
            <a href="#" onClick={() => alert('Liên hệ quản trị viên')}>
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
