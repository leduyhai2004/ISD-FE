// src/api/mockNotifications.js

const notificationsData = [
    {
      id: 1,
      type: "Thông báo chung",
      content: "Thông báo mới về quy định nghỉ phép.",
      date: "16/3/2025",
      read: false,
    },
    {
      id: 2,
      type: "Chính sách",
      content: "Thông báo mới về quy định nghỉ phép.",
      date: "16/3/2025",
      read: true,
    },
    {
      id: 3,
      type: "Lịch trình",
      content: "Lịch dạy đã được cập nhật.",
      date: "16/3/2025",
      read: false,
    },
    {
      id: 4,
      type: "Thông báo chung",
      content: "Họp hội đồng giáo viên vào ngày 20/3/2025.",
      date: "15/3/2025",
      read: true,
    },
    {
      id: 5,
      type: "Chính sách",
      content: "Cập nhật quy định về đồng phục giáo viên.",
      date: "14/3/2025",
      read: true,
    },
  ]
  
  export function getNotifications() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...notificationsData]), 300)
    })
  }
  
  export function markAsRead(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const notification = notificationsData.find((n) => n.id === id)
        if (notification) {
          notification.read = true
        }
        resolve(true)
      }, 300)
    })
  }
  