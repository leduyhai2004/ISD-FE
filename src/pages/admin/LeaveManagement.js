"use client"

import { useState, useEffect } from "react"
import AdminSidebar from "../../components/admin/AdminSidebar"
import AdminTopbar from "../../components/admin/AdminTopbar"
import DataTable from "../../components/admin/DataTable"
import FormModal from "../../components/admin/FormModal"
import { getAllLeaveRequests, approveLeaveRequest, rejectLeaveRequest } from "../../api/mockAdminLeave"
import "../../styles/admin/LeaveManagement.css"

const LeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [currentRequest, setCurrentRequest] = useState(null)
  const [rejectionReason, setRejectionReason] = useState("")

  useEffect(() => {
    loadLeaveRequests()
  }, [])

  const loadLeaveRequests = () => {
    setLoading(true)
    getAllLeaveRequests()
      .then((data) => {
        setLeaveRequests(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching leave requests:", error)
        setLoading(false)
      })
  }

  const handleApprove = (request) => {
    approveLeaveRequest(request.id)
      .then((updatedRequest) => {
        setLeaveRequests(leaveRequests.map((req) => (req.id === updatedRequest.id ? updatedRequest : req)))
      })
      .catch((error) => {
        console.error("Error approving leave request:", error)
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

    rejectLeaveRequest(currentRequest.id, rejectionReason)
      .then((updatedRequest) => {
        setLeaveRequests(leaveRequests.map((req) => (req.id === updatedRequest.id ? updatedRequest : req)))
        setShowRejectModal(false)
        setRejectionReason("")
      })
      .catch((error) => {
        console.error("Error rejecting leave request:", error)
      })
  }

  const columns = [
    { key: "teacherName", label: "Giáo viên", sortable: true },
    { key: "type", label: "Loại nghỉ", sortable: true },
    { key: "days", label: "Số ngày", sortable: true },
    { key: "startDate", label: "Ngày bắt đầu", sortable: true },
    { key: "endDate", label: "Ngày kết thúc", sortable: true },
    { key: "reason", label: "Lý do", sortable: true },
    { key: "submittedDate", label: "Ngày nộp đơn", sortable: true },
    {
      key: "status",
      label: "Trạng thái",
      sortable: true,
      render: (request) => (
        <span className={`status-badge ${request.status}`}>
          {request.status === "approved" ? "Đã duyệt" : request.status === "rejected" ? "Từ chối" : "Chờ duyệt"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Thao tác",
      sortable: false,
      render: (request) => (
        <div className="leave-actions">
          {request.status === "pending" && (
            <>
              <button className="btn-approve" onClick={() => handleApprove(request)}>
                <i className="fas fa-check"></i> Duyệt
              </button>
              <button className="btn-reject" onClick={() => openRejectModal(request)}>
                <i className="fas fa-times"></i> Từ chối
              </button>
            </>
          )}
          {request.status === "rejected" && (
            <span className="rejection-reason" title={request.rejectionReason}>
              <i className="fas fa-info-circle"></i> Lý do từ chối
            </span>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <AdminTopbar title="Quản lý nghỉ phép" />
        <div className="admin-content-body">
          <div className="leave-management-header">
            <h3>Danh sách đơn nghỉ phép</h3>
            <div className="leave-filters">
              <select defaultValue="all">
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
            <DataTable data={leaveRequests} columns={columns} />
          )}

          {/* Reject Modal */}
          <FormModal isOpen={showRejectModal} title="Từ chối đơn nghỉ phép" onClose={() => setShowRejectModal(false)}>
            <div className="reject-form">
              <p>
                <strong>Giáo viên:</strong> {currentRequest?.teacherName}
              </p>
              <p>
                <strong>Loại nghỉ:</strong> {currentRequest?.type}
              </p>
              <p>
                <strong>Thời gian:</strong> {currentRequest?.startDate} - {currentRequest?.endDate} (
                {currentRequest?.days} ngày)
              </p>
              <div className="form-group">
                <label>Lý do từ chối</label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Nhập lý do từ chối đơn nghỉ phép..."
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

export default LeaveManagement
