// src/api/mockAdminLeave.js
import { leaveRequestsStore } from "./mockDataStore"

// Get all leave requests
export function getAllLeaveRequests() {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...leaveRequestsStore.requests]), 500)
  })
}

// Get pending leave requests
export function getPendingLeaveRequests() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pendingRequests = leaveRequestsStore.getRequestsByStatus("pending")
      resolve([...pendingRequests])
    }, 500)
  })
}

// Approve leave request
export function approveLeaveRequest(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const updatedRequest = leaveRequestsStore.updateRequest(Number.parseInt(id), { status: "approved" })
      if (updatedRequest) {
        resolve(updatedRequest)
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
      const updatedRequest = leaveRequestsStore.updateRequest(Number.parseInt(id), {
        status: "rejected",
        rejectionReason: reason,
      })
      if (updatedRequest) {
        resolve(updatedRequest)
      } else {
        reject(new Error("Không tìm thấy yêu cầu nghỉ phép"))
      }
    }, 500)
  })
}
