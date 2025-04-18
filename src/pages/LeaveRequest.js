"use client"

// src/pages/LeaveRequest.js
import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import "../styles/leave-request.css"
import { submitLeaveRequest } from "../api/mockLeave"

const LeaveRequest = () => {
  const [leaveType, setLeaveType] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Calculate days between dates
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

    const leaveData = {
      type: leaveType,
      startDate: formatDate(start),
      endDate: formatDate(end),
      days: diffDays,
      reason,
    }

    submitLeaveRequest(leaveData)
      .then(() => {
        setSuccess(true)
        setLeaveType("")
        setStartDate("")
        setEndDate("")
        setReason("")
        setLoading(false)

        // Reset success message after 3 seconds
        setTimeout(() => {
          setSuccess(false)
        }, 3000)
      })
      .catch((err) => {
        setError("Có lỗi xảy ra khi gửi đơn. Vui lòng thử lại.")
        setLoading(false)
      })
  }

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        <Topbar title="Nộp Đơn Nghỉ Phép" />
        <div className="scroll-content">
          <div className="leave-request-container">
            <h3 className="section-title">Đơn Nghỉ Phép</h3>

            {success && (
              <div className="alert success">Đơn nghỉ phép đã được gửi thành công và đang chờ phê duyệt.</div>
            )}

            {error && <div className="alert error">{error}</div>}

            <form onSubmit={handleSubmit} className="leave-form">
              <div className="form-group">
                <label>Loại nghỉ</label>
                <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)} required>
                  <option value="">-- Chọn loại nghỉ --</option>
                  <option value="Nghỉ phép năm">Nghỉ phép năm</option>
                  <option value="Nghỉ ốm">Nghỉ ốm</option>
                  <option value="Nghỉ không lương">Nghỉ không lương</option>
                  <option value="Nghỉ việc riêng">Nghỉ việc riêng</option>
                </select>
              </div>

              <div className="form-group">
                <label>Ngày bắt đầu</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
              </div>

              <div className="form-group">
                <label>Ngày kết thúc</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
              </div>

              <div className="form-group">
                <label>Lý do (không bắt buộc)</label>
                <textarea
                  placeholder="VD: Gia đình có việc, sức khỏe..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                ></textarea>
              </div>

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? "Đang gửi..." : "Gửi yêu cầu nghỉ"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaveRequest
