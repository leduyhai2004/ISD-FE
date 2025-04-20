// src/api/mockAdminAttendance.js
import { attendanceStore, generateId } from "./mockDataStore"

// Get all attendance records
export function getAllAttendanceRecords() {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...attendanceStore.records]), 500)
  })
}

// Get attendance records by date
export function getAttendanceByDate(date) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const records = attendanceStore.getRecordsByDate(date)
      resolve([...records])
    }, 500)
  })
}

// Get attendance records by teacher
export function getAttendanceByTeacher(teacherId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const records = attendanceStore.getRecordsByTeacher(Number.parseInt(teacherId))
      resolve([...records])
    }, 500)
  })
}

// Update attendance record
export function updateAttendanceRecord(id, updatedData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const updatedRecord = attendanceStore.updateRecord(Number.parseInt(id), updatedData)
      if (updatedRecord) {
        resolve(updatedRecord)
      } else {
        reject(new Error("Không tìm thấy bản ghi điểm danh"))
      }
    }, 500)
  })
}

// Add manual attendance record
export function addManualAttendance(record) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRecord = {
        id: generateId(attendanceStore.records),
        ...record,
      }
      attendanceStore.addRecord(newRecord)
      resolve(newRecord)
    }, 500)
  })
}
