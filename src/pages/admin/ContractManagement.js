"use client"

import { useState, useEffect } from "react"
import AdminSidebar from "../../components/admin/AdminSidebar"
import AdminTopbar from "../../components/admin/AdminTopbar"
import FormModal from "../../components/admin/FormModal"
import ConfirmModal from "../../components/admin/ConfirmModal"
import { getAllContracts, createContract, updateContract, deleteContract } from "../../api/mockAdminContract"
import { getTeachers } from "../../api/mockTeachers"
import "../../styles/admin/ContractManagement.css"

const ContractManagement = () => {
  const [contracts, setContracts] = useState([])
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentContract, setCurrentContract] = useState(null)
  const [formData, setFormData] = useState({
    teacherId: "",
    teacherName: "",
    startDate: "",
    endDate: "",
    type: "",
    position: "",
    salary: "",
  })
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    Promise.all([getAllContracts(), getTeachers()])
      .then(([contractsData, teachersData]) => {
        setContracts(contractsData)
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

  const handleAddContract = (e) => {
    e.preventDefault()
    createContract(formData)
      .then((newContract) => {
        setContracts([...contracts, newContract])
        setShowAddModal(false)
        resetForm()
      })
      .catch((error) => {
        console.error("Error creating contract:", error)
      })
  }

  const handleEditContract = (e) => {
    e.preventDefault()
    updateContract(currentContract.id, formData)
      .then((updatedContract) => {
        setContracts(contracts.map((c) => (c.id === updatedContract.id ? updatedContract : c)))
        setShowEditModal(false)
        resetForm()
      })
      .catch((error) => {
        console.error("Error updating contract:", error)
      })
  }

  const handleDeleteContract = () => {
    deleteContract(currentContract.id)
      .then(() => {
        setContracts(contracts.filter((c) => c.id !== currentContract.id))
        setShowDeleteModal(false)
      })
      .catch((error) => {
        console.error("Error deleting contract:", error)
      })
  }

  const openEditModal = (contract) => {
    setCurrentContract(contract)
    setFormData({
      teacherId: contract.teacherId,
      teacherName: contract.teacherName,
      startDate: contract.startDate,
      endDate: contract.endDate,
      type: contract.type,
      position: contract.position,
      salary: contract.salary,
    })
    setShowEditModal(true)
  }

  const openDeleteModal = (contract) => {
    setCurrentContract(contract)
    setShowDeleteModal(true)
  }

  const resetForm = () => {
    setFormData({
      teacherId: "",
      teacherName: "",
      startDate: "",
      endDate: "",
      type: "",
      position: "",
      salary: "",
    })
    setCurrentContract(null)
  }

  const filteredContracts =
    filter === "all"
      ? contracts
      : filter === "expiring"
        ? contracts.filter((c) => {
            const endDate = new Date(c.endDate)
            const today = new Date()
            const diffTime = endDate - today
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            return diffDays <= 30 && diffDays >= 0 && c.status === "active"
          })
        : contracts.filter((c) => c.status === filter)

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <AdminTopbar title="Quản lý hợp đồng" />
        <div className="admin-content-body">
          <div className="contract-management-header">
            <h3>Danh sách hợp đồng</h3>
            <div className="contract-actions">
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">Tất cả hợp đồng</option>
                <option value="active">Đang hiệu lực</option>
                <option value="expired">Hết hạn</option>
                <option value="expiring">Sắp hết hạn (30 ngày)</option>
              </select>
              <button className="add-contract-btn" onClick={() => setShowAddModal(true)}>
                <i className="fas fa-plus"></i> Thêm hợp đồng
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading">Đang tải dữ liệu...</div>
          ) : (
            <div className="contract-table">
              <table>
                <thead>
                  <tr>
                    <th>Giáo viên</th>
                    <th>Ngày ký</th>
                    <th>Ngày hết hạn</th>
                    <th>Còn lại</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContracts.length > 0 ? (
                    filteredContracts.map((contract) => {
                      const endDate = new Date(contract.endDate)
                      const today = new Date()
                      const diffTime = endDate - today
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

                      return (
                        <tr key={contract.id}>
                          <td>{contract.teacherName}</td>
                          <td>{new Date(contract.startDate).toLocaleDateString("vi-VN")}</td>
                          <td>{new Date(contract.endDate).toLocaleDateString("vi-VN")}</td>
                          <td>
                            {contract.status === "active"
                              ? diffDays > 0
                                ? `${diffDays} ngày`
                                : "Hết hạn hôm nay"
                              : "Đã hết hạn"}
                          </td>
                          <td>
                            <span className={`status-badge ${contract.status}`}>
                              {contract.status === "active" ? "Đang hiệu lực" : "Hết hạn"}
                            </span>
                          </td>
                          <td>
                            <div className="contract-actions">
                              <button className="btn-edit" onClick={() => openEditModal(contract)}>
                                <i className="fas fa-edit"></i> Sửa
                              </button>
                              <button className="btn-delete" onClick={() => openDeleteModal(contract)}>
                                <i className="fas fa-trash-alt"></i> Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-data">
                        Không có hợp đồng nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Add Contract Modal */}
          <FormModal isOpen={showAddModal} title="Thêm hợp đồng mới" onClose={() => setShowAddModal(false)}>
            <form onSubmit={handleAddContract}>
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
                <label>Loại hợp đồng</label>
                <select name="type" value={formData.type} onChange={handleInputChange} required>
                  <option value="">-- Chọn loại hợp đồng --</option>
                  <option value="Hợp đồng 6 tháng">Hợp đồng 6 tháng</option>
                  <option value="Hợp đồng 1 năm">Hợp đồng 1 năm</option>
                  <option value="Hợp đồng 2 năm">Hợp đồng 2 năm</option>
                </select>
              </div>
              <div className="form-group">
                <label>Vị trí</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="VD: Giáo viên Toán"
                  required
                />
              </div>
              <div className="form-group">
                <label>Lương</label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  placeholder="VD: 15.000.000 VNĐ"
                  required
                />
              </div>
              <div className="form-group">
                <label>Ngày bắt đầu</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Ngày kết thúc</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} required />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn-submit">
                  Thêm hợp đồng
                </button>
              </div>
            </form>
          </FormModal>

          {/* Edit Contract Modal */}
          <FormModal isOpen={showEditModal} title="Chỉnh sửa hợp đồng" onClose={() => setShowEditModal(false)}>
            <form onSubmit={handleEditContract}>
              <div className="form-group">
                <label>Giáo viên</label>
                <input type="text" value={formData.teacherName} disabled />
              </div>
              <div className="form-group">
                <label>Loại hợp đồng</label>
                <select name="type" value={formData.type} onChange={handleInputChange} required>
                  <option value="">-- Chọn loại hợp đồng --</option>
                  <option value="Hợp đồng 6 tháng">Hợp đồng 6 tháng</option>
                  <option value="Hợp đồng 1 năm">Hợp đồng 1 năm</option>
                  <option value="Hợp đồng 2 năm">Hợp đồng 2 năm</option>
                </select>
              </div>
              <div className="form-group">
                <label>Vị trí</label>
                <input type="text" name="position" value={formData.position} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Lương</label>
                <input type="text" name="salary" value={formData.salary} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Ngày bắt đầu</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Ngày kết thúc</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} required />
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
            title="Xác nhận xóa hợp đồng"
            message={`Bạn có chắc chắn muốn xóa hợp đồng của ${currentContract?.teacherName}?`}
            onConfirm={handleDeleteContract}
            onCancel={() => setShowDeleteModal(false)}
          />
        </div>
      </div>
    </div>
  )
}

export default ContractManagement
