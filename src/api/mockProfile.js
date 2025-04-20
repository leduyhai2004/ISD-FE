// src/api/mockProfile.js
import { usersStore } from "./mockDataStore"
import { getCurrentUser } from "./mockAuth"

// Get current user profile
export function getUserProfile() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser()
      if (currentUser) {
        const user = usersStore.getUserById(currentUser.id)
        if (user) {
          // Return user without password
          const { password, ...userWithoutPassword } = user
          resolve(userWithoutPassword)
        } else {
          resolve(null)
        }
      } else {
        resolve(null)
      }
    }, 300)
  })
}

// Update user profile
export function updateUserProfile(profileData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const currentUser = getCurrentUser()
      if (currentUser) {
        const updatedUser = usersStore.updateUser(currentUser.id, profileData)
        if (updatedUser) {
          // Update localStorage with new user data
          const { password, ...userWithoutPassword } = updatedUser
          localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
          resolve(userWithoutPassword)
        } else {
          reject(new Error("Không thể cập nhật thông tin người dùng"))
        }
      } else {
        reject(new Error("Không tìm thấy người dùng hiện tại"))
      }
    }, 300)
  })
}
