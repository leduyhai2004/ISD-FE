// src/api/mockNotification.js
import { notificationsStore } from "./mockDataStore";
import { getCurrentUser } from "./mockAuth";

// Get notifications for the current user
export function getNotifications() {
  console.log("API: getNotifications called");
  return new Promise((resolve, reject) => {
    try {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        console.error("API: No current user found in getNotifications");
        reject(new Error("User not logged in"));
        return;
      }

      const userNotifications = notificationsStore.getUserNotifications(
        currentUser.id
      );
      console.log(
        `API: Retrieved ${userNotifications.length} notifications for user ${currentUser.id}`
      );
      resolve(userNotifications);
    } catch (error) {
      console.error("API: Error in getNotifications:", error);
      reject(error);
    }
  });
}

// Mark a notification as read
export function markAsRead(notificationId) {
  console.log("API: markAsRead called for notification:", notificationId);
  return new Promise((resolve, reject) => {
    try {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        console.error("API: No current user found in markAsRead");
        reject(new Error("User not logged in"));
        return;
      }

      const success = notificationsStore.markUserNotificationAsRead(
        currentUser.id,
        notificationId
      );
      console.log(
        `API: Notification ${notificationId} marked as read:`,
        success
      );
      resolve(success);
    } catch (error) {
      console.error("API: Error in markAsRead:", error);
      reject(error);
    }
  });
}
