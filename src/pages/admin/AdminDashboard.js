"use client"

import { useState, useEffect } from "react"
import AdminSidebar from "../../components/admin/AdminSidebar"
import AdminTopbar from "../../components/admin/AdminTopbar"
import StatsCard from "../../components/admin/StatsCard"
import ActivityList from "../../components/admin/ActivityList"
import EventsList from "../../components/admin/EventsList"
import { getDashboardStats } from "../../api/mockAdminDashboard"
import "../../styles/admin/AdminDashboard.css"

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboardStats()
      .then((data) => {
        setStats(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching dashboard stats:", error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="admin-dashboard">
        <AdminSidebar />
        <div className="admin-content">
          <AdminTopbar title="Tổng quan" />
          <div className="admin-content-body">
            <div className="loading">Đang tải dữ liệu...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <AdminTopbar title="Tổng quan" />
        <div className="admin-content-body">
          <div className="stats-cards">
            <StatsCard icon="fas fa-user-tie" count={stats.totalTeachers} label="Tổng số giáo viên" color="blue" />
            <StatsCard
              icon="fas fa-calendar-check"
              count={stats.pendingLeaveRequests}
              label="Đơn nghỉ phép chờ duyệt"
              color="orange"
            />
            <StatsCard icon="fas fa-user-clock" count={stats.todayLate} label="Đi muộn hôm nay" color="red" />
            <StatsCard icon="fas fa-user-minus" count={stats.todayAbsent} label="Vắng mặt hôm nay" color="purple" />
          </div>

          <div className="dashboard-row">
            <div className="dashboard-col">
              <div className="dashboard-card">
                <h3>Thống kê điểm danh hôm nay</h3>
                <div className="attendance-chart">
                  <div className="chart-item">
                    <div className="chart-value on-time">{stats.attendanceStats.onTime}</div>
                    <div className="chart-label">Đúng giờ</div>
                  </div>
                  <div className="chart-item">
                    <div className="chart-value late">{stats.attendanceStats.late}</div>
                    <div className="chart-label">Đi muộn</div>
                  </div>
                  <div className="chart-item">
                    <div className="chart-value absent">{stats.attendanceStats.absent}</div>
                    <div className="chart-label">Vắng mặt</div>
                  </div>
                  <div className="chart-item">
                    <div className="chart-value leave">{stats.attendanceStats.leave}</div>
                    <div className="chart-label">Nghỉ phép</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-col">
              <EventsList events={stats.upcomingEvents} />
            </div>
          </div>

          <div className="dashboard-row">
            <div className="dashboard-col">
              <ActivityList activities={stats.recentActivities} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
