"use client"

import { useState, useEffect } from "react"
import AdminSidebar from "../../components/admin/AdminSidebar"
import AdminTopbar from "../../components/admin/AdminTopbar"
import { getReportTypes, generateReport } from "../../api/mockAdminReport"
import "../../styles/admin/ReportManagement.css"

const ReportManagement = () => {
  const [reportTypes, setReportTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [report, setReport] = useState(null)
  const [formData, setFormData] = useState({
    reportType: "",
    startDate: "",
    endDate: "",
  })

  useEffect(() => {
    getReportTypes()
      .then((data) => {
        setReportTypes(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching report types:", error)
        setLoading(false)
      })
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleGenerateReport = (e) => {
    e.preventDefault()
    setGenerating(true)
    setReport(null)

    generateReport(formData.reportType, formData.startDate, formData.endDate)
      .then((data) => {
        setReport(data)
        setGenerating(false)
      })
      .catch((error) => {
        console.error("Error generating report:", error)
        setGenerating(false)
      })
  }

  const renderReportContent = () => {
    if (!report) return null

    switch (report.type) {
      case "attendance":
        return renderAttendanceReport()
      case "leave":
        return renderLeaveReport()
      case "transfer":
        return renderTransferReport()
      case "contract":
        return renderContractReport()
      default:
        return <p>Không hỗ trợ loại báo cáo này</p>
    }
  }

  const renderAttendanceReport = () => {
    const { summary, teacherStats, dailyStats } = report.data

    return (
      <div className="report-content">
        <div className="report-summary">
          <h4>Tổng quan điểm danh</h4>
          <div className="summary-stats">
            <div className="summary-stat-item">
              <span className="stat-value">{summary.totalTeachers}</span>
              <span className="stat-label">Tổng số giáo viên</span>
            </div>
            <div className="summary-stat-item">
              <span className="stat-value">{summary.onTimePercentage}%</span>
              <span className="stat-label">Đúng giờ</span>
            </div>
            <div className="summary-stat-item">
              <span className="stat-value">{summary.latePercentage}%</span>
              <span className="stat-label">Đi muộn</span>
            </div>
            <div className="summary-stat-item">
              <span className="stat-value">{summary.absentPercentage}%</span>
              <span className="stat-label">Vắng mặt</span>
            </div>
          </div>
        </div>

        <div className="report-section">
          <h4>Thống kê theo giáo viên</h4>
          <table className="report-table">
            <thead>
              <tr>
                <th>Giáo viên</th>
                <th>Đúng giờ</th>
                <th>Đi muộn</th>
                <th>Vắng mặt</th>
                <th>Tỷ lệ đúng giờ</th>
              </tr>
            </thead>
            <tbody>
              {teacherStats.map((stat, index) => (
                <tr key={index}>
                  <td>{stat.teacherName}</td>
                  <td>{stat.onTime}</td>
                  <td>{stat.late}</td>
                  <td>{stat.absent}</td>
                  <td>{stat.onTimePercentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="report-section">
          <h4>Thống kê theo ngày</h4>
          <table className="report-table">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Đúng giờ</th>
                <th>Đi muộn</th>
                <th>Vắng mặt</th>
              </tr>
            </thead>
            <tbody>
              {dailyStats.map((stat, index) => (
                <tr key={index}>
                  <td>{stat.date}</td>
                  <td>{stat.onTime}</td>
                  <td>{stat.late}</td>
                  <td>{stat.absent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderLeaveReport = () => {
    const { summary, leaveByType, teacherStats } = report.data

    return (
      <div className="report-content">
        <div className="report-summary">
          <h4>Tổng quan nghỉ phép</h4>
          <div className="summary-stats">
            <div className="summary-stat-item">
              <span className="stat-value">{summary.totalLeaveRequests}</span>
              <span className="stat-label">Tổng số đơn</span>
            </div>
            <div className="summary-stat-item">
              <span className="stat-value">{summary.approvedRequests}</span>
              <span className="stat-label">Đã duyệt</span>
            </div>
            <div className="summary-stat-item">
              <span className="stat-value">{summary.rejectedRequests}</span>
              <span className="stat-label">Từ chối</span>
            </div>
            <div className="summary-stat-item">
              <span className="stat-value">{summary.averageLeaveDays}</span>
              <span className="stat-label">Trung bình ngày nghỉ</span>
            </div>
          </div>
        </div>

        <div className="report-section">
          <h4>Thống kê theo loại nghỉ</h4>
          <table className="report-table">
            <thead>
              <tr>
                <th>Loại nghỉ</th>
                <th>Số lượng</th>
                <th>Tỷ lệ</th>
              </tr>
            </thead>
            <tbody>
              {leaveByType.map((item, index) => (
                <tr key={index}>
                  <td>{item.type}</td>
                  <td>{item.count}</td>
                  <td>{item.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="report-section">
          <h4>Thống kê theo giáo viên</h4>
          <table className="report-table">
            <thead>
              <tr>
                <th>Giáo viên</th>
                <th>Số đơn</th>
                <th>Tổng ngày nghỉ</th>
                <th>Ngày nghỉ còn lại</th>
              </tr>
            </thead>
            <tbody>
              {teacherStats.map((stat, index) => (
                <tr key={index}>
                  <td>{stat.teacherName}</td>
                  <td>{stat.totalRequests}</td>
                  <td>{stat.totalDays}</td>
                  <td>{stat.remainingDays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderTransferReport = () => {
    const { summary, transferByReason, transferBySchool } = report.data

    return (
      <div className="report-content">
        <div className="report-summary">
          <h4>Tổng quan chuyển công tác</h4>
          <div className="summary-stats">
            <div className="summary-stat-item">
              <span className="stat-value">{summary.totalTransferRequests}</span>
              <span className="stat-label">Tổng số đơn</span>
            </div>
            <div className="summary-stat-item">
              <span className="stat-value">{summary.approvedRequests}</span>
              <span className="stat-label">Đã duyệt</span>
            </div>
            <div className="summary-stat-item">
              <span className="stat-value">{summary.rejectedRequests}</span>
              <span className="stat-label">Từ chối</span>
            </div>
            <div className="summary-stat-item">
              <span className="stat-value">{summary.pendingRequests}</span>
              <span className="stat-label">Đang chờ</span>
            </div>
          </div>
        </div>

        <div className="report-section">
          <h4>Thống kê theo lý do</h4>
          <table className="report-table">
            <thead>
              <tr>
                <th>Lý do</th>
                <th>Số lượng</th>
                <th>Tỷ lệ</th>
              </tr>
            </thead>
            <tbody>
              {transferByReason.map((item, index) => (
                <tr key={index}>
                  <td>{item.reason}</td>
                  <td>{item.count}</td>
                  <td>{item.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="report-section">
          <h4>Thống kê theo trường</h4>
          <table className="report-table">
            <thead>
              <tr>
                <th>Trường</th>
                <th>Chuyển đến</th>
                <th>Chuyển đi</th>
                <th>Cân đối</th>
              </tr>
            </thead>
            <tbody>
              {transferBySchool.map((item, index) => (
                <tr key={index}>
                  <td>{item.school}</td>
                  <td>{item.incoming}</td>
                  <td>{item.outgoing}</td>
                  <td>{item.net > 0 ? `+${item.net}` : item.net}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderContractReport = () => {
    const { summary, contractsByType, contractsByMonth } = report.data

    return (
      <div className="report-content">
        <div className="report-summary">
          <h4>Tổng quan hợp đồng</h4>
          <div className="summary-stats">
            <div className="summary-stat-item">
              <span className="stat-value">{summary.totalContracts}</span>
              <span className="stat-label">Tổng số hợp đồng</span>
            </div>
            <div className="summary-stat-item">
              <span className="stat-value">{summary.activeContracts}</span>
              <span className="stat-label">Đang hiệu lực</span>
            </div>
            <div className="summary-stat-item">
              <span className="stat-value">{summary.expiredContracts}</span>
              <span className="stat-label">Hết hạn</span>
            </div>
            <div className="summary-stat-item">
              <span className="stat-value">{summary.expiringContracts}</span>
              <span className="stat-label">Sắp hết hạn</span>
            </div>
          </div>
        </div>

        <div className="report-section">
          <h4>Thống kê theo loại hợp đồng</h4>
          <table className="report-table">
            <thead>
              <tr>
                <th>Loại hợp đồng</th>
                <th>Số lượng</th>
                <th>Tỷ lệ</th>
              </tr>
            </thead>
            <tbody>
              {contractsByType.map((item, index) => (
                <tr key={index}>
                  <td>{item.type}</td>
                  <td>{item.count}</td>
                  <td>{item.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="report-section">
          <h4>Thống kê theo tháng</h4>
          <table className="report-table">
            <thead>
              <tr>
                <th>Tháng</th>
                <th>Hợp đồng mới</th>
                <th>Hợp đồng hết hạn</th>
              </tr>
            </thead>
            <tbody>
              {contractsByMonth.map((item, index) => (
                <tr key={index}>
                  <td>{item.month}</td>
                  <td>{item.new}</td>
                  <td>{item.expired}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <AdminTopbar title="Tạo báo cáo quản trị" />
        <div className="admin-content-body">
          <div className="report-management">
            <div className="report-form-container">
              <h3>Chọn loại báo cáo</h3>
              {loading ? (
                <div className="loading">Đang tải dữ liệu...</div>
              ) : (
                <form onSubmit={handleGenerateReport}>
                  <div className="form-group">
                    <label>Loại báo cáo</label>
                    <select name="reportType" value={formData.reportType} onChange={handleInputChange} required>
                      <option value="">-- Chọn loại báo cáo --</option>
                      {reportTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Ngày bắt đầu</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Ngày kết thúc</label>
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} required />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-generate" disabled={generating}>
                      {generating ? "Đang tạo báo cáo..." : "Tạo báo cáo"}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="report-result-container">
              {generating ? (
                <div className="loading">Đang tạo báo cáo...</div>
              ) : report ? (
                <div className="report-result">
                  <div className="report-header">
                    <h3>{reportTypes.find((type) => type.id === report.type)?.name || "Báo cáo"}</h3>
                    <div className="report-meta">
                      <p>
                        <strong>Thời gian:</strong> {new Date(report.startDate).toLocaleDateString("vi-VN")} -{" "}
                        {new Date(report.endDate).toLocaleDateString("vi-VN")}
                      </p>
                      <p>
                        <strong>Ngày tạo:</strong> {report.generatedDate}
                      </p>
                    </div>
                    <div className="report-actions">
                      <button className="btn-export">
                        <i className="fas fa-file-pdf"></i> Xuất PDF
                      </button>
                      <button className="btn-export">
                        <i className="fas fa-file-excel"></i> Xuất Excel
                      </button>
                      <button className="btn-print">
                        <i className="fas fa-print"></i> In báo cáo
                      </button>
                    </div>
                  </div>
                  {renderReportContent()}
                </div>
              ) : (
                <div className="no-report">
                  <div className="no-report-message">
                    <i className="fas fa-chart-bar"></i>
                    <p>Chọn loại báo cáo và khoảng thời gian để tạo báo cáo</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportManagement
