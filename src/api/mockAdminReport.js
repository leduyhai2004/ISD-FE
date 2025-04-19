// src/api/mockAdminReport.js

// Mock report data
const reportTypes = [
    {
      id: "attendance",
      name: "Báo cáo điểm danh",
    },
    {
      id: "leave",
      name: "Báo cáo nghỉ phép",
    },
    {
      id: "transfer",
      name: "Báo cáo chuyển công tác",
    },
    {
      id: "contract",
      name: "Báo cáo hợp đồng",
    },
  ]
  
  // Generate mock attendance report data
  function generateAttendanceReport(startDate, endDate) {
    return {
      summary: {
        totalDays: 20,
        totalTeachers: 25,
        onTimePercentage: 92,
        latePercentage: 5,
        absentPercentage: 3,
      },
      teacherStats: [
        {
          teacherId: 1,
          teacherName: "Nguyễn Văn A",
          onTime: 19,
          late: 1,
          absent: 0,
          onTimePercentage: 95,
        },
        {
          teacherId: 2,
          teacherName: "Trần Thị B",
          onTime: 18,
          late: 2,
          absent: 0,
          onTimePercentage: 90,
        },
        {
          teacherId: 3,
          teacherName: "Lê Văn C",
          onTime: 17,
          late: 2,
          absent: 1,
          onTimePercentage: 85,
        },
        {
          teacherId: 4,
          teacherName: "Phạm Thị D",
          onTime: 20,
          late: 0,
          absent: 0,
          onTimePercentage: 100,
        },
        {
          teacherId: 5,
          teacherName: "Hoàng Văn E",
          onTime: 16,
          late: 3,
          absent: 1,
          onTimePercentage: 80,
        },
      ],
      dailyStats: [
        {
          date: "01/04/2025",
          onTime: 24,
          late: 1,
          absent: 0,
        },
        {
          date: "02/04/2025",
          onTime: 23,
          late: 1,
          absent: 1,
        },
        {
          date: "03/04/2025",
          onTime: 25,
          late: 0,
          absent: 0,
        },
        {
          date: "04/04/2025",
          onTime: 22,
          late: 2,
          absent: 1,
        },
        {
          date: "05/04/2025",
          onTime: 23,
          late: 1,
          absent: 1,
        },
      ],
    }
  }
  
  // Generate mock leave report data
  function generateLeaveReport(startDate, endDate) {
    return {
      summary: {
        totalLeaveRequests: 15,
        approvedRequests: 12,
        rejectedRequests: 3,
        averageLeaveDays: 2.5,
      },
      leaveByType: [
        {
          type: "Nghỉ phép năm",
          count: 8,
          percentage: 53,
        },
        {
          type: "Nghỉ ốm",
          count: 4,
          percentage: 27,
        },
        {
          type: "Nghỉ không lương",
          count: 2,
          percentage: 13,
        },
        {
          type: "Nghỉ việc riêng",
          count: 1,
          percentage: 7,
        },
      ],
      teacherStats: [
        {
          teacherId: 1,
          teacherName: "Nguyễn Văn A",
          totalRequests: 3,
          totalDays: 5,
          remainingDays: 7,
        },
        {
          teacherId: 2,
          teacherName: "Trần Thị B",
          totalRequests: 2,
          totalDays: 3,
          remainingDays: 9,
        },
        {
          teacherId: 3,
          teacherName: "Lê Văn C",
          totalRequests: 1,
          totalDays: 2,
          remainingDays: 10,
        },
        {
          teacherId: 4,
          teacherName: "Phạm Thị D",
          totalRequests: 4,
          totalDays: 7,
          remainingDays: 5,
        },
        {
          teacherId: 5,
          teacherName: "Hoàng Văn E",
          totalRequests: 2,
          totalDays: 4,
          remainingDays: 8,
        },
      ],
    }
  }
  
  // Generate mock transfer report data
  function generateTransferReport(startDate, endDate) {
    return {
      summary: {
        totalTransferRequests: 10,
        approvedRequests: 7,
        rejectedRequests: 2,
        pendingRequests: 1,
      },
      transferByReason: [
        {
          reason: "Gần nhà hơn",
          count: 4,
          percentage: 40,
        },
        {
          reason: "Phát triển chuyên môn",
          count: 3,
          percentage: 30,
        },
        {
          reason: "Thuận tiện đi lại",
          count: 2,
          percentage: 20,
        },
        {
          reason: "Lý do khác",
          count: 1,
          percentage: 10,
        },
      ],
      transferBySchool: [
        {
          school: "Trường THPT A",
          incoming: 3,
          outgoing: 4,
          net: -1,
        },
        {
          school: "Trường THPT B",
          incoming: 4,
          outgoing: 3,
          net: 1,
        },
        {
          school: "Trường THPT C",
          incoming: 3,
          outgoing: 3,
          net: 0,
        },
      ],
    }
  }
  
  // Generate mock contract report data
  function generateContractReport(startDate, endDate) {
    return {
      summary: {
        totalContracts: 25,
        activeContracts: 22,
        expiredContracts: 3,
        expiringContracts: 5,
      },
      contractsByType: [
        {
          type: "Hợp đồng 1 năm",
          count: 15,
          percentage: 60,
        },
        {
          type: "Hợp đồng 2 năm",
          count: 7,
          percentage: 28,
        },
        {
          type: "Hợp đồng 6 tháng",
          count: 3,
          percentage: 12,
        },
      ],
      contractsByMonth: [
        {
          month: "01/2025",
          new: 3,
          expired: 1,
        },
        {
          month: "02/2025",
          new: 2,
          expired: 0,
        },
        {
          month: "03/2025",
          new: 1,
          expired: 1,
        },
        {
          month: "04/2025",
          new: 4,
          expired: 0,
        },
        {
          month: "05/2025",
          new: 2,
          expired: 1,
        },
      ],
    }
  }
  
  // Get report types
  export function getReportTypes() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...reportTypes]), 300)
    })
  }
  
  // Generate report
  export function generateReport(reportType, startDate, endDate) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let reportData = {}
  
        switch (reportType) {
          case "attendance":
            reportData = generateAttendanceReport(startDate, endDate)
            break
          case "leave":
            reportData = generateLeaveReport(startDate, endDate)
            break
          case "transfer":
            reportData = generateTransferReport(startDate, endDate)
            break
          case "contract":
            reportData = generateContractReport(startDate, endDate)
            break
          default:
            reportData = { error: "Loại báo cáo không hợp lệ" }
        }
  
        resolve({
          type: reportType,
          startDate,
          endDate,
          generatedDate: new Date().toLocaleDateString("vi-VN"),
          data: reportData,
        })
      }, 1000)
    })
  }
  