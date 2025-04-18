// src/pages/Attendance.js

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/teacher_dashboard.css";

// import mock API
import { getAttendance, postAttendance } from "../api/mockAttendance";

const Attendance = () => {
  const [status, setStatus] = useState("not_checked_in");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // load initial state
  useEffect(() => {
    getAttendance()
      .then((data) => {
        setStatus(data.status);
        setCheckInTime(data.checkInTime);
        setCheckOutTime(data.checkOutTime);
      })
      .catch(() => {
        setMessage(
          "Error: Không thể lấy dữ liệu điểm danh. Vui lòng thử lại sau."
        );
        setMessageType("danger");
      });
  }, []);

  const handleCheckIn = () => {
    const now = new Date().toLocaleString();
    postAttendance({
      status: "checked_in",
      checkInTime: now,
      checkOutTime: "",
    })
      .then((data) => {
        setStatus(data.status);
        setCheckInTime(data.checkInTime);
        setMessage("Bạn đã Check In thành công!");
        setMessageType("success");
      })
      .catch(() => {
        setMessage("Xảy ra lỗi khi Check In. Vui lòng thử lại.");
        setMessageType("danger");
      });
  };

  const handleCheckOut = () => {
    const now = new Date().toLocaleString();
    postAttendance({
      status: "checked_out",
      checkInTime,
      checkOutTime: now,
    })
      .then((data) => {
        setStatus(data.status);
        setCheckOutTime(data.checkOutTime);
        setMessage("Bạn đã Check Out thành công! Dữ liệu đã được cập nhật.");
        setMessageType("success");
      })
      .catch(() => {
        setMessage("Xảy ra lỗi khi Check Out. Vui lòng thử lại.");
        setMessageType("danger");
      });
  };

  const getStatusLabel = () => {
    if (status === "not_checked_in") return "Chưa Check In";
    if (status === "checked_in") return "Đã Check In";
    if (status === "checked_out") return "Đã Check Out";
    return "";
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        <Topbar title="Check In/Out" />

        <div className="scroll-content">
          <div className="table-container">
            <h3>Điểm Danh</h3>

            {message && (
              <div className={`alert alert-${messageType}`} role="alert">
                {message}
              </div>
            )}

            <table className="table mb-3">
              <tbody>
                <tr>
                  <td>
                    <strong>Trạng thái hiện tại:</strong>
                  </td>
                  <td>{getStatusLabel()}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Thời gian Check In:</strong>
                  </td>
                  <td>{checkInTime || "--"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Thời gian Check Out:</strong>
                  </td>
                  <td>{checkOutTime || "--"}</td>
                </tr>
              </tbody>
            </table>

            <div className="d-flex gap-2">
              <button
                className="btn btn-success"
                onClick={handleCheckIn}
                disabled={status !== "not_checked_in"}
              >
                Check In
              </button>
              <button
                className="btn btn-danger"
                onClick={handleCheckOut}
                disabled={status !== "checked_in"}
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
