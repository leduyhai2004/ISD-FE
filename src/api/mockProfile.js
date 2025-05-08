// src/api/mockProfile.js
import {
  usersStore,
  profileRequestsStore,
  notificationsStore,
  dataEvents,
} from "./mockDataStore";
import { getCurrentUser } from "./mockAuth";

// Get current user profile
export function getUserProfile() {
  return new Promise((resolve) => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      const user = usersStore.getUserById(currentUser.id);
      if (user) {
        // Return user without password
        const { password, ...userWithoutPassword } = user;
        resolve(userWithoutPassword);
      } else {
        resolve(null);
      }
    } else {
      resolve(null);
    }
  });
}

// Submit profile update request - ULTRA SIMPLIFIED VERSION
export function submitProfileUpdateRequest(profileData) {
  console.log("SUBMIT PROFILE REQUEST STARTED with data:", profileData);

  try {
    // Get current user
    const currentUser = getCurrentUser();
    if (!currentUser) {
      console.error("No current user found");
      return Promise.reject(new Error("Không tìm thấy người dùng hiện tại"));
    }

    // Get user data
    const user = usersStore.getUserById(currentUser.id);
    if (!user) {
      console.error("User not found in store");
      return Promise.reject(new Error("Không tìm thấy thông tin người dùng"));
    }

    console.log("Creating request for user:", user.name);

    // Create new request object with a unique ID
    const newRequestId =
      Math.max(0, ...profileRequestsStore.requests.map((req) => req.id)) + 1;

    const newRequest = {
      id: newRequestId,
      userId: currentUser.id,
      userName: user.name,
      currentData: { ...user },
      requestedData: { ...profileData },
      status: "pending",
      requestDate: new Date().toLocaleDateString("vi-VN"),
      responseDate: null,
      responseReason: null,
    };

    console.log("New request object created:", newRequest);

    // Directly add to requests array
    profileRequestsStore.requests.push(newRequest);
    console.log(
      "Request added directly to store. Current requests:",
      profileRequestsStore.requests
    );

    // Create admin notification
    if (!notificationsStore.userNotifications[2]) {
      notificationsStore.userNotifications[2] = [];
    }

    const adminNotifId =
      Math.max(0, ...notificationsStore.userNotifications[2].map((n) => n.id)) +
      1;
    const adminNotification = {
      id: adminNotifId,
      type: "Yêu cầu cập nhật",
      content: `Giáo viên ${user.name} đã gửi yêu cầu cập nhật thông tin cá nhân.`,
      date: new Date().toLocaleDateString("vi-VN"),
      read: false,
    };

    // Add admin notification directly
    notificationsStore.userNotifications[2].push(adminNotification);
    console.log("Admin notification created:", adminNotification);

    // Create teacher notification
    if (!notificationsStore.userNotifications[currentUser.id]) {
      notificationsStore.userNotifications[currentUser.id] = [];
    }

    const teacherNotifId =
      Math.max(
        0,
        ...notificationsStore.userNotifications[currentUser.id].map((n) => n.id)
      ) + 1;
    const teacherNotification = {
      id: teacherNotifId,
      type: "Yêu cầu cập nhật",
      content:
        "Yêu cầu cập nhật thông tin cá nhân của bạn đã được gửi và đang chờ phê duyệt.",
      date: new Date().toLocaleDateString("vi-VN"),
      read: false,
    };

    // Add teacher notification directly
    notificationsStore.userNotifications[currentUser.id].push(
      teacherNotification
    );
    console.log("Teacher notification created:", teacherNotification);

    // Emit events to notify components
    if (dataEvents) {
      dataEvents.emit(
        "profile-requests-updated",
        profileRequestsStore.requests
      );
      dataEvents.emit("user-notifications-updated", {
        userId: 2,
        notifications: notificationsStore.userNotifications[2],
      });
      dataEvents.emit("user-notifications-updated", {
        userId: currentUser.id,
        notifications: notificationsStore.userNotifications[currentUser.id],
      });
    }

    console.log("SUBMIT PROFILE REQUEST COMPLETED SUCCESSFULLY");
    return Promise.resolve(newRequest);
  } catch (error) {
    console.error("Error in submitProfileUpdateRequest:", error);
    return Promise.reject(error);
  }
}

// Get all profile update requests (for admin)
export function getAllProfileUpdateRequests() {
  console.log("Getting all profile requests:", profileRequestsStore.requests);
  return Promise.resolve([...profileRequestsStore.requests]);
}

// Get pending profile update requests (for admin)
export function getPendingProfileUpdateRequests() {
  const pendingRequests = profileRequestsStore.requests.filter(
    (request) => request.status === "pending"
  );
  console.log("Getting pending profile requests:", pendingRequests);
  return Promise.resolve([...pendingRequests]);
}

// Get profile update requests for a specific user
export function getUserProfileRequests(userId) {
  const userRequests = profileRequestsStore.requests.filter(
    (request) => request.userId === Number(userId)
  );
  console.log(`Getting profile requests for user ${userId}:`, userRequests);
  return Promise.resolve([...userRequests]);
}

// Approve profile update request (for admin)
export function approveProfileUpdateRequest(requestId) {
  try {
    const request = profileRequestsStore.requests.find(
      (req) => req.id === Number(requestId)
    );
    console.log("Approving request:", request);

    if (!request) {
      return Promise.reject(new Error("Không tìm thấy yêu cầu cập nhật"));
    }

    // Update the user profile with the requested data
    const userIndex = usersStore.users.findIndex(
      (user) => user.id === Number(request.userId)
    );
    if (userIndex === -1) {
      return Promise.reject(new Error("Không tìm thấy người dùng"));
    }

    // Update user data
    usersStore.users[userIndex] = {
      ...usersStore.users[userIndex],
      ...request.requestedData,
    };
    const updatedUser = usersStore.users[userIndex];
    console.log("User updated:", updatedUser);

    // Update request status
    const requestIndex = profileRequestsStore.requests.findIndex(
      (req) => req.id === Number(requestId)
    );
    profileRequestsStore.requests[requestIndex] = {
      ...profileRequestsStore.requests[requestIndex],
      status: "approved",
      responseDate: new Date().toLocaleDateString("vi-VN"),
    };
    const updatedRequest = profileRequestsStore.requests[requestIndex];
    console.log("Request updated:", updatedRequest);

    // Add notification for the user
    if (!notificationsStore.userNotifications[request.userId]) {
      notificationsStore.userNotifications[request.userId] = [];
    }

    const notificationId =
      Math.max(
        0,
        ...notificationsStore.userNotifications[request.userId].map((n) => n.id)
      ) + 1;
    const notification = {
      id: notificationId,
      type: "Cập nhật hồ sơ",
      content: "Yêu cầu cập nhật thông tin cá nhân của bạn đã được phê duyệt.",
      date: new Date().toLocaleDateString("vi-VN"),
      read: false,
    };

    notificationsStore.userNotifications[request.userId].push(notification);
    console.log("Notification created:", notification);

    // If the current user is the one being updated, update localStorage
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === request.userId) {
      const { password, ...userWithoutPassword } = updatedUser;
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
      console.log("Current user updated in localStorage");
    }

    // Emit data update event to notify components
    if (dataEvents) {
      dataEvents.emit("users-updated", usersStore.users);
      dataEvents.emit(
        "profile-requests-updated",
        profileRequestsStore.requests
      );
      dataEvents.emit("user-notifications-updated", {
        userId: request.userId,
        notifications: notificationsStore.userNotifications[request.userId],
      });
      console.log("Emitted update events");
    }

    return Promise.resolve(updatedRequest);
  } catch (error) {
    console.error("Error in approveProfileUpdateRequest:", error);
    return Promise.reject(error);
  }
}

// Reject profile update request (for admin)
export function rejectProfileUpdateRequest(requestId, reason) {
  try {
    const request = profileRequestsStore.requests.find(
      (req) => req.id === Number(requestId)
    );
    console.log("Rejecting request:", request);

    if (!request) {
      return Promise.reject(new Error("Không tìm thấy yêu cầu cập nhật"));
    }

    // Update request status
    const requestIndex = profileRequestsStore.requests.findIndex(
      (req) => req.id === Number(requestId)
    );
    profileRequestsStore.requests[requestIndex] = {
      ...profileRequestsStore.requests[requestIndex],
      status: "rejected",
      responseDate: new Date().toLocaleDateString("vi-VN"),
      responseReason: reason,
    };
    const updatedRequest = profileRequestsStore.requests[requestIndex];
    console.log("Request updated:", updatedRequest);

    // Add notification for the user
    if (!notificationsStore.userNotifications[request.userId]) {
      notificationsStore.userNotifications[request.userId] = [];
    }

    const notificationId =
      Math.max(
        0,
        ...notificationsStore.userNotifications[request.userId].map((n) => n.id)
      ) + 1;
    const notification = {
      id: notificationId,
      type: "Cập nhật hồ sơ",
      content: `Yêu cầu cập nhật thông tin cá nhân của bạn đã bị từ chối. Lý do: ${reason}`,
      date: new Date().toLocaleDateString("vi-VN"),
      read: false,
    };

    notificationsStore.userNotifications[request.userId].push(notification);
    console.log("Notification created:", notification);

    // Emit events
    if (dataEvents) {
      dataEvents.emit(
        "profile-requests-updated",
        profileRequestsStore.requests
      );
      dataEvents.emit("user-notifications-updated", {
        userId: request.userId,
        notifications: notificationsStore.userNotifications[request.userId],
      });
    }

    return Promise.resolve(updatedRequest);
  } catch (error) {
    console.error("Error in rejectProfileUpdateRequest:", error);
    return Promise.reject(error);
  }
}

// Mock function to update user profile
export function updateUserProfile(profileData) {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      return Promise.reject(new Error("Không tìm thấy người dùng hiện tại"));
    }

    const userIndex = usersStore.users.findIndex(
      (user) => user.id === Number(currentUser.id)
    );
    if (userIndex === -1) {
      return Promise.reject(new Error("Không tìm thấy người dùng"));
    }

    usersStore.users[userIndex] = {
      ...usersStore.users[userIndex],
      ...profileData,
    };
    const updatedUser = usersStore.users[userIndex];
    console.log("User updated directly:", updatedUser);

    // Update localStorage
    const { password, ...userWithoutPassword } = updatedUser;
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
    console.log("Current user updated in localStorage");

    // Emit event
    if (dataEvents) {
      dataEvents.emit("users-updated", usersStore.users);
    }

    return Promise.resolve(userWithoutPassword);
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    return Promise.reject(error);
  }
}
