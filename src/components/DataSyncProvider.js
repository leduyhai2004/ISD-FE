"use client"

// src/components/DataSyncProvider.js
import { createContext, useContext, useEffect, useState } from "react"
import { dataEvents } from "../api/mockDataStore"
import { getCurrentUser } from "../api/mockAuth"

// Create context
const DataSyncContext = createContext()

// Provider component
export const DataSyncProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getCurrentUser())
  const [lastUpdate, setLastUpdate] = useState({
    users: Date.now(),
    attendance: Date.now(),
    leaveRequests: Date.now(),
    contracts: Date.now(),
    conversations: Date.now(),
    notifications: Date.now(),
  })

  // Listen for data changes
  useEffect(() => {
    const handleUsersUpdate = () => {
      setLastUpdate((prev) => ({ ...prev, users: Date.now() }))
    }

    const handleAttendanceUpdate = () => {
      setLastUpdate((prev) => ({ ...prev, attendance: Date.now() }))
    }

    const handleLeaveRequestsUpdate = () => {
      setLastUpdate((prev) => ({ ...prev, leaveRequests: Date.now() }))
    }

    const handleContractsUpdate = () => {
      setLastUpdate((prev) => ({ ...prev, contracts: Date.now() }))
    }

    const handleConversationsUpdate = () => {
      setLastUpdate((prev) => ({ ...prev, conversations: Date.now() }))
    }

    const handleNotificationsUpdate = () => {
      setLastUpdate((prev) => ({ ...prev, notifications: Date.now() }))
    }

    // Subscribe to events
    dataEvents.on("users-updated", handleUsersUpdate)
    dataEvents.on("attendance-updated", handleAttendanceUpdate)
    dataEvents.on("user-attendance-updated", handleAttendanceUpdate)
    dataEvents.on("leave-requests-updated", handleLeaveRequestsUpdate)
    dataEvents.on("contracts-updated", handleContractsUpdate)
    dataEvents.on("conversations-updated", handleConversationsUpdate)
    dataEvents.on("conversation-updated", handleConversationsUpdate)
    dataEvents.on("notifications-updated", handleNotificationsUpdate)
    dataEvents.on("user-notifications-updated", handleNotificationsUpdate)

    // Check for user changes
    const checkUserInterval = setInterval(() => {
      const user = getCurrentUser()
      if (JSON.stringify(user) !== JSON.stringify(currentUser)) {
        setCurrentUser(user)
      }
    }, 1000)

    // Cleanup
    return () => {
      dataEvents.off("users-updated", handleUsersUpdate)
      dataEvents.off("attendance-updated", handleAttendanceUpdate)
      dataEvents.off("user-attendance-updated", handleAttendanceUpdate)
      dataEvents.off("leave-requests-updated", handleLeaveRequestsUpdate)
      dataEvents.off("contracts-updated", handleContractsUpdate)
      dataEvents.off("conversations-updated", handleConversationsUpdate)
      dataEvents.off("conversation-updated", handleConversationsUpdate)
      dataEvents.off("notifications-updated", handleNotificationsUpdate)
      dataEvents.off("user-notifications-updated", handleNotificationsUpdate)
      clearInterval(checkUserInterval)
    }
  }, [currentUser])

  return <DataSyncContext.Provider value={{ lastUpdate }}>{children}</DataSyncContext.Provider>
}

// Custom hook to use the data sync context
export const useDataSync = () => {
  const context = useContext(DataSyncContext)
  if (!context) {
    throw new Error("useDataSync must be used within a DataSyncProvider")
  }
  return context
}
