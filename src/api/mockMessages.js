// src/api/mockMessages.js

const messagesData = [
    {
      id: 1,
      sender: "admin",
      content: "Chào giáo viên, vui lòng kiểm tra thông báo mới.",
      timestamp: "2024-03-10 08:30",
      read: true,
    },
    {
      id: 2,
      sender: "user",
      content: "Vâng, cảm ơn admin.",
      timestamp: "2024-03-10 08:30",
      read: true,
    },
    {
      id: 3,
      sender: "admin",
      content: "OK.",
      timestamp: "2024-03-10 08:30",
      read: true,
    },
  ]
  
  export function getMessages() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...messagesData]), 300)
    })
  }
  
  export function sendMessage(content) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMessage = {
          id: messagesData.length + 1,
          sender: "user",
          content,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
          read: true,
        }
        messagesData.push(newMessage)
        resolve(newMessage)
      }, 300)
    })
  }
  