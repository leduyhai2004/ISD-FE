// src/api/mockAdminChat.js

// Mock chat data
const chatData = {
    conversations: [
      {
        id: 1,
        teacherId: 1,
        teacherName: "Nguyễn Văn A",
        unreadCount: 0,
        lastMessage: "Vâng, cảm ơn admin.",
        lastMessageTime: "2025-04-19 10:08:52",
        messages: [
          {
            id: 1,
            senderId: "admin",
            content: "Chào giáo viên, vui lòng kiểm tra thông báo mới.",
            timestamp: "2025-04-19 10:08:30",
            read: true,
          },
          {
            id: 2,
            senderId: 1,
            content: "Vâng, cảm ơn admin.",
            timestamp: "2025-04-19 10:08:52",
            read: true,
          },
        ],
      },
      {
        id: 2,
        teacherId: 2,
        teacherName: "Trần Thị B",
        unreadCount: 1,
        lastMessage: "Tôi cần hỗ trợ về đơn nghỉ phép.",
        lastMessageTime: "2025-04-19 09:45:10",
        messages: [
          {
            id: 1,
            senderId: 2,
            content: "Chào admin, tôi muốn hỏi về quy trình nghỉ phép.",
            timestamp: "2025-04-19 09:44:30",
            read: true,
          },
          {
            id: 2,
            senderId: "admin",
            content: "Chào cô, cô có thể vào mục Nghỉ phép để nộp đơn.",
            timestamp: "2025-04-19 09:44:52",
            read: true,
          },
          {
            id: 3,
            senderId: 2,
            content: "Tôi cần hỗ trợ về đơn nghỉ phép.",
            timestamp: "2025-04-19 09:45:10",
            read: false,
          },
        ],
      },
      {
        id: 3,
        teacherId: 3,
        teacherName: "Lê Văn C",
        unreadCount: 0,
        lastMessage: "Cảm ơn admin đã phê duyệt đơn chuyển công tác của tôi.",
        lastMessageTime: "2025-04-18 14:30:22",
        messages: [
          {
            id: 1,
            senderId: 3,
            content: "Chào admin, tôi muốn hỏi về trạng thái đơn chuyển công tác.",
            timestamp: "2025-04-18 14:29:30",
            read: true,
          },
          {
            id: 2,
            senderId: "admin",
            content: "Chào thầy, đơn của thầy đã được phê duyệt.",
            timestamp: "2025-04-18 14:30:00",
            read: true,
          },
          {
            id: 3,
            senderId: 3,
            content: "Cảm ơn admin đã phê duyệt đơn chuyển công tác của tôi.",
            timestamp: "2025-04-18 14:30:22",
            read: true,
          },
        ],
      },
    ],
  }
  
  // Get all conversations
  export function getAllConversations() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const conversations = chatData.conversations.map((conv) => ({
          id: conv.id,
          teacherId: conv.teacherId,
          teacherName: conv.teacherName,
          unreadCount: conv.unreadCount,
          lastMessage: conv.lastMessage,
          lastMessageTime: conv.lastMessageTime,
        }))
        resolve(conversations)
      }, 500)
    })
  }
  
  // Get conversation by ID
  export function getConversationById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const conversation = chatData.conversations.find((conv) => conv.id === Number.parseInt(id))
        if (conversation) {
          // Mark all messages as read
          conversation.messages.forEach((msg) => {
            if (msg.senderId !== "admin") {
              msg.read = true
            }
          })
          conversation.unreadCount = 0
          resolve({ ...conversation })
        } else {
          reject(new Error("Không tìm thấy cuộc hội thoại"))
        }
      }, 500)
    })
  }
  
  // Send message
  export function sendMessage(conversationId, content) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const conversationIndex = chatData.conversations.findIndex((conv) => conv.id === Number.parseInt(conversationId))
        if (conversationIndex !== -1) {
          const newMessage = {
            id: chatData.conversations[conversationIndex].messages.length + 1,
            senderId: "admin",
            content,
            timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
            read: false,
          }
          chatData.conversations[conversationIndex].messages.push(newMessage)
          chatData.conversations[conversationIndex].lastMessage = content
          chatData.conversations[conversationIndex].lastMessageTime = newMessage.timestamp
          resolve(newMessage)
        } else {
          reject(new Error("Không tìm thấy cuộc hội thoại"))
        }
      }, 500)
    })
  }
  
  // Create new conversation
  export function createConversation(teacherId, teacherName, initialMessage) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19)
        const newConversation = {
          id: chatData.conversations.length + 1,
          teacherId,
          teacherName,
          unreadCount: 0,
          lastMessage: initialMessage,
          lastMessageTime: timestamp,
          messages: [
            {
              id: 1,
              senderId: "admin",
              content: initialMessage,
              timestamp,
              read: false,
            },
          ],
        }
        chatData.conversations.push(newConversation)
        resolve(newConversation)
      }, 500)
    })
  }
  