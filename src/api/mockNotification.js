// src/api/mockNotification.js
import { notificationsStore } from "./mockDataStore"
import { getCurrentUser } from "./mockAuth"

export function getNotifications() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser()
      if (currentUser) {
        const notifications = notificationsStore.getUserNotifications(currentUser.id)
        resolve([...notifications])
      } else {
        resolve([])
      }
    }, 300)
  })
}

export function markAsRead(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser()
      if (currentUser) {
        const success = notificationsStore.markUserNotificationAsRead(currentUser.id, id)
        resolve(success)
      } else {
        resolve(false)
      }
    }, 300)
  })
}
