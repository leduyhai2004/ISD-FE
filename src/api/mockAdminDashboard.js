// src/api/mockAdminDashboard.js

// Mock dashboard statistics
export function getDashboardStats() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalTeachers: 25,
          activeTeachers: 22,
          pendingLeaveRequests: 5,
          todayAbsent: 3,
          todayLate: 2,
          upcomingEvents: [
            {
              id: 1,
              title: "Họp hội đồng giáo viên",
              date: "25/04/2025",
              time: "14:00",
            },
            {
              id: 2,
              title: "Kỳ thi học kỳ 2",
              date: "10/05/2025",
              time: "08:00",
            },
            {
              id: 3,
              title: "Tổng kết năm học",
              date: "30/05/2025",
              time: "09:00",
            },
          ],
          recentActivities: [
            {
              id: 1,
              user: "Nguyễn Văn A",
              action: "đã check-in",
              time: "Hôm nay, 07:55",
            },
            {
              id: 2,
              user: "Trần Thị B",
              action: "đã gửi đơn nghỉ phép",
              time: "Hôm nay, 08:30",
            },
            {
              id: 3,
              user: "Admin",
              action: "đã phê duyệt đơn nghỉ phép của Lê Văn C",
              time: "Hôm qua, 15:20",
            },
            {
              id: 4,
              user: "Phạm Thị D",
              action: "đã check-out",
              time: "Hôm qua, 17:05",
            },
            {
              id: 5,
              user: "Admin",
              action: "đã thêm giáo viên mới",
              time: "18/04/2025, 10:15",
            },
          ],
          attendanceStats: {
            onTime: 18,
            late: 2,
            absent: 3,
            leave: 2,
          },
        })
      }, 500)
    })
  }
  