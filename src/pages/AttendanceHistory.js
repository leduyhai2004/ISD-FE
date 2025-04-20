"use client";

// src/pages/AttendanceHistory.js
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/attendance-history.css";
import { getHistory } from "../api/mockAttendance";

const AttendanceHistory = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendanceHistory();
  }, []);

  const loadAttendanceHistory = () => {
    getHistory()
      .then((data) => {
        // Sort records by date (newest first)
        const sortedRecords = [...data].sort((a, b) => {
          const dateA = a.date.split("/").reverse().join("");
          const dateB = b.date.split("/").reverse().join("");
          return dateB.localeCompare(dateA);
        });
        setRecords(sortedRecords);
        setLoading(false);
      })
      .catch(() => {
        setError(
          "Error: Không thể lấy dữ liệu điểm danh. Vui lòng thử lại sau."
        );
        setLoading(false);
      });
  };

  const filtered = records.filter(
    (r) =>
      r.date.includes(search) ||
      r.status.toLowerCase().includes(search.toLowerCase()) ||
      (r.checkIn && r.checkIn.includes(search)) ||
      (r.checkOut && r.checkOut.includes(search))
  );

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        <Topbar title="Lịch Sử Điểm Danh" />
        <div className="scroll-content">
          <div className="attendance-history-container">
            <h3 className="section-title">Lịch sử Điểm danh</h3>

            {loading ? (
              <p>Đang tải dữ liệu...</p>
            ) : error ? (
              <div className="alert error">{error}</div>
            ) : (
              <>
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo ngày, trạng thái hoặc giờ..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="attendance-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Ngày</th>
                        <th>Check in</th>
                        <th>Check out</th>
                        <th>Trạng Thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(search ? filtered : records).length > 0 ? (
                        (search ? filtered : records).map((record) => (
                          <tr key={record.id}>
                            <td>{record.date}</td>
                            <td>{record.checkIn || "--"}</td>
                            <td>{record.checkOut || "--"}</td>
                            <td>
                              <span
                                className={`status-badge ${record.status
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                              >
                                {record.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="no-data">
                            Không có dữ li��u điểm danh
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceHistory;
