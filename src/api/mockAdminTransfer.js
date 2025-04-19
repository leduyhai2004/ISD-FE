// src/api/mockAdminTransfer.js

// Mock transfer requests data
const transferRequestsData = [
    {
      id: 1,
      teacherId: 1,
      teacherName: "Nguyễn Văn A",
      currentPosition: "Trường THPT A - Bộ môn Toán",
      requestedPosition: "Trường THPT B - Bộ môn Toán",
      reason: "Gần nhà hơn",
      status: "pending",
      submittedDate: "15/04/2025",
    },
    {
      id: 2,
      teacherId: 2,
      teacherName: "Trần Thị B",
      currentPosition: "Trường THPT A - Bộ môn Văn",
      requestedPosition: "Trường THPT C - Bộ môn Văn",
      reason: "Gần chồng con",
      status: "pending",
      submittedDate: "16/04/2025",
    },
    {
      id: 3,
      teacherId: 3,
      teacherName: "Lê Văn C",
      currentPosition: "Trường THPT B - Bộ môn Lý",
      requestedPosition: "Trường THPT A - Bộ môn Lý",
      reason: "Thuận tiện đi lại",
      status: "approved",
      submittedDate: "10/04/2025",
    },
    {
      id: 4,
      teacherId: 4,
      teacherName: "Phạm Thị D",
      currentPosition: "Trường THPT C - Bộ môn Hóa",
      requestedPosition: "Trường THPT B - Bộ môn Hóa",
      reason: "Phát triển chuyên môn",
      status: "rejected",
      rejectionReason: "Thiếu giáo viên tại vị trí hiện tại",
      submittedDate: "05/04/2025",
    },
  ]
  
  // Get all transfer requests
  export function getAllTransferRequests() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...transferRequestsData]), 500)
    })
  }
  
  // Get pending transfer requests
  export function getPendingTransferRequests() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const pendingRequests = transferRequestsData.filter((request) => request.status === "pending")
        resolve([...pendingRequests])
      }, 500)
    })
  }
  
  // Approve transfer request
  export function approveTransferRequest(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = transferRequestsData.findIndex((request) => request.id === Number.parseInt(id))
        if (index !== -1) {
          transferRequestsData[index].status = "approved"
          resolve(transferRequestsData[index])
        } else {
          reject(new Error("Không tìm thấy yêu cầu chuyển công tác"))
        }
      }, 500)
    })
  }
  
  // Reject transfer request
  export function rejectTransferRequest(id, reason) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = transferRequestsData.findIndex((request) => request.id === Number.parseInt(id))
        if (index !== -1) {
          transferRequestsData[index].status = "rejected"
          transferRequestsData[index].rejectionReason = reason
          resolve(transferRequestsData[index])
        } else {
          reject(new Error("Không tìm thấy yêu cầu chuyển công tác"))
        }
      }, 500)
    })
  }
  
  // Get transfer history
  export function getTransferHistory() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const history = transferRequestsData.filter((request) => request.status !== "pending")
        resolve([...history])
      }, 500)
    })
  }
  