"use client"

import { useState, useEffect } from "react"
import AdminSidebar from "../../components/admin/AdminSidebar"
import AdminTopbar from "../../components/admin/AdminTopbar"
import FormModal from "../../components/admin/FormModal"
import ConfirmModal from "../../components/admin/ConfirmModal"
import {
  getAllTeacherAccounts,
  createTeacherAccount,
  resetTeacherPassword,
  deleteTeacherAccount,
} from "../../api/mockAdminAccount"
import "../../styles/admin/AccountManagement.css"

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentAccount, setCurrentAccount] = useState(null)
  const [formData, setFormData] = useState({
    teacherName: "",
    username: "",
    password: "",
    confirmPassword: "",
  })
  const [resetPasswordData, setResetPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    loadAccounts()
  }, [])

  const loadAccounts = () => {
    setLoading(true)
    getAllTeacherAccounts()
      .then((data) => {
        setAccounts(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching accounts:", error)
        setLoading(false)
      })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleResetPasswordChange = (e) => {
    const { name, value } = e.target
    setResetPasswordData({
      ...resetPasswordData,
      [name]: value,
    })
  }

  const handleAddAccount = (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!")
      return
    }

    createTeacherAccount(formData.teacherName, formData.username, formData.password)
      .then((newAccount) => {
        setAccounts([...accounts, newAccount])
        setShowAddModal(false)
        resetForm()
      })
      .catch((error) => {
        console.error("Error creating account:", error)
      })
  }

  const handleResetPassword = (e) => {
    e.preventDefault()

    if (resetPasswordData.newPassword !== resetPasswordData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!")
      return
    }

    resetTeacherPassword(currentAccount.id, resetPasswordData.newPassword)
      .then(() => {
        setShowResetModal(false)
        resetResetPasswordForm()
        alert("Đặt lại mật khẩu thành công!")
      })
      .catch((error) => {
        console.error("Error resetting password:", error)
      })
  }

  const handleDeleteAccount = () => {
    deleteTeacherAccount(currentAccount.id)
      .then(() => {
        setAccounts(accounts.filter((account) => account.id !== currentAccount.id))
        setShowDeleteModal(false)
      })
      .catch((error) => {
        console.error("Error deleting account:", error)
      })
  }

  const openResetModal = (account) => {
    setCurrentAccount(account)
    setShowResetModal(true)
  }

  const openDeleteModal = (account) => {
    setCurrentAccount(account)
    setShowDeleteModal(true)
  }

  const resetForm = () => {
    setFormData({
      teacherName: "",
      username: "",
      password: "",
      confirmPassword: "",
    })
  }

  const resetResetPasswordForm = () => {
    setResetPasswordData({
      newPassword: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <AdminTopbar title="Quản lý tài khoản" />
        <div className="admin-content-body">
          <div className="account-management-header">
            <h3>Tạo tài khoản giáo viên</h3>
            <button className="add-account-btn" onClick={() => setShowAddModal(true)}>
              <i className="fas fa-plus"></i> Tạo tài khoản mới
            </button>
          </div>

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
                    <th>Ngày tạo</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.length > 0 ? (
                    accounts.map((account) => (
                      <tr key={account.id}>
                        <td>{account.id}</td>
                        <td>{account.teacherName}</td>
                        <td>{account.username}</td>
                        <td>{account.createdDate}</td>
                        <td>
                          <div className="account-actions">
                            <button className="btn-reset" onClick={() => openResetModal(account)}>
                              <i className="fas fa-key"></i> Đặt lại mật khẩu
                            </button>
                            <button className="btn-delete" onClick={() => openDeleteModal(account)}>
                              <i className="fas fa-trash-alt"></i> Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-data">
                        Không có tài khoản nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Add Account Modal */}
          <FormModal isOpen={showAddModal} title="Tạo tài khoản giáo viên mới" onClose={() => setShowAddModal(false)}>
            <form onSubmit={handleAddAccount}>
              <div className="form-group">
                <label>Tên giáo viên</label>
                <input
                  type="text"
                  name="teacherName"
                  value={formData.teacherName}
                  onChange={handleInputChange}
                  placeholder="VD: Nguyễn Văn A"
                  required
                />
              </div>
              <div className="form-group">
                <label>Tên đăng nhập</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="VD: teacherA"
                  required
                />
              </div>
              <div className="form-group">
                <label>Mật khẩu</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Xác nhận mật khẩu</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>
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
            title={`Đặt lại mật khẩu cho ${currentAccount?.teacherName}`}
            onClose={() => setShowResetModal(false)}
          >
            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <label>Mật khẩu mới</label>
                <input
                  type="password"
                  name="newPassword"
                  value={resetPasswordData.newPassword}
                  onChange={handleResetPasswordChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Xác nhận mật khẩu</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={resetPasswordData.confirmPassword}
                  onChange={handleResetPasswordChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowResetModal(false)}>
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
            message={`Bạn có chắc chắn muốn xóa tài khoản của ${currentAccount?.teacherName}?`}
            onConfirm={handleDeleteAccount}
            onCancel={() => setShowDeleteModal(false)}
          />
        </div>
      </div>
    </div>
  )
}

export default AccountManagement
