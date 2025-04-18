"use client"

// src/pages/CheckInOut.js
import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import "../styles/check-in-out.css"
import { getAttendance, postAttendance } from "../api/mockAttendance"

const CheckInOut = () => {
  const [status, setStatus] = useState("not_checked_in")
  const [checkInTime, setCheckInTime] = useState("")
  const [checkOutTime, setCheckOutTime] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("success")

  useEffect(() => {
    getAttendance()
      .then((data) => {
        setStatus(data.status)
        setCheckInTime(data.checkInTime)
        setCheckOutTime(data.checkOutTime)
      })
      .catch(() => {
        setMessage("Error: Không thể lấy dữ liệu điểm danh. Vui lòng thử lại sau.")
        setMessageType("error")
      })
  }, [])

  const handleCheckIn = () => {
    const now = new Date().toLocaleString()
    postAttendance({
      status: "checked_in",
      checkInTime: now,
      checkOutTime: "",
    })
      .then((data) => {
        setStatus(data.status)
        setCheckInTime(data.checkInTime)
        setMessage("Bạn đã Check In thành công!")
        setMessageType("success")

        // Clear message after 3 seconds
        setTimeout(() => {
          setMessage("")
        }, 3000)
      })
      .catch(() => {
        setMessage("Xảy ra lỗi khi Check In. Vui lòng thử lại.")
        setMessageType("error")
      })
  }

  const handleCheckOut = () => {
    const now = new Date().toLocaleString()
    postAttendance({
      status: "checked_out",
      checkInTime,
      checkOutTime: now,
    })
      .then((data) => {
        setStatus(data.status)
        setCheckOutTime(data.checkOutTime)
        setMessage("Bạn đã Check Out thành công! Dữ liệu đã được cập nhật.")
        setMessageType("success")

        // Clear message after 3 seconds
        setTimeout(() => {
          setMessage("")
        }, 3000)
      })
      .catch(() => {
        setMessage("Xảy ra lỗi khi Check Out. Vui lòng thử lại.")
        setMessageType("error")
      })
  }

  const getStatusLabel = () => {
    if (status === "not_checked_in") return "Chưa check in"
    if (status === "checked_in") return "Đã check in"
    if (status === "checked_out") return "Đã check out"
    return ""
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        <Topbar title="Check in/out" />
        <div className="scroll-content">
          <div className="check-in-out-container">
            <h3 className="section-title">Điểm danh</h3>

            {message && <div className={`alert ${messageType}`}>{message}</div>}

            <div className="attendance-status">
              <div className="status-item">
                <span className="label">Trạng thái thực hiện:</span>
                <span className="value">{getStatusLabel()}</span>
              </div>

              <div className="status-item">
                <span className="label">Thời gian check in:</span>
                <span className="value">{checkInTime || "--"}</span>
              </div>

              <div className="status-item">
                <span className="label">Thời gian check out:</span>
                <span className="value">{checkOutTime || "--"}</span>
              </div>
            </div>

            <div className="attendance-actions">
              <button className="check-in-button" onClick={handleCheckIn} disabled={status !== "not_checked_in"}>
                Check in
              </button>

              <button className="check-out-button" onClick={handleCheckOut} disabled={status !== "checked_in"}>
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckInOut
