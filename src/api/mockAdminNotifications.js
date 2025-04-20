// src/api/mockAdminNotifications.js
import { notificationsStore, generateId } from "./mockDataStore"

// Get all notifications
export function getAllNotifications() {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...notificationsStore.notifications]), 500)
  })
}

// Send new notification
export function sendNotification(notification) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newNotification = {
        id: generateId(notificationsStore.notifications),
        ...notification,
        date: new Date().toLocaleDateString("vi-VN"),
        status: "sent",
      }

      notificationsStore.addNotification(newNotification)
      resolve(newNotification)
    }, 500)
  })
}

// Delete notification
export function deleteNotification(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = notificationsStore.notifications.findIndex(
        (notification) => notification.id === Number.parseInt(id),
      )
      if (index !== -1) {
        const deletedNotification = notificationsStore.notifications.splice(index, 1)[0]
        resolve(deletedNotification)
      } else {
        reject(new Error("Không tìm thấy thông báo"))
      }
    }, 500)
  })
}
