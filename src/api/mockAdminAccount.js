// src/api/mockAdminAccount.js

// Mock teacher accounts data
const teacherAccountsData = [
    {
      id: 1,
      teacherId: 1,
      teacherName: "Nguyễn Văn A",
      username: "teacherA",
      createdDate: "01/01/2025",
    },
    {
      id: 2,
      teacherId: 2,
      teacherName: "Trần Thị B",
      username: "teacherB",
      createdDate: "15/01/2025",
    },
    {
      id: 3,
      teacherId: 3,
      teacherName: "Lê Văn C",
      username: "teacherC",
      createdDate: "20/01/2025",
    },
    {
      id: 4,
      teacherId: 4,
      teacherName: "Phạm Thị D",
      username: "teacherD",
      createdDate: "25/01/2025",
    },
    {
      id: 5,
      teacherId: 5,
      teacherName: "Hoàng Văn E",
      username: "teacherE",
      createdDate: "01/02/2025",
    },
  ]
  
  // Get all teacher accounts
  export function getAllTeacherAccounts() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...teacherAccountsData]), 500)
    })
  }
  
  // Create new teacher account
  export function createTeacherAccount(teacherName, username, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAccount = {
          id: teacherAccountsData.length + 1,
          teacherId: teacherAccountsData.length + 1,
          teacherName,
          username,
          createdDate: new Date().toLocaleDateString("vi-VN"),
        }
        teacherAccountsData.push(newAccount)
        resolve(newAccount)
      }, 500)
    })
  }
  
  // Reset teacher password
  export function resetTeacherPassword(id, newPassword) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = teacherAccountsData.findIndex((account) => account.id === Number.parseInt(id))
        if (index !== -1) {
          // In a real app, we would hash the password
          resolve({ success: true, message: "Đặt lại mật khẩu thành công" })
        } else {
          reject(new Error("Không tìm thấy tài khoản"))
        }
      }, 500)
    })
  }
  
  // Delete teacher account
  export function deleteTeacherAccount(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = teacherAccountsData.findIndex((account) => account.id === Number.parseInt(id))
        if (index !== -1) {
          const deletedAccount = teacherAccountsData.splice(index, 1)[0]
          resolve(deletedAccount)
        } else {
          reject(new Error("Không tìm thấy tài khoản"))
        }
      }, 500)
    })
  }
  