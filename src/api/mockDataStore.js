// src/api/mockDataStore.js
// Central data store that acts as a single source of truth for all application data

// Import event emitter for notifying components of data changes
import { EventEmitter } from "events";

// Create event emitter instance
export const dataEvents = new EventEmitter();

// User accounts data store
export const usersStore = {
  users: [
    {
      id: 1,
      email: "teacher@gmail.com",
      username: "teacherA",
      password: "123456",
      name: "Nguyễn Văn A",
      role: "teacher",
      position: "Giáo Viên Toán",
      avatar: "/placeholder.svg?height=80&width=80",
      createdDate: "01/01/2025",
      // Additional profile fields
      birthDate: "01/01/1990",
      phone: "0123-456-789",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      emergencyContact: "Nguyễn Văn B - Cha - 0987-111-222",
      degree: "Thạc sĩ Toán học",
    },
    {
      id: 2,
      email: "admin@gmail.com",
      username: "admin",
      password: "123456",
      name: "Admin System",
      role: "admin",
      position: "Quản trị viên",
      avatar: "/placeholder.svg?height=80&width=80",
      createdDate: "01/01/2025",
    },
  ],

  // Add a user to the store
  addUser(user) {
    this.users.push(user);
    dataEvents.emit("users-updated", this.users);
    return user;
  },

  // Update a user in the store
  updateUser(id, userData) {
    const index = this.users.findIndex((user) => user.id === Number(id));
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...userData };
      dataEvents.emit("users-updated", this.users);
      return this.users[index];
    }
    return null;
  },

  // Remove a user from the store
  removeUser(id) {
    const index = this.users.findIndex((user) => user.id === Number(id));
    if (index !== -1) {
      const removedUser = this.users.splice(index, 1)[0];
      dataEvents.emit("users-updated", this.users);
      return removedUser;
    }
    return null;
  },

  // Get a user by ID
  getUserById(id) {
    return this.users.find((user) => user.id === Number(id)) || null;
  },

  // Get all users with a specific role
  getUsersByRole(role) {
    return this.users.filter((user) => user.role === role);
  },
};

// Attendance data store
export const attendanceStore = {
  records: [
    {
      id: 1,
      teacherId: 1,
      teacherName: "Nguyễn Văn Anh",
      date: "19/04/2025",
      checkIn: "7:55:12 AM",
      checkOut: "17:00:12 PM",
      status: "Đúng giờ",
    },
    {
      id: 2,
      teacherId: 2,
      teacherName: "Trần Thị B",
      date: "19/04/2025",
      checkIn: "8:10:12 AM",
      checkOut: "17:05:43 PM",
      status: "Đi muộn",
    },

    // ... other attendance records
  ],

  // User-specific attendance state
  userAttendanceState: {
    1: { status: "not_checked_in", checkInTime: "", checkOutTime: "" },
  },

  // Add a record to the store
  addRecord(record) {
    this.records.push(record);
    dataEvents.emit("attendance-updated", this.records);
    return record;
  },

  // Update a record in the store
  updateRecord(id, recordData) {
    const index = this.records.findIndex((record) => record.id === Number(id));
    if (index !== -1) {
      this.records[index] = { ...this.records[index], ...recordData };
      dataEvents.emit("attendance-updated", this.records);
      return this.records[index];
    }
    return null;
  },

  // Get records for a specific teacher
  getRecordsByTeacher(teacherId) {
    return this.records.filter(
      (record) => record.teacherId === Number(teacherId)
    );
  },

  // Get records for a specific date
  getRecordsByDate(date) {
    return this.records.filter((record) => record.date === date);
  },

  // Update user attendance state
  updateUserAttendanceState(teacherId, state) {
    this.userAttendanceState[teacherId] = state;
    dataEvents.emit("user-attendance-updated", { teacherId, state });
    return state;
  },

  // Get user attendance state
  getUserAttendanceState(teacherId) {
    return (
      this.userAttendanceState[teacherId] || {
        status: "not_checked_in",
        checkInTime: "",
        checkOutTime: "",
      }
    );
  },
};

// Leave requests data store
export const leaveRequestsStore = {
  requests: [
    {
      id: 1,
      teacherId: 1,
      teacherName: "Nguyễn Văn A",
      type: "Nghỉ phép",
      days: 2,
      startDate: "22/04/2025",
      endDate: "24/04/2025",
      reason: "Việc gia đình",
      status: "approved",
      submittedDate: "15/04/2025",
    },
    {
      id: 2,
      teacherId: 2,
      teacherName: "Trần Thị B",
      type: "Nghỉ ốm",
      days: 1,
      startDate: "22/04/2025",
      endDate: "22/04/2025",
      reason: "Bị cảm cúm",
      status: "pending",
      submittedDate: "18/04/2025",
    },
    // ... other leave requests
  ],

  // Add a request to the store
  addRequest(request) {
    this.requests.push(request);
    dataEvents.emit("leave-requests-updated", this.requests);
    return request;
  },

  // Update a request in the store
  updateRequest(id, requestData) {
    const index = this.requests.findIndex(
      (request) => request.id === Number(id)
    );
    if (index !== -1) {
      this.requests[index] = { ...this.requests[index], ...requestData };
      dataEvents.emit("leave-requests-updated", this.requests);
      return this.requests[index];
    }
    return null;
  },

  // Get requests for a specific teacher
  getRequestsByTeacher(teacherId) {
    return this.requests.filter(
      (request) => request.teacherId === Number(teacherId)
    );
  },

  // Get requests by status
  getRequestsByStatus(status) {
    return this.requests.filter((request) => request.status === status);
  },
};

// Contracts data store
export const contractsStore = {
  contracts: [
    {
      id: 1,
      teacherId: 1,
      teacherName: "Nguyễn Văn A",
      startDate: "2023-01-10",
      endDate: "2024-01-10",
      status: "active",
      type: "Hợp đồng 1 năm",
      position: "Giáo viên Toán",
      salary: "15.000.000 VNĐ",
    },
    {
      id: 2,
      teacherId: 2,
      teacherName: "Trần Thị B",
      startDate: "2023-03-05",
      endDate: "2024-02-28",
      status: "active",
      type: "Hợp đồng 1 năm",
      position: "Giáo viên Văn",
      salary: "15.000.000 VNĐ",
    },
    // ... other contracts
  ],

  // Add a contract to the store
  addContract(contract) {
    this.contracts.push(contract);
    dataEvents.emit("contracts-updated", this.contracts);
    return contract;
  },

  // Update a contract in the store
  updateContract(id, contractData) {
    const index = this.contracts.findIndex(
      (contract) => contract.id === Number(id)
    );
    if (index !== -1) {
      this.contracts[index] = { ...this.contracts[index], ...contractData };
      dataEvents.emit("contracts-updated", this.contracts);
      return this.contracts[index];
    }
    return null;
  },

  // Remove a contract from the store
  removeContract(id) {
    const index = this.contracts.findIndex(
      (contract) => contract.id === Number(id)
    );
    if (index !== -1) {
      const removedContract = this.contracts.splice(index, 1)[0];
      dataEvents.emit("contracts-updated", this.contracts);
      return removedContract;
    }
    return null;
  },

  // Get a contract by teacher ID
  getContractByTeacher(teacherId) {
    return (
      this.contracts.find(
        (contract) => contract.teacherId === Number(teacherId)
      ) || null
    );
  },

  // Get contracts by status
  getContractsByStatus(status) {
    return this.contracts.filter((contract) => contract.status === status);
  },
};

// Messages and chat data store
export const messagesStore = {
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
    // ... other conversations
  ],

  // Add a conversation to the store
  addConversation(conversation) {
    this.conversations.push(conversation);
    dataEvents.emit("conversations-updated", this.conversations);
    return conversation;
  },

  // Add a message to a conversation
  addMessage(conversationId, message) {
    const index = this.conversations.findIndex(
      (conv) => conv.id === Number(conversationId)
    );
    if (index !== -1) {
      const conversation = this.conversations[index];
      conversation.messages.push(message);
      conversation.lastMessage = message.content;
      conversation.lastMessageTime = message.timestamp;

      // Update unread count if message is from teacher to admin
      if (message.senderId !== "admin") {
        conversation.unreadCount += 1;
      }

      dataEvents.emit("conversation-updated", conversation);
      return message;
    }
    return null;
  },

  // Mark conversation as read
  markConversationAsRead(conversationId) {
    const index = this.conversations.findIndex(
      (conv) => conv.id === Number(conversationId)
    );
    if (index !== -1) {
      const conversation = this.conversations[index];
      conversation.unreadCount = 0;
      conversation.messages.forEach((msg) => {
        if (msg.senderId !== "admin") {
          msg.read = true;
        }
      });

      dataEvents.emit("conversation-updated", conversation);
      return conversation;
    }
    return null;
  },

  // Get conversation by teacher ID
  getConversationByTeacher(teacherId) {
    return (
      this.conversations.find((conv) => conv.teacherId === Number(teacherId)) ||
      null
    );
  },
};

// Notifications data store
export const notificationsStore = {
  notifications: [
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
    // ... other notifications
  ],

  // User-specific notifications
  userNotifications: {
    1: [
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
      // ... other user notifications
    ],
  },

  // Add a notification to the store
  addNotification(notification) {
    this.notifications.push(notification);

    // If notification is for all users or specific users, add to their notifications
    if (notification.sentTo === "all") {
      // Add to all teacher users
      const teacherIds = usersStore
        .getUsersByRole("teacher")
        .map((user) => user.id);
      teacherIds.forEach((teacherId) => {
        this.addUserNotification(teacherId, {
          id: this.getUserNotifications(teacherId).length + 1,
          type: notification.title,
          content: notification.content,
          date: notification.date,
          read: false,
        });
      });
    } else if (notification.sentTo === "specific" && notification.recipients) {
      // Add to specific users
      notification.recipients.forEach((teacherId) => {
        this.addUserNotification(teacherId, {
          id: this.getUserNotifications(teacherId).length + 1,
          type: notification.title,
          content: notification.content,
          date: notification.date,
          read: false,
        });
      });
    }

    dataEvents.emit("notifications-updated", this.notifications);
    return notification;
  },

  // Add a notification for a specific user
  addUserNotification(userId, notification) {
    if (!this.userNotifications[userId]) {
      this.userNotifications[userId] = [];
    }
    this.userNotifications[userId].push(notification);
    dataEvents.emit("user-notifications-updated", {
      userId,
      notifications: this.userNotifications[userId],
    });
    return notification;
  },

  // Mark a user notification as read
  markUserNotificationAsRead(userId, notificationId) {
    if (this.userNotifications[userId]) {
      const index = this.userNotifications[userId].findIndex(
        (notif) => notif.id === Number(notificationId)
      );
      if (index !== -1) {
        this.userNotifications[userId][index].read = true;
        dataEvents.emit("user-notifications-updated", {
          userId,
          notifications: this.userNotifications[userId],
        });
        return true;
      }
    }
    return false;
  },

  // Get notifications for a specific user
  getUserNotifications(userId) {
    return this.userNotifications[userId] || [];
  },
};

// Helper function to generate unique IDs
export function generateId(collection) {
  return Math.max(0, ...collection.map((item) => item.id)) + 1;
}
