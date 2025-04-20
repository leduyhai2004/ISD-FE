// src/api/mockLeave.js
import { leaveRequestsStore, generateId } from "./mockDataStore"
import { getCurrentUser } from "./mockAuth"

export function getLeaveRequests() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser()
      if (currentUser) {
        const requests = leaveRequestsStore.getRequestsByTeacher(currentUser.id)
        // Format for teacher view
        const formattedRequests = requests.map((req) => ({
          id: req.id,
          type: req.type,
          days: req.days,
          startDate: req.startDate,
          endDate: req.endDate,
          status: req.status === "approved" ? "Đã duyệt" : req.status === "rejected" ? "Từ chối" : "Chờ duyệt",
          reason: req.reason,
        }))
        resolve([...formattedRequests])
      } else {
        resolve([])
      }
    }, 300)
  })
}

export function submitLeaveRequest(leaveData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser()
      if (currentUser) {
        const newRequest = {
          id: generateId(leaveRequestsStore.requests),
          teacherId: currentUser.id,
          teacherName: currentUser.name,
          ...leaveData,
          status: "pending",
          submittedDate: new Date().toLocaleDateString("vi-VN"),
        }
        leaveRequestsStore.addRequest(newRequest)
        resolve(newRequest)
      } else {
        resolve(null)
      }
    }, 300)
  })
}
