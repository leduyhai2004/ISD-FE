// src/api/mockAuth.js
import { usersStore } from "./mockDataStore"

// Login function - now supports both email and username login
export function login(emailOrUsername, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = usersStore.users.find(
        (u) => (u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password,
      )
      if (user) {
        // Create a copy without the password
        const { password, ...userWithoutPassword } = user

        // Store user in localStorage
        localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))

        resolve(userWithoutPassword)
      } else {
        reject(new Error("Email/tên đăng nhập hoặc mật khẩu không chính xác"))
      }
    }, 500)
  })
}

// Check if user is logged in
export function getCurrentUser() {
  const userStr = localStorage.getItem("currentUser")
  return userStr ? JSON.parse(userStr) : null
}

// Logout function
export function logout() {
  localStorage.removeItem("currentUser")
  return Promise.resolve()
}

// Check if user is admin
export function isAdmin() {
  const user = getCurrentUser()
  return user && user.role === "admin"
}

// Create new teacher account
export function createTeacherAccount(teacherName, username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if username already exists
      if (usersStore.users.some((user) => user.username === username)) {
        reject(new Error("Tên đăng nhập đã tồn tại"))
        return
      }

      const newUser = {
        id: usersStore.users.length + 1,
        email: `${username}@example.com`, // Generate an email
        username,
        password,
        name: teacherName,
        role: "teacher",
        position: "Giáo Viên",
        avatar: "/placeholder.svg?height=80&width=80",
        createdDate: new Date().toLocaleDateString("vi-VN"),
      }

      // Add the new user to the users store
      usersStore.addUser(newUser)

      // Return without password
      const { password: _, ...userWithoutPassword } = newUser
      resolve(userWithoutPassword)
    }, 500)
  })
}

// Get all teacher accounts
export function getAllTeacherAccounts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const teacherAccounts = usersStore.users
        .filter((user) => user.role === "teacher")
        .map(({ password, ...userWithoutPassword }) => userWithoutPassword)

      resolve(teacherAccounts)
    }, 500)
  })
}

// Reset teacher password
export function resetTeacherPassword(id, newPassword) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = usersStore.users.findIndex((user) => user.id === Number(id) && user.role === "teacher")
      if (index !== -1) {
        usersStore.updateUser(id, { password: newPassword })
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
      const user = usersStore.getUserById(id)
      if (user && user.role === "teacher") {
        const deletedUser = usersStore.removeUser(id)
        const { password, ...userWithoutPassword } = deletedUser
        resolve(userWithoutPassword)
      } else {
        reject(new Error("Không tìm thấy tài khoản"))
      }
    }, 500)
  })
}
