"use client"

import { useState, useEffect } from "react"
import AdminSidebar from "../../components/admin/AdminSidebar"
import AdminTopbar from "../../components/admin/AdminTopbar"
import FormModal from "../../components/admin/FormModal"
import { getAllTransferRequests, approveTransferRequest, rejectTransferRequest } from "../../api/mockAdminTransfer"
import "../../styles/admin/TransferManagement.css"

const TransferManagement = () => {
  const [transferRequests, setTransferRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [currentRequest, setCurrentRequest] = useState(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    loadTransferRequests()
  }, [])

  const loadTransferRequests = () => {
    setLoading(true)
    getAllTransferRequests()
      .then((data) => {
        setTransferRequests(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching transfer requests:", error)
        setLoading(false)
      })
  }

  const handleApprove = (request) => {
    approveTransferRequest(request.id)
      .then((updatedRequest) => {
        setTransferRequests(transferRequests.map((req) => (req.id === updatedRequest.id ? updatedRequest : req)))
      })
      .catch((error) => {
        console.error("Error approving transfer request:", error)
      })
  }

  const openRejectModal = (request) => {
    setCurrentRequest(request)
    setShowRejectModal(true)
  }

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert("Vui lòng nhập lý do từ chối")
      return
    }

    rejectTransferRequest(currentRequest.id, rejectionReason)
      .then((updatedRequest) => {
        setTransferRequests(transferRequests.map((req) => (req.id === updatedRequest.id ? updatedRequest : req)))
        setShowRejectModal(false)
        setRejectionReason("")
      })
      .catch((error) => {
        console.error("Error rejecting transfer request:", error)
      })
  }

  const filteredRequests = filter === "all" ? transferRequests : transferRequests.filter((req) => req.status === filter)

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <AdminTopbar title="Quản lý chuyển công tác" />
        <div className="admin-content-body">
          <div className="transfer-management-header">
            <h3>Yêu cầu chuyển công tác</h3>
            <div className="transfer-filters">
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ duyệt</option>
                <option value="approved">Đã duyệt</option>
                <option value="rejected">Từ chối</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading">Đang tải dữ liệu...</div>
          ) : (
            <div className="transfer-table">
              <table>
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Vị trí hiện tại</th>
                    <th>Vị trí mong muốn</th>
                    <th>Lý do</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                      <tr key={request.id}>
                        <td>{request.teacherName}</td>
                        <td>{request.currentPosition}</td>
                        <td>{request.requestedPosition}</td>
                        <td>{request.reason}</td>
                        <td>
                          <span className={`status-badge ${request.status}`}>
                            {request.status === "pending"
                              ? "Đang chờ duyệt"
                              : request.status === "approved"
                                ? "Đã duyệt"
                                : "Từ chối"}
                          </span>
                        </td>
                        <td>
                          {request.status === "pending" ? (
                            <div className="action-buttons">
                              <button className="btn-approve" onClick={() => handleApprove(request)}>
                                Duyệt
                              </button>
                              <button className="btn-reject" onClick={() => openRejectModal(request)}>
                                Từ chối
                              </button>
                            </div>
                          ) : request.status === "rejected" ? (
                            <span className="rejection-reason" title={request.rejectionReason}>
                              <i className="fas fa-info-circle"></i> Lý do từ chối
                            </span>
                          ) : null}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-data">
                        Không có yêu cầu chuyển công tác nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Reject Modal */}
          <FormModal
            isOpen={showRejectModal}
            title="Từ chối yêu cầu chuyển công tác"
            onClose={() => setShowRejectModal(false)}
          >
            <div className="reject-form">
              <p>
                <strong>Giáo viên:</strong> {currentRequest?.teacherName}
              </p>
              <p>
                <strong>Vị trí hiện tại:</strong> {currentRequest?.currentPosition}
              </p>
              <p>
                <strong>Vị trí mong muốn:</strong> {currentRequest?.requestedPosition}
              </p>
              <div className="form-group">
                <label>Lý do từ chối</label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Nhập lý do từ chối yêu cầu chuyển công tác..."
                  rows={4}
                  required
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowRejectModal(false)}>
                  Hủy
                </button>
                <button type="button" className="btn-submit" onClick={handleReject}>
                  Xác nhận từ chối
                </button>
              </div>
            </div>
          </FormModal>
        </div>
      </div>
    </div>
  )
}

export default TransferManagement
