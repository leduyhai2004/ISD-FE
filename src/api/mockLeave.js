// src/api/mockLeave.js

const leaveRequestsData = [
    {
      id: 1,
      type: "Nghỉ phép",
      days: 2,
      startDate: "22/04/2024",
      endDate: "24/04/2024",
      status: "Đã duyệt",
      reason: "Việc gia đình",
    },
    {
      id: 2,
      type: "Nghỉ ốm",
      days: 1,
      startDate: "22/04/2024",
      endDate: "22/04/2024",
      status: "Chờ duyệt",
      reason: "Bị cảm cúm",
    },
  ]
  
  export function getLeaveRequests() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...leaveRequestsData]), 300)
    })
  }
  
  export function submitLeaveRequest(leaveData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRequest = {
          id: leaveRequestsData.length + 1,
          ...leaveData,
          status: "Chờ duyệt",
        }
        leaveRequestsData.push(newRequest)
        resolve(newRequest)
      }, 300)
    })
  }
  