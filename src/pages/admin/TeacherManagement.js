"use client"

import { useState, useEffect } from "react"
import AdminSidebar from "../../components/admin/AdminSidebar"
import AdminTopbar from "../../components/admin/AdminTopbar"
import DataTable from "../../components/admin/DataTable"
import FormModal from "../../components/admin/FormModal"
import ConfirmModal from "../../components/admin/ConfirmModal"
import { getTeachers, addTeacher, updateTeacher, deleteTeacher } from "../../api/mockTeachers"
import "../../styles/admin/TeacherManagement.css"

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentTeacher, setCurrentTeacher] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    joinDate: "",
  })

  useEffect(() => {
    loadTeachers()
  }, [])

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
      })
      .catch((error) => {
        console.error("Error deleting teacher:", error)
      })
  }

  const openEditModal = (teacher) => {
    setCurrentTeacher(teacher)
    setFormData({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      subject: teacher.subject,
      joinDate: teacher.joinDate,
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
      subject: "",
      joinDate: "",
    })
    setCurrentTeacher(null)
  }

  const columns = [
    {
      key: "name",
      label: "Họ tên",
      sortable: true,
      render: (teacher) => (
        <div className="teacher-name-cell">
          <img src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} className="teacher-avatar" />
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

          {loading ? (
            <div className="loading">Đang tải dữ liệu...</div>
          ) : (
            <DataTable
              data={teachers}
              columns={columns}
              actions={true}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
            />
          )}

          {/* Add Teacher Modal */}
          <FormModal isOpen={showAddModal} title="Thêm giáo viên mới" onClose={() => setShowAddModal(false)}>
            <form onSubmit={handleAddTeacher}>
              <div className="form-group">
                <label>Họ tên</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Số điện thoại</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Môn giảng dạy</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Ngày vào làm</label>
                <input
                  type="text"
                  name="joinDate"
                  placeholder="DD/MM/YYYY"
                  value={formData.joinDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn-submit">
                  Thêm
                </button>
              </div>
            </form>
          </FormModal>

          {/* Edit Teacher Modal */}
          <FormModal
            isOpen={showEditModal}
            title="Chỉnh sửa thông tin giáo viên"
            onClose={() => setShowEditModal(false)}
          >
            <form onSubmit={handleEditTeacher}>
              <div className="form-group">
                <label>Họ tên</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Số điện thoại</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Môn giảng dạy</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Ngày vào làm</label>
                <input
                  type="text"
                  name="joinDate"
                  placeholder="DD/MM/YYYY"
                  value={formData.joinDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowEditModal(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn-submit">
                  Cập nhật
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
