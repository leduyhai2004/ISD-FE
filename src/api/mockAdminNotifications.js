// src/api/mockAdminNotifications.js

// Mock notifications data
const notificationsData = [
    {
      id: 1,
      title: "Thông báo chung",
      content: "Thông báo mới về quy định nghỉ phép.",
      date: "16/04/2025",
      sentTo: "all",
      status: "sent",
    },
    {
      id: 2,
      title: "Chính sách mới",
      content: "Thông báo mới về quy định nghỉ phép.",
      date: "15/04/2025",
      sentTo: "all",
      status: "sent",
    },
    {
      id: 3,
      title: "Lịch họp",
      content: "Lịch họp hội đồng giáo viên vào ngày 25/04/2025.",
      date: "14/04/2025",
      sentTo: "all",
      status: "sent",
    },
    {
      id: 4,
      title: "Nhắc nhở",
      content: "Nhắc nhở nộp báo cáo giảng dạy tháng 4.",
      date: "13/04/2025",
      sentTo: "specific",
      recipients: [1, 2, 3],
      status: "sent",
    },
    {
      id: 5,
      title: "Thông báo nghỉ lễ",
      content: "Thông báo lịch nghỉ lễ 30/4 và 1/5.",
      date: "10/04/2025",
      sentTo: "all",
      status: "sent",
    },
  ]
  
  // Get all notifications
  export function getAllNotifications() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...notificationsData]), 500)
    })
  }
  
  // Send new notification
  export function sendNotification(notification) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newNotification = {
          id: notificationsData.length + 1,
          ...notification,
          date: new Date().toLocaleDateString("vi-VN"),
          status: "sent",
        }
        notificationsData.unshift(newNotification)
        resolve(newNotification)
      }, 500)
    })
  }
  
  // Delete notification
  export function deleteNotification(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = notificationsData.findIndex((notification) => notification.id === Number.parseInt(id))
        if (index !== -1) {
          const deletedNotification = notificationsData.splice(index, 1)[0]
          resolve(deletedNotification)
        } else {
          reject(new Error("Không tìm thấy thông báo"))
        }
      }, 500)
    })
  }
  