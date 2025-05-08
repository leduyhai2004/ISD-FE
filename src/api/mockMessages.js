// src/api/mockMessages.js
import { messagesStore, generateId } from "./mockDataStore";
import { getCurrentUser } from "./mockAuth";

export function getMessages() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        const conversation = messagesStore.getConversationByTeacher(
          currentUser.id
        );
        if (conversation) {
          // Add sender name to each message
          const messagesWithSenders = conversation.messages.map((message) => {
            // If the message is from the current user, use their name
            if (message.senderId === currentUser.id) {
              return {
                ...message,
                senderName: currentUser.name,
              };
            }
            // Otherwise it's from admin
            return {
              ...message,
              senderName: "Admin",
            };
          });

          resolve([...messagesWithSenders]);
        } else {
          resolve([]);
        }
      } else {
        resolve([]);
      }
    }, 300);
  });
}

export function sendMessage(content) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        let conversation = messagesStore.getConversationByTeacher(
          currentUser.id
        );

        // Create conversation if it doesn't exist
        if (!conversation) {
          conversation = {
            id: generateId(messagesStore.conversations),
            teacherId: currentUser.id,
            teacherName: currentUser.name,
            unreadCount: 0,
            lastMessage: content,
            lastMessageTime: new Date()
              .toISOString()
              .replace("T", " ")
              .substring(0, 16),
            messages: [],
          };
          messagesStore.addConversation(conversation);
        }

        // Add message to conversation
        const newMessage = {
          id: generateId(conversation.messages),
          senderId: currentUser.id,
          senderName: currentUser.name,
          content,
          timestamp: new Date()
            .toISOString()
            .replace("T", " ")
            .substring(0, 16),
          read: false,
        };

        messagesStore.addMessage(conversation.id, newMessage);

        // Simulate admin response after a delay
        if (Math.random() > 0.3) {
          // 70% chance of getting a response
          setTimeout(() => {
            const adminResponses = [
              "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ xem xét yêu cầu của bạn.",
              "Vui lòng đợi trong giây lát, chúng tôi đang xử lý thông tin.",
              "Cảm ơn thông tin của bạn. Có thể cho biết thêm chi tiết không?",
              "Đã nhận được tin nhắn của bạn. Chúng tôi sẽ phản hồi sớm nhất có thể.",
              "Xin chào! Chúng tôi có thể giúp gì cho bạn?",
              "Cảm ơn bạn đã liên hệ với phòng quản lý. Yêu cầu của bạn đã được ghi nhận.",
            ];

            const adminResponse = {
              id: generateId(conversation.messages),
              senderId: "admin",
              senderName: "Admin",
              content:
                adminResponses[
                  Math.floor(Math.random() * adminResponses.length)
                ],
              timestamp: new Date()
                .toISOString()
                .replace("T", " ")
                .substring(0, 16),
              read: true,
            };

            messagesStore.addMessage(conversation.id, adminResponse);
          }, 2000 + Math.random() * 3000); // Random delay between 2-5 seconds
        }

        resolve(newMessage);
      } else {
        resolve(null);
      }
    }, 300);
  });
}
