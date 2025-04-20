// src/api/mockMessages.js
import { messagesStore, generateId } from "./mockDataStore"
import { getCurrentUser } from "./mockAuth"

export function getMessages() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser()
      if (currentUser) {
        const conversation = messagesStore.getConversationByTeacher(currentUser.id)
        if (conversation) {
          resolve([...conversation.messages])
        } else {
          resolve([])
        }
      } else {
        resolve([])
      }
    }, 300)
  })
}

export function sendMessage(content) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser()
      if (currentUser) {
        let conversation = messagesStore.getConversationByTeacher(currentUser.id)

        // Create conversation if it doesn't exist
        if (!conversation) {
          conversation = {
            id: generateId(messagesStore.conversations),
            teacherId: currentUser.id,
            teacherName: currentUser.name,
            unreadCount: 0,
            lastMessage: content,
            lastMessageTime: new Date().toISOString().replace("T", " ").substring(0, 16),
            messages: [],
          }
          messagesStore.addConversation(conversation)
        }

        // Add message to conversation
        const newMessage = {
          id: conversation.messages.length + 1,
          senderId: currentUser.id,
          content,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
          read: false,
        }

        messagesStore.addMessage(conversation.id, newMessage)
        resolve(newMessage)
      } else {
        resolve(null)
      }
    }, 300)
  })
}
