// src/api/mockAttendance.js
import { attendanceStore, generateId } from "./mockDataStore"
import { getCurrentUser } from "./mockAuth"

/**
 * Lấy trạng thái hiện tại
 */
export function getAttendance() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser()
      if (currentUser) {
        const state = attendanceStore.getUserAttendanceState(currentUser.id)
        resolve({ ...state })
      } else {
        resolve({ status: "not_checked_in", checkInTime: "", checkOutTime: "" })
      }
    }, 300)
  })
}

/**
 * Cập nhật trạng thái Check In / Check Out
 * @param {{ status: string, checkInTime: string, checkOutTime: string }} newState
 */
export function postAttendance(newState) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser()
      if (currentUser) {
        // Update user attendance state
        attendanceStore.updateUserAttendanceState(currentUser.id, newState)

        // Get today's date in DD/MM/YYYY format
        const today = new Date().toLocaleDateString("vi-VN")

        // If check-in, create a new record or update existing one
        if (newState.status === "checked_in") {
          const checkInTime = newState.checkInTime.split(", ")[1] || "--"

          // Check if there's already a record for today
          const existingRecord = attendanceStore.records.find(
            (record) => record.teacherId === currentUser.id && record.date === today,
          )

          if (existingRecord) {
            // Update existing record
            attendanceStore.updateRecord(existingRecord.id, {
              checkIn: checkInTime,
              status: "Đã Check In",
            })
          } else {
            // Create new record
            attendanceStore.addRecord({
              id: generateId(attendanceStore.records),
              teacherId: currentUser.id,
              teacherName: currentUser.name,
              date: today,
              checkIn: checkInTime,
              checkOut: "--",
              status: "Đã Check In",
            })
          }
        }

        // If check-out, update the existing record
        if (newState.status === "checked_out") {
          const checkOutTime = newState.checkOutTime.split(", ")[1] || "--"

          // Find today's record
          const existingRecord = attendanceStore.records.find(
            (record) => record.teacherId === currentUser.id && record.date === today,
          )

          if (existingRecord) {
            // Update existing record
            attendanceStore.updateRecord(existingRecord.id, {
              checkOut: checkOutTime,
              status: "Đã Check Out",
            })
          } else {
            // Create new record with both check-in and check-out
            const checkInTime = newState.checkInTime.split(", ")[1] || "--"
            attendanceStore.addRecord({
              id: generateId(attendanceStore.records),
              teacherId: currentUser.id,
              teacherName: currentUser.name,
              date: today,
              checkIn: checkInTime,
              checkOut: checkOutTime,
              status: "Đã Check Out",
            })
          }
        }

        resolve({ ...newState })
      } else {
        resolve({ status: "not_checked_in", checkInTime: "", checkOutTime: "" })
      }
    }, 300)
  })
}

/**
 * Lấy lịch sử
 */
export function getHistory() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser()
      if (currentUser) {
        const history = attendanceStore.getRecordsByTeacher(currentUser.id)
        resolve([...history])
      } else {
        resolve([])
      }
    }, 300)
  })
}
