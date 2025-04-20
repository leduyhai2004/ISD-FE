"use client"

import { useState, useEffect } from "react"
import AdminSidebar from "../../components/admin/AdminSidebar"
import AdminTopbar from "../../components/admin/AdminTopbar"
import DataTable from "../../components/admin/DataTable"
import FormModal from "../../components/admin/FormModal"
import ConfirmModal from "../../components/admin/ConfirmModal"
import UserAvatar from "../../components/UserAvatar"
import { getTeachers, addTeacher, updateTeacher, deleteTeacher } from "../../api/mockTeachers"
import { useDataSync } from "../../components/DataSyncProvider"
import "../../styles/admin/TeacherManagement.css"

const TeacherManagement = () => {
  const { lastUpdate } = useDataSync()
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentTeacher, setCurrentTeacher] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
    emergencyContact: "",
    joinDate: "",
    degree: "",
    subject: "Toán", // Default subject
  })

  useEffect(() => {
    loadTeachers()
  }, [lastUpdate.users]) // Reload when users data changes

  const loadTeachers = () => {
    setLoading(true)
    getTeachers()
      .then((data) => {
        setTeachers(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error)
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

  const handleAddTeacher = (e) => {
    e.preventDefault()
    addTeacher(formData)
      .then((newTeacher) => {
        setTeachers([...teachers, newTeacher])
        setShowAddModal(false)
        resetForm()
        showSuccessMessage("Thêm giáo viên thành công!")
      })
      .catch((error) => {
        console.error("Error adding teacher:", error)
      })
  }

  const handleEditTeacher = (e) => {
    e.preventDefault()
    updateTeacher(currentTeacher.id, formData)
      .then((updatedTeacher) => {
        setTeachers(teachers.map((t) => (t.id === updatedTeacher.id ? updatedTeacher : t)))
        setShowEditModal(false)
        resetForm()
        showSuccessMessage("Cập nhật thông tin giáo viên thành công!")
      })
      .catch((error) => {
        console.error("Error updating teacher:", error)
      })
  }

  const handleDeleteTeacher = () => {
    deleteTeacher(currentTeacher.id)
      .then(() => {
        setTeachers(teachers.filter((t) => t.id !== currentTeacher.id))
        setShowDeleteModal(false)
        showSuccessMessage("Xóa giáo viên thành công!")
      })
      .catch((error) => {
        console.error("Error deleting teacher:", error)
      })
  }

  const openViewModal = (teacher) => {
    setCurrentTeacher(teacher)
    setShowViewModal(true)
  }

  const openEditModal = (teacher) => {
    setCurrentTeacher(teacher)
    setFormData({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      birthDate: teacher.birthDate || "",
      address: teacher.address || "",
      emergencyContact: teacher.emergencyContact || "",
      joinDate: teacher.joinDate,
      degree: teacher.degree || "",
      subject: teacher.subject,
    })
    setShowEditModal(true)
  }

  const openDeleteModal = (teacher) => {
    setCurrentTeacher(teacher)
    setShowDeleteModal(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      birthDate: "",
      address: "",
      emergencyContact: "",
      joinDate: "",
      degree: "",
      subject: "Toán",
    })
    setCurrentTeacher(null)
  }

  const showSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  const columns = [
    {
      key: "name",
      label: "Họ tên",
      sortable: true,
      render: (teacher) => (
        <div className="teacher-name-cell">
          <UserAvatar name={teacher.name} size="sm" />
          <span>{teacher.name}</span>
        </div>
      ),
    },
    { key: "email", label: "Email", sortable: true },
    { key: "phone", label: "Số điện thoại", sortable: true },
    { key: "subject", label: "Môn giảng dạy", sortable: true },
    { key: "joinDate", label: "Ngày vào làm", sortable: true },
    {
      key: "status",
      label: "Trạng thái",
      sortable: true,
      render: (teacher) => (
        <span className={`status-badge ${teacher.status}`}>
          {teacher.status === "active" ? "Đang làm việc" : "Nghỉ việc"}
        </span>
      ),
    },
  ]

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <AdminTopbar title="Quản lý giáo viên" />
        <div className="admin-content-body">
          <div className="teacher-management-header">
            <h3>Danh sách giáo viên</h3>
            <button className="add-teacher-btn" onClick={() => setShowAddModal(true)}>
              <i className="fas fa-plus"></i> Thêm giáo viên
            </button>
          </div>

          {successMessage && <div className="alert success">{successMessage}</div>}

          {loading ? (
            <div className="loading">Đang tải dữ liệu...</div>
          ) : (
            <DataTable
              data={teachers}
              columns={columns}
              actions={true}
              onView={openViewModal}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
            />
          )}

          {/* View Teacher Modal */}
          <FormModal isOpen={showViewModal} title="Thông tin giáo viên" onClose={() => setShowViewModal(false)}>
            {currentTeacher && (
              <div className="teacher-details">
                <div className="teacher-detail-item">
                  <span className="label">Họ và tên:</span>
                  <span className="value">{currentTeacher.name}</span>
                </div>
                <div className="teacher-detail-item">
                  <span className="label">Email:</span>
                  <span className="value">{currentTeacher.email}</span>
                </div>
                <div className="teacher-detail-item">
                  <span className="label">Số điện thoại:</span>
                  <span className="value">{currentTeacher.phone}</span>
                </div>
                <div className="teacher-detail-item">
                  <span className="label">Ngày sinh:</span>
                  <span className="value">{currentTeacher.birthDate}</span>
                </div>
                <div className="teacher-detail-item">
                  <span className="label">Địa chỉ:</span>
                  <span className="value">{currentTeacher.address}</span>
                </div>
                <div className="teacher-detail-item">
                  <span className="label">Người liên hệ khẩn cấp:</span>
                  <span className="value">{currentTeacher.emergencyContact}</span>
                </div>
                <div className="teacher-detail-item">
                  <span className="label">Ngày vào làm:</span>
                  <span className="value">{currentTeacher.joinDate}</span>
                </div>
                <div className="teacher-detail-item">
                  <span className="label">Bằng cấp:</span>
                  <span className="value">{currentTeacher.degree}</span>
                </div>
                <div className="teacher-detail-item">
                  <span className="label">Môn giảng dạy:</span>
                  <span className="value">{currentTeacher.subject}</span>
                </div>
                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={() => setShowViewModal(false)}>
                    Đóng
                  </button>
                </div>
              </div>
            )}
          </FormModal>

          {/* Add Teacher Modal */}
          <FormModal isOpen={showAddModal} title="Thêm Giáo Viên" onClose={() => setShowAddModal(false)}>
            <form onSubmit={handleAddTeacher} className="teacher-form">
              <div className="form-group">
                <label>Họ và Tên *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>

              <div className="form-group">
                <label>Ngày Sinh *</label>
                <div className="date-input-container">
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    required
                  />
                  <i className="fas fa-calendar"></i>
                </div>
              </div>

              <div className="form-group">
                <label>Số điện thoại *</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Nhập email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Địa chỉ *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Nhập địa chỉ"
                  required
                />
              </div>

              <div className="form-group">
                <label>Người liên hệ khẩn cấp *</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  placeholder="Tên - Mối quan hệ - SĐT"
                  required
                />
              </div>

              <div className="form-group">
                <label>Ngày bắt đầu *</label>
                <div className="date-input-container">
                  <input type="date" name="joinDate" value={formData.joinDate} onChange={handleInputChange} required />
                  <i className="fas fa-calendar"></i>
                </div>
              </div>

              <div className="form-group">
                <label>Bằng cấp</label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  placeholder="Nhập bằng cấp"
                />
              </div>

              <div className="form-group">
                <label>Môn giảng dạy *</label>
                <select name="subject" value={formData.subject} onChange={handleInputChange} required>
                  <option value="Toán">Toán</option>
                  <option value="Văn">Văn</option>
                  <option value="Anh">Anh</option>
                  <option value="Lý">Lý</option>
                  <option value="Hóa">Hóa</option>
                  <option value="Sinh">Sinh</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn-submit">
                  Lưu
                </button>
              </div>
            </form>
          </FormModal>

          {/* Edit Teacher Modal */}
          <FormModal isOpen={showEditModal} title="Sửa Giáo Viên" onClose={() => setShowEditModal(false)}>
            <form onSubmit={handleEditTeacher} className="teacher-form">
              <div className="form-group">
                <label>Họ và Tên *</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label>Ngày Sinh *</label>
                <div className="date-input-container">
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    required
                  />
                  <i className="fas fa-calendar"></i>
                </div>
              </div>

              <div className="form-group">
                <label>Số điện thoại *</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label>Địa chỉ *</label>
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label>Người liên hệ khẩn cấp *</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Ngày bắt đầu *</label>
                <div className="date-input-container">
                  <input type="date" name="joinDate" value={formData.joinDate} onChange={handleInputChange} required />
                  <i className="fas fa-calendar"></i>
                </div>
              </div>

              <div className="form-group">
                <label>Bằng cấp</label>
                <input type="text" name="degree" value={formData.degree} onChange={handleInputChange} />
              </div>

              <div className="form-group">
                <label>Môn giảng dạy *</label>
                <select name="subject" value={formData.subject} onChange={handleInputChange} required>
                  <option value="Toán">Toán</option>
                  <option value="Văn">Văn</option>
                  <option value="Anh">Anh</option>
                  <option value="Lý">Lý</option>
                  <option value="Hóa">Hóa</option>
                  <option value="Sinh">Sinh</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowEditModal(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn-submit">
                  Lưu
                </button>
              </div>
            </form>
          </FormModal>

          {/* Delete Confirmation Modal */}
          <ConfirmModal
            isOpen={showDeleteModal}
            title="Xác nhận xóa"
            message={`Bạn có chắc chắn muốn xóa giáo viên ${currentTeacher?.name}?`}
            onConfirm={handleDeleteTeacher}
            onCancel={() => setShowDeleteModal(false)}
          />
        </div>
      </div>
    </div>
  )
}

export default TeacherManagement
