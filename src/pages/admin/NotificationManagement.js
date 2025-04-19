"use client"

import { useState, useEffect } from "react"
import AdminSidebar from "../../components/admin/AdminSidebar"
import AdminTopbar from "../../components/admin/AdminTopbar"
import { getAllNotifications, sendNotification, deleteNotification } from "../../api/mockAdminNotifications"
import { getTeachers } from "../../api/mockTeachers"
import "../../styles/admin/NotificationManagement.css"

const NotificationManagement = () => {
  const [notifications, setNotifications] = useState([])
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    recipientType: "all",
    recipients: [],
    department: "",
  })
  const [showForm, setShowForm] = useState(true)

  useEffect(() => {
    Promise.all([getAllNotifications(), getTeachers()])
      .then(([notificationsData, teachersData]) => {
        setNotifications(notificationsData)
        setTeachers(teachersData)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
        setLoading(false)
      })
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleRecipientTypeChange = (e) => {
    setFormData({
      ...formData,
      recipientType: e.target.value,
      recipients: [],
      department: "",
    })
  }

  const handleDepartmentChange = (e) => {
    setFormData({
      ...formData,
      department: e.target.value,
    })
  }

  const handleSendNotification = (e) => {
    e.preventDefault()

    const notification = {
      title: formData.title,
      content: formData.content,
      sentTo: formData.recipientType,
      recipients: formData.recipientType === "specific" ? formData.recipients : [],
      department: formData.recipientType === "department" ? formData.department : "",
    }

    sendNotification(notification)
      .then((newNotification) => {
        setNotifications([newNotification, ...notifications])
        setFormData({
          title: "",
          content: "",
          recipientType: "all",
          recipients: [],
          department: "",
        })
        alert("Thông báo đã được gửi thành công!")
      })
      .catch((error) => {
        console.error("Error sending notification:", error)
        alert("Có lỗi xảy ra khi gửi thông báo!")
      })
  }

  const handleDeleteNotification = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thông báo này?")) {
      deleteNotification(id)
        .then(() => {
          setNotifications(notifications.filter((notification) => notification.id !== id))
        })
        .catch((error) => {
          console.error("Error deleting notification:", error)
        })
    }
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <AdminTopbar title="Quản lý thông báo" />
        <div className="admin-content-body">
          <div className="notification-management">
            <div className="notification-form-container">
              <h3>Gửi thông báo mới</h3>
              <form onSubmit={handleSendNotification}>
                <div className="form-group">
                  <label>Tiêu đề *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Nhập tiêu đề"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Nội dung *</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Nội dung thông báo..."
                    rows={5}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Đối tượng nhận *</label>
                  <select
                    name="recipientType"
                    value={formData.recipientType}
                    onChange={handleRecipientTypeChange}
                    required
                  >
                    <option value="all">Tất cả giáo viên</option>
                    <option value="department">Theo bộ môn/phòng ban</option>
                    <option value="specific">Giáo viên cụ thể</option>
                  </select>
                </div>

                {formData.recipientType === "department" && (
                  <div className="form-group">
                    <label>Chọn bộ môn/phòng ban *</label>
                    <select name="department" value={formData.department} onChange={handleDepartmentChange} required>
                      <option value="">-- Chọn bộ môn/phòng ban --</option>
                      <option value="Toán">Toán</option>
                      <option value="Văn">Văn</option>
                      <option value="Anh">Anh</option>
                      <option value="Lý">Lý</option>
                      <option value="Hóa">Hóa</option>
                      <option value="Sinh">Sinh</option>
                    </select>
                  </div>
                )}

                <div className="form-actions">
                  <button type="submit" className="btn-send">
                    Gửi thông báo
                  </button>
                </div>
              </form>
            </div>

            <div className="notification-list-container">
              <h3>Danh sách thông báo</h3>
              {loading ? (
                <div className="loading">Đang tải dữ liệu...</div>
              ) : (
                <table className="notification-table">
                  <thead>
                    <tr>
                      <th>Tiêu đề</th>
                      <th>Người nhận</th>
                      <th>Thời gian gửi</th>
                      <th>Nội dung</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <tr key={notification.id}>
                          <td>{notification.title}</td>
                          <td>
                            {notification.sentTo === "all"
                              ? "Tất cả giáo viên"
                              : notification.sentTo === "department"
                                ? `Bộ môn ${notification.department}`
                                : "Giáo viên cụ thể"}
                          </td>
                          <td>{notification.date}</td>
                          <td className="notification-content-cell">{notification.content}</td>
                          <td>
                            <button className="btn-delete" onClick={() => handleDeleteNotification(notification.id)}>
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="no-data">
                          Chưa có thông báo nào
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationManagement
