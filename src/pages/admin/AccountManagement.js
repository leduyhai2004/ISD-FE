"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import FormModal from "../../components/admin/FormModal";
import ConfirmModal from "../../components/admin/ConfirmModal";
import UserAvatar from "../../components/UserAvatar";
import {
  getAllTeacherAccounts,
  createTeacherAccount,
  resetTeacherPassword,
  deleteTeacherAccount,
} from "../../api/mockAuth";
import "../../styles/admin/AccountManagement.css";
import "../../styles/form-validation.css";
import { useFormValidation } from "../../components/FormValidation";
import InputField from "../../components/InputField";

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    teacherName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [resetPasswordData, setResetPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const { errors, validateUsername, validatePassword, validateForm, setError } =
    useFormValidation();

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = () => {
    setLoading(true);
    getAllTeacherAccounts()
      .then((data) => {
        setAccounts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching accounts:", error);
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === "username") {
      validateUsername(value);
    } else if (name === "password") {
      validatePassword(value);
    }
  };

  const handleResetPasswordChange = (e) => {
    const { name, value } = e.target;
    setResetPasswordData({
      ...resetPasswordData,
      [name]: value,
    });
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 3000);
  };

  const handleAddAccount = (e) => {
    e.preventDefault();

    // Validate form
    const isUsernameValid = validateUsername(formData.username);
    const isPasswordValid = validatePassword(formData.password);

    if (!isUsernameValid || !isPasswordValid) return;

    if (formData.password !== formData.confirmPassword) {
      setError("confirmPassword", "Mật khẩu xác nhận không khớp!");
      return;
    }

    createTeacherAccount(
      formData.teacherName,
      formData.username,
      formData.password
    )
      .then((newAccount) => {
        setAccounts([...accounts, newAccount]);
        setShowAddModal(false);
        resetForm();
        showSuccess("Tạo tài khoản thành công!");
      })
      .catch((error) => {
        showError(error.message);
      });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    // Validate password
    const isValid = validatePassword(
      resetPasswordData.newPassword,
      "newPassword"
    );
    if (!isValid) return;

    if (resetPasswordData.newPassword !== resetPasswordData.confirmPassword) {
      setError("confirmNewPassword", "Mật khẩu xác nhận không khớp!");
      return;
    }

    resetTeacherPassword(currentAccount.id, resetPasswordData.newPassword)
      .then(() => {
        setShowResetModal(false);
        resetResetPasswordForm();
        showSuccess("Đặt lại mật khẩu thành công!");
      })
      .catch((error) => {
        showError(error.message);
      });
  };

  const handleDeleteAccount = () => {
    deleteTeacherAccount(currentAccount.id)
      .then(() => {
        setAccounts(
          accounts.filter((account) => account.id !== currentAccount.id)
        );
        setShowDeleteModal(false);
        showSuccess("Xóa tài khoản thành công!");
      })
      .catch((error) => {
        showError(error.message);
      });
  };

  const openResetModal = (account) => {
    setCurrentAccount(account);
    setShowResetModal(true);
  };

  const openDeleteModal = (account) => {
    setCurrentAccount(account);
    setShowDeleteModal(true);
  };

  const resetForm = () => {
    setFormData({
      teacherName: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  const resetResetPasswordForm = () => {
    setResetPasswordData({
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <AdminTopbar title="Quản lý tài khoản" />
        <div className="admin-content-body">
          <div className="account-management-header">
            <h3>Tạo tài khoản giáo viên</h3>
            <button
              className="add-account-btn"
              onClick={() => setShowAddModal(true)}
            >
              <i className="fas fa-plus"></i> Tạo tài khoản mới
            </button>
          </div>

          {successMessage && (
            <div className="alert success">{successMessage}</div>
          )}
          {errorMessage && <div className="alert error">{errorMessage}</div>}

          {loading ? (
            <div className="loading">Đang tải dữ liệu...</div>
          ) : (
            <div className="account-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Giáo viên</th>
                    <th>Tên đăng nhập</th>
                    <th>Email</th>
                    <th>Ngày tạo</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.length > 0 ? (
                    accounts.map((account) => (
                      <tr key={account.id}>
                        <td>{account.id}</td>
                        <td className="teacher-name-cell">
                          <UserAvatar name={account.name} size="sm" />
                          <span>{account.name}</span>
                        </td>
                        <td>{account.username}</td>
                        <td>{account.email}</td>
                        <td>{account.createdDate}</td>
                        <td>
                          <div className="account-actions">
                            <button
                              className="btn-reset"
                              onClick={() => openResetModal(account)}
                            >
                              <i className="fas fa-key"></i> Đặt lại mật khẩu
                            </button>
                            <button
                              className="btn-delete"
                              onClick={() => openDeleteModal(account)}
                            >
                              <i className="fas fa-trash-alt"></i> Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-data">
                        Không có tài khoản nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Add Account Modal */}
          <FormModal
            isOpen={showAddModal}
            title="Tạo tài khoản giáo viên mới"
            onClose={() => setShowAddModal(false)}
          >
            <form onSubmit={handleAddAccount}>
              <InputField
                type="text"
                name="teacherName"
                label="Tên giáo viên"
                value={formData.teacherName}
                onChange={handleInputChange}
                placeholder="VD: Nguyễn Văn A"
                required
              />

              <InputField
                type="text"
                name="username"
                label="Tên đăng nhập"
                value={formData.username}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="VD: teachera"
                error={errors.username}
                required
              />
              <div className="form-hint">
                Tên đăng nhập chỉ được chứa chữ cái tiếng Anh viết thường, số và
                dấu gạch dưới
              </div>

              <InputField
                type="password"
                name="password"
                label="Mật khẩu"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={errors.password}
                required
              />

              <InputField
                type="password"
                name="confirmPassword"
                label="Xác nhận mật khẩu"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
                required
              />

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowAddModal(false)}
                >
                  Hủy
                </button>
                <button type="submit" className="btn-submit">
                  Tạo tài khoản
                </button>
              </div>
            </form>
          </FormModal>

          {/* Reset Password Modal */}
          <FormModal
            isOpen={showResetModal}
            title={`Đặt lại mật khẩu cho ${currentAccount?.name}`}
            onClose={() => setShowResetModal(false)}
          >
            <form onSubmit={handleResetPassword}>
              <InputField
                type="password"
                name="newPassword"
                label="Mật khẩu mới"
                value={resetPasswordData.newPassword}
                onChange={handleResetPasswordChange}
                error={errors.newPassword}
                required
              />

              <InputField
                type="password"
                name="confirmPassword"
                label="Xác nhận mật khẩu"
                value={resetPasswordData.confirmPassword}
                onChange={handleResetPasswordChange}
                error={errors.confirmNewPassword}
                required
              />

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowResetModal(false)}
                >
                  Hủy
                </button>
                <button type="submit" className="btn-submit">
                  Đặt lại mật khẩu
                </button>
              </div>
            </form>
          </FormModal>

          {/* Delete Confirmation Modal */}
          <ConfirmModal
            isOpen={showDeleteModal}
            title="Xác nhận xóa tài khoản"
            message={`Bạn có chắc chắn muốn xóa tài khoản của ${currentAccount?.name}?`}
            onConfirm={handleDeleteAccount}
            onCancel={() => setShowDeleteModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
