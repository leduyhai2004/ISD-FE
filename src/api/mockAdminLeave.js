// src/api/mockAdminLeave.js

// Mock leave requests data
const leaveRequestsData = [
    {
      id: 1,
      teacherId: 1,
      teacherName: "Nguyễn Văn A",
      type: "Nghỉ phép",
      days: 2,
      startDate: "22/04/2025",
      endDate: "24/04/2025",
      reason: "Việc gia đình",
      status: "approved",
      submittedDate: "15/04/2025",
    },
    {
      id: 2,
      teacherId: 2,
      teacherName: "Trần Thị B",
      type: "Nghỉ ốm",
      days: 1,
      startDate: "22/04/2025",
      endDate: "22/04/2025",
      reason: "Bị cảm cúm",
      status: "pending",
      submittedDate: "18/04/2025",
    },
    {
      id: 3,
      teacherId: 3,
      teacherName: "Lê Văn C",
      type: "Nghỉ không lương",
      days: 5,
      startDate: "25/04/2025",
      endDate: "30/04/2025",
      reason: "Việc cá nhân",
      status: "pending",
      submittedDate: "17/04/2025",
    },
    {
      id: 4,
      teacherId: 4,
      teacherName: "Phạm Thị D",
      type: "Nghỉ phép",
      days: 3,
      startDate: "02/05/2025",
      endDate: "05/05/2025",
      reason: "Du lịch gia đình",
      status: "rejected",
      submittedDate: "10/04/2025",
      rejectionReason: "Trùng với lịch thi học kỳ",
    },
    {
      id: 5,
      teacherId: 5,
      teacherName: "Hoàng Văn E",
      type: "Nghỉ ốm",
      days: 2,
      startDate: "19/04/2025",
      endDate: "21/04/2025",
      reason: "Khám sức khỏe định kỳ",
      status: "approved",
      submittedDate: "15/04/2025",
    },
  ]
  
  // Get all leave requests
  export function getAllLeaveRequests() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...leaveRequestsData]), 500)
    })
  }
  
  // Get pending leave requests
  export function getPendingLeaveRequests() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const pendingRequests = leaveRequestsData.filter((request) => request.status === "pending")
        resolve([...pendingRequests])
      }, 500)
    })
  }
  
  // Approve leave request
  export function approveLeaveRequest(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = leaveRequestsData.findIndex((request) => request.id === Number.parseInt(id))
        if (index !== -1) {
          leaveRequestsData[index].status = "approved"
          resolve(leaveRequestsData[index])
        } else {
          reject(new Error("Không tìm thấy yêu cầu nghỉ phép"))
        }
      }, 500)
    })
  }
  
  // Reject leave request
  export function rejectLeaveRequest(id, reason) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = leaveRequestsData.findIndex((request) => request.id === Number.parseInt(id))
        if (index !== -1) {
          leaveRequestsData[index].status = "rejected"
          leaveRequestsData[index].rejectionReason = reason
          resolve(leaveRequestsData[index])
        } else {
          reject(new Error("Không tìm thấy yêu cầu nghỉ phép"))
        }
      }, 500)
    })
  }
  