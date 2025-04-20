// src/api/mockAdminChat.js
import { messagesStore, generateId } from "./mockDataStore"

// Get all conversations
export function getAllConversations() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const conversations = messagesStore.conversations.map((conv) => ({
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
      const conversation = messagesStore.conversations.find((conv) => conv.id === Number.parseInt(id))
      if (conversation) {
        // Mark all messages as read
        messagesStore.markConversationAsRead(id)
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
      const conversation = messagesStore.conversations.find((conv) => conv.id === Number.parseInt(conversationId))
      if (conversation) {
        const newMessage = {
          id: generateId(conversation.messages),
          senderId: "admin",
          content,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
          read: false,
        }

        messagesStore.addMessage(conversationId, newMessage)
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
        id: generateId(messagesStore.conversations),
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

      messagesStore.addConversation(newConversation)
      resolve(newConversation)
    }, 500)
  })
}
