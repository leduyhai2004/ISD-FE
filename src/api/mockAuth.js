// src/api/mockAuth.js

// The users array acts as our "database" for both admin and teacher accounts
const users = [
  {
    id: 1,
    email: "teacher@gmail.com",
    username: "teacherA",
    password: "123456",
    name: "Nguyễn Văn A",
    role: "teacher",
    position: "Giáo Viên Toán",
    avatar: "/placeholder.svg?height=80&width=80",
    createdDate: "01/01/2025",
  },
  {
    id: 2,
    email: "admin@gmail.com",
    username: "admin",
    password: "123456",
    name: "Admin System",
    role: "admin",
    position: "Quản trị viên",
    avatar: "/placeholder.svg?height=80&width=80",
    createdDate: "01/01/2025",
  },
]

// Login function checks against the same users array
export function login(emailOrUsername, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
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

// Create new teacher account - this adds the account to the users array
export function createTeacherAccount(teacherName, username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if username already exists
      if (users.some((user) => user.username === username)) {
        reject(new Error("Tên đăng nhập đã tồn tại"))
        return
      }

      const newUser = {
        id: users.length + 1,
        email: `${username}@gmail.com`, // Generate an email
        username,
        password,
        name: teacherName,
        role: "teacher",
        position: "Giáo Viên",
        avatar: "/placeholder.svg?height=80&width=80",
        createdDate: new Date().toLocaleDateString("vi-VN"),
      }

      // Add the new user to the users array
      users.push(newUser)
      console.log(users);

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
      const teacherAccounts = users
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
      const index = users.findIndex((user) => user.id === Number(id) && user.role === "teacher")
      if (index !== -1) {
        users[index].password = newPassword
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
      const index = users.findIndex((user) => user.id === Number(id) && user.role === "teacher")
      if (index !== -1) {
        const deletedUser = users.splice(index, 1)[0]
        const { password, ...userWithoutPassword } = deletedUser
        resolve(userWithoutPassword)
      } else {
        reject(new Error("Không tìm thấy tài khoản"))
      }
    }, 500)
  })
}
