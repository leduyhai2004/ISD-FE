// src/api/mockAuth.js

// Mock user data
const users = [
    {
      id: 1,
      email: "teacher@example.com",
      password: "123456",
      name: "Nguyễn Văn A",
      role: "teacher",
      position: "Giáo Viên Toán",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      email: "admin@gmail.com",
      password: "123456",
      name: "Admin System",
      role: "admin",
      position: "Quản trị viên",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]
  
  // Login function
  export function login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find((u) => u.email === email && u.password === password)
        if (user) {
          // Create a copy without the password
          const { password, ...userWithoutPassword } = user
  
          // Store user in localStorage
          localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
  
          resolve(userWithoutPassword)
        } else {
          reject(new Error("Email hoặc mật khẩu không chính xác"))
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
  