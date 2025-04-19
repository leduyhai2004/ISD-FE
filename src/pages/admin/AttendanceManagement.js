"use client"

import { useState, useEffect } from "react"
import AdminSidebar from "../../components/admin/AdminSidebar"
import AdminTopbar from "../../components/admin/AdminTopbar"
import FormModal from "../../components/admin/FormModal"
import { getAllAttendanceRecords, updateAttendanceRecord, addManualAttendance } from "../../api/mockAdminAttendance"
import { getTeachers } from "../../api/mockTeachers"
import "../../styles/admin/AttendanceManagement.css"

const AttendanceManagement = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString("vi-VN"))
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentRecord, setCurrentRecord] = useState(null)
  const [formData, setFormData] = useState({
    teacherId: "",
    teacherName: "",
    date: new Date().toLocaleDateString("vi-VN"),
    checkIn: "",
    checkOut: "",
    status: "Đúng giờ",
  })
  const [filter, setFilter] = useState({
    date: "",
    teacher: "",
    status: "",
  })

  useEffect(() => {
    Promise.all([getAllAttendanceRecords(), getTeachers()])
      .then(([attendanceData, teachersData]) => {
        setAttendanceRecords(attendanceData)
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

    // If selecting a teacher, update the teacher name
    if (name === "teacherId") {
      const selectedTeacher = teachers.find((t) => t.id === Number(value))
      if (selectedTeacher) {
        setFormData((prev) => ({
          ...prev,
          teacherName: selectedTeacher.name,
        }))
      }
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilter({
      ...filter,
      [name]: value,
    })
  }

  const handleAddAttendance = (e) => {
    e.preventDefault()
    addManualAttendance(formData)
      .then((newRecord) => {
        setAttendanceRecords([...attendanceRecords, newRecord])
        setShowAddModal(false)
        resetForm()
      })
      .catch((error) => {
        console.error("Error adding attendance record:", error)
      })
  }

  const handleEditAttendance = (e) => {
    e.preventDefault()
    updateAttendanceRecord(currentRecord.id, formData)
      .then((updatedRecord) => {
        setAttendanceRecords(
          attendanceRecords.map((record) => (record.id === updatedRecord.id ? updatedRecord : record)),
        )
        setShowEditModal(false)
        resetForm()
      })
      .catch((error) => {
        console.error("Error updating attendance record:", error)
      })
  }

  const openEditModal = (record) => {
    setCurrentRecord(record)
    setFormData({
      teacherId: record.teacherId,
      teacherName: record.teacherName,
      date: record.date,
      checkIn: record.checkIn,
      checkOut: record.checkOut,
      status: record.status,
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      teacherId: "",
      teacherName: "",
      date: new Date().toLocaleDateString("vi-VN"),
      checkIn: "",
      checkOut: "",
      status: "Đúng giờ",
    })
    setCurrentRecord(null)
  }

  const filteredRecords = attendanceRecords.filter((record) => {
    return (
      (filter.date ? record.date === filter.date : true) &&
      (filter.teacher ? record.teacherId === Number(filter.teacher) : true) &&
      (filter.status ? record.status === filter.status : true)
    )
  })

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <AdminTopbar title="Quản lý điểm danh" />
        <div className="admin-content-body">
          <div className="attendance-management-header">
            <h3>Danh sách điểm danh</h3>
            <div className="attendance-actions">
              <div className="attendance-filters">
                <input
                  type="date"
                  name="date"
                  value={filter.date}
                  onChange={handleFilterChange}
                  placeholder="Lọc theo ngày"
                />
                <select name="teacher" value={filter.teacher} onChange={handleFilterChange}>
                  <option value="">Tất cả giáo viên</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
                <select name="status" value={filter.status} onChange={handleFilterChange}>
                  <option value="">Tất cả trạng thái</option>
                  <option value="Đúng giờ">Đúng giờ</option>
                  <option value="Đi muộn">Đi muộn</option>
                  <option value="Vắng mặt">Vắng mặt</option>
                  <option value="Nghỉ phép">Nghỉ phép</option>
                </select>
              </div>
              <button className="add-attendance-btn" onClick={() => setShowAddModal(true)}>
                <i className="fas fa-plus"></i> Thêm điểm danh
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading">Đang tải dữ liệu...</div>
          ) : (
            <div className="attendance-table">
              <table>
                <thead>
                  <tr>
                    <th>Giáo viên</th>
                    <th>Ngày</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map((record) => (
                      <tr key={record.id}>
                        <td>{record.teacherName}</td>
                        <td>{record.date}</td>
                        <td>{record.checkIn || "--"}</td>
                        <td>{record.checkOut || "--"}</td>
                        <td>
                          <span className={`status-badge ${record.status.toLowerCase().replace(/\s+/g, "-")}`}>
                            {record.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn-edit" onClick={() => openEditModal(record)}>
                            <i className="fas fa-edit"></i> Sửa
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-data">
                        Không có dữ liệu điểm danh
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Add Attendance Modal */}
          <FormModal isOpen={showAddModal} title="Thêm điểm danh mới" onClose={() => setShowAddModal(false)}>
            <form onSubmit={handleAddAttendance}>
              <div className="form-group">
                <label>Giáo viên</label>
                <select name="teacherId" value={formData.teacherId} onChange={handleInputChange} required>
                  <option value="">-- Chọn giáo viên --</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Ngày</label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Giờ Check In</label>
                <input type="time" name="checkIn" value={formData.checkIn} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Giờ Check Out</label>
                <input type="time" name="checkOut" value={formData.checkOut} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Trạng thái</label>
                <select name="status" value={formData.status} onChange={handleInputChange} required>
                  <option value="Đúng giờ">Đúng giờ</option>
                  <option value="Đi muộn">Đi muộn</option>
                  <option value="Vắng mặt">Vắng mặt</option>
                  <option value="Nghỉ phép">Nghỉ phép</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn-submit">
                  Thêm điểm danh
                </button>
              </div>
            </form>
          </FormModal>

          {/* Edit Attendance Modal */}
          <FormModal isOpen={showEditModal} title="Chỉnh sửa điểm danh" onClose={() => setShowEditModal(false)}>
            <form onSubmit={handleEditAttendance}>
              <div className="form-group">
                <label>Giáo viên</label>
                <input type="text" value={formData.teacherName} disabled />
              </div>
              <div className="form-group">
                <label>Ngày</label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Giờ Check In</label>
                <input type="time" name="checkIn" value={formData.checkIn} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Giờ Check Out</label>
                <input type="time" name="checkOut" value={formData.checkOut} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Trạng thái</label>
                <select name="status" value={formData.status} onChange={handleInputChange} required>
                  <option value="Đúng giờ">Đúng giờ</option>
                  <option value="Đi muộn">Đi muộn</option>
                  <option value="Vắng mặt">Vắng mặt</option>
                  <option value="Nghỉ phép">Nghỉ phép</option>
                </select>
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
        </div>
      </div>
    </div>
  )
}

export default AttendanceManagement
