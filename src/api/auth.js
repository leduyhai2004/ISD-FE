// src/api/auth.js

// Mock login function
export function login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Replace this with your actual authentication logic
        if (email === "teacher@gmail.com" && password === "123456") {
          const user = {
            id: 1,
            email: "teacher@example.com",
            name: "Nguyễn Văn A",
            role: "teacher",
          }
          resolve(user)
        } else if (email === "admin@gmail.com" && password === "123456") {
          const user = {
            id: 2,
            email: "admin@gmail.com",
            name: "Admin System",
            role: "admin",
          }
          resolve(user)
        } else {
          reject(new Error("Thông tin đăng nhập không chính xác"))
        }
      }, 500)
    })
  }
  