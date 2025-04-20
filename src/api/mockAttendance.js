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

// Update the postAttendance function to correctly extract and format time
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
          // Extract time from the full datetime string or create it if needed
          let checkInTime = ""
          if (newState.checkInTime.includes(",")) {
            checkInTime = newState.checkInTime.split(", ")[1].trim()
          } else {
            // If we only have the time without date
            checkInTime = newState.checkInTime
          }

          // Determine status based on check-in time
          let status = "Đúng giờ"

          // Extract hours and minutes from checkInTime (format: HH:MM:SS)
          const timeParts = checkInTime.split(":")
          if (timeParts.length >= 2) {
            const hours = Number.parseInt(timeParts[0])
            const minutes = Number.parseInt(timeParts[1])

            // If check-in time is after 8:00 AM, mark as late
            if (hours > 8 || (hours === 8 && minutes > 0)) {
              status = "Đi muộn"
            }
          }

          // Check if there's already a record for today
          const existingRecord = attendanceStore.records.find(
            (record) => record.teacherId === currentUser.id && record.date === today,
          )

          if (existingRecord) {
            // Update existing record
            attendanceStore.updateRecord(existingRecord.id, {
              checkIn: checkInTime,
              status: status,
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
              status: status,
            })
          }
        }

        // If check-out, update the existing record
        if (newState.status === "checked_out") {
          // Extract time from the full datetime string or create it if needed
          let checkOutTime = ""
          if (newState.checkOutTime.includes(",")) {
            checkOutTime = newState.checkOutTime.split(", ")[1].trim()
          } else {
            // If we only have the time without date
            checkOutTime = newState.checkOutTime
          }

          // Find today's record
          const existingRecord = attendanceStore.records.find(
            (record) => record.teacherId === currentUser.id && record.date === today,
          )

          if (existingRecord) {
            // Update existing record but keep the original status (based on check-in time)
            attendanceStore.updateRecord(existingRecord.id, {
              checkOut: checkOutTime,
              status: existingRecord.status, // Keep the original status
            })
          } else {
            // Create new record with both check-in and check-out
            // This is an edge case - should rarely happen
            let checkInTime = ""
            if (newState.checkInTime.includes(",")) {
              checkInTime = newState.checkInTime.split(", ")[1].trim()
            } else {
              checkInTime = newState.checkInTime || "--"
            }

            // Determine status based on check-in time
            let status = "Đúng giờ"

            // Extract hours and minutes from checkInTime
            const timeParts = checkInTime.split(":")
            if (timeParts.length >= 2) {
              const hours = Number.parseInt(timeParts[0])
              const minutes = Number.parseInt(timeParts[1])

              // If check-in time is after 8:00 AM, mark as late
              if (hours > 8 || (hours === 8 && minutes > 0)) {
                status = "Đi muộn"
              }
            }

            attendanceStore.addRecord({
              id: generateId(attendanceStore.records),
              teacherId: currentUser.id,
              teacherName: currentUser.name,
              date: today,
              checkIn: checkInTime,
              checkOut: checkOutTime,
              status: status,
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
