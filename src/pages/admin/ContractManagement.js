"use client"

import { useState, useEffect } from "react"
import AdminSidebar from "../../components/admin/AdminSidebar"
import FormModal from "../../components/admin/FormModal"
import ConfirmModal from "../../components/admin/ConfirmModal"
import {
  getAllContracts,
  createContract,
  updateContract,
  deleteContract,
  getExpiringContracts,
} from "../../api/mockAdminContract"
import { getTeachers } from "../../api/mockTeachers"
import "../../styles/admin/ContractManagement.css"

const ContractManagement = () => {
  const [contracts, setContracts] = useState([])
  const [expiringContracts, setExpiringContracts] = useState([])
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentContract, setCurrentContract] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [formData, setFormData] = useState({
    teacherId: "",
    teacherName: "",
    startDate: "",
    endDate: "",
    type: "Hợp đồng 1 năm",
    position: "",
    salary: "",
  })

  useEffect(() => {
    Promise.all([getAllContracts(), getTeachers(), getExpiringContracts(30)])
      .then(([contractsData, teachersData, expiringData]) => {
        setContracts(contractsData)
        setTeachers(teachersData)
        setExpiringContracts(expiringData)
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
        showSuccessMessage("Thêm hợp đồng thành công!")

        // Refresh expiring contracts if needed
        if (isContractExpiringSoon(newContract)) {
          setExpiringContracts([...expiringContracts, newContract])
        }
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

        // Update in expiring contracts list if present
        if (expiringContracts.some((c) => c.id === updatedContract.id)) {
          if (isContractExpiringSoon(updatedContract)) {
            setExpiringContracts(expiringContracts.map((c) => (c.id === updatedContract.id ? updatedContract : c)))
          } else {
            setExpiringContracts(expiringContracts.filter((c) => c.id !== updatedContract.id))
          }
        } else if (isContractExpiringSoon(updatedContract)) {
          setExpiringContracts([...expiringContracts, updatedContract])
        }

        setShowEditModal(false)
        resetForm()
        showSuccessMessage("Cập nhật hợp đồng thành công!")
      })
      .catch((error) => {
        console.error("Error updating contract:", error)
      })
  }

  const handleDeleteContract = () => {
    deleteContract(currentContract.id)
      .then(() => {
        setContracts(contracts.filter((c) => c.id !== currentContract.id))
        setExpiringContracts(expiringContracts.filter((c) => c.id !== currentContract.id))
        setShowDeleteModal(false)
        showSuccessMessage("Xóa hợp đồng thành công!")
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
      startDate: formatDateForInput(contract.startDate),
      endDate: formatDateForInput(contract.endDate),
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
      type: "Hợp đồng 1 năm",
      position: "",
      salary: "",
    })
    setCurrentContract(null)
  }

  const showSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  const formatDateForInput = (dateString) => {
    // Convert from DD/MM/YYYY to YYYY-MM-DD for input[type="date"]
    if (!dateString) return ""
    const [day, month, year] = dateString.split("/")
    return `${year}-${month}-${day}`
  }

  const formatDateForDisplay = (dateString) => {
    // Convert from YYYY-MM-DD to DD/MM/YYYY for display
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN")
  }

  const isContractExpiringSoon = (contract) => {
    const today = new Date()
    const endDate = new Date(contract.endDate)
    const diffTime = endDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30 && diffDays >= 0 && contract.status === "active"
  }

  const calculateDaysRemaining = (endDateStr) => {
    const today = new Date()
    const endDate = parseDate(endDateStr)
    const diffTime = endDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const parseDate = (dateStr) => {
    // Parse DD/MM/YYYY format
    const [day, month, year] = dateStr.split("/")
    return new Date(year, month - 1, day)
  }

  const filteredContracts = contracts.filter(
    (contract) =>
      contract.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <div className="contract-management-container">
          <div className="contract-management-header">
            <h2>Quản lý hợp Đồng</h2>
            <div className="contract-search">
              <input
                type="text"
                placeholder="Tìm kiếm Hợp Đồng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search"></i>
            </div>
          </div>

          {successMessage && <div className="alert success">{successMessage}</div>}

          <div className="expiring-contracts-section">
            <h3>Hợp Đồng Sắp Hết Hạn</h3>
            {expiringContracts.length === 0 ? (
              <div className="no-contracts-message">Không có hợp đồng nào sắp hết hạn</div>
            ) : (
              <div className="expiring-contracts-table">
                <table>
                  <thead>
                    <tr>
                      <th>Giáo Viên</th>
                      <th>Ngày Ký</th>
                      <th>Ngày Hết Hạn</th>
                      <th>Còn lại</th>
                      <th>Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expiringContracts.map((contract) => {
                      const daysRemaining = calculateDaysRemaining(contract.endDate)
                      return (
                        <tr key={contract.id}>
                          <td>{contract.teacherName}</td>
                          <td>{contract.startDate}</td>
                          <td>{contract.endDate}</td>
                          <td>{daysRemaining > 0 ? `${daysRemaining} ngày` : "Hết hạn hôm nay"}</td>
                          <td>
                            <span className="status-badge active">Đang hiệu lực</span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="add-contract-button-container">
            <button className="add-contract-btn" onClick={() => setShowAddModal(true)}>
              <i className="fas fa-plus"></i> Tạo Hợp Đồng
            </button>
          </div>

          <div className="contracts-list-section">
            <h3>Danh Sách Hợp Đồng</h3>
            {loading ? (
              <div className="loading">Đang tải dữ liệu...</div>
            ) : (
              <div className="contracts-table">
                <table>
                  <thead>
                    <tr>
                      <th>Giáo Viên</th>
                      <th>Ngày Ký</th>
                      <th>Ngày Hết Hạn</th>
                      <th>Trạng Thái</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContracts.length > 0 ? (
                      filteredContracts.map((contract) => (
                        <tr key={contract.id}>
                          <td>{contract.teacherName}</td>
                          <td>{contract.startDate}</td>
                          <td>{contract.endDate}</td>
                          <td>
                            <span className={`status-badge ${contract.status}`}>
                              {contract.status === "active" ? "Đang hiệu lực" : "Hết hạn"}
                            </span>
                          </td>
                          <td>
                            <div className="contract-actions">
                              <button className="btn-view" title="Xem">
                                <i className="fas fa-eye"></i>
                              </button>
                              <button className="btn-edit" title="Sửa" onClick={() => openEditModal(contract)}>
                                <i className="fas fa-edit"></i>
                              </button>
                              <button className="btn-delete" title="Xóa" onClick={() => openDeleteModal(contract)}>
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="no-data">
                          Không có hợp đồng nào
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

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
                  Lưu
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
                  Lưu
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
