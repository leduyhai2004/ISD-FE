// src/api/mockAdminAttendance.js

// Mock attendance data
const attendanceData = [
    {
      id: 1,
      teacherId: 1,
      teacherName: "Nguyễn Văn A",
      date: "19/04/2025",
      checkIn: "07:55",
      checkOut: "17:00",
      status: "Đúng giờ",
    },
    {
      id: 2,
      teacherId: 2,
      teacherName: "Trần Thị B",
      date: "19/04/2025",
      checkIn: "08:10",
      checkOut: "17:05",
      status: "Đi muộn",
    },
    {
      id: 3,
      teacherId: 3,
      teacherName: "Lê Văn C",
      date: "19/04/2025",
      checkIn: "",
      checkOut: "",
      status: "Vắng mặt",
    },
    {
      id: 4,
      teacherId: 4,
      teacherName: "Phạm Thị D",
      date: "19/04/2025",
      checkIn: "07:50",
      checkOut: "16:55",
      status: "Đúng giờ",
    },
    {
      id: 5,
      teacherId: 5,
      teacherName: "Hoàng Văn E",
      date: "19/04/2025",
      checkIn: "08:05",
      checkOut: "17:10",
      status: "Đi muộn",
    },
    {
      id: 6,
      teacherId: 1,
      teacherName: "Nguyễn Văn A",
      date: "18/04/2025",
      checkIn: "07:50",
      checkOut: "17:00",
      status: "Đúng giờ",
    },
    {
      id: 7,
      teacherId: 2,
      teacherName: "Trần Thị B",
      date: "18/04/2025",
      checkIn: "07:55",
      checkOut: "17:05",
      status: "Đúng giờ",
    },
    {
      id: 8,
      teacherId: 3,
      teacherName: "Lê Văn C",
      date: "18/04/2025",
      checkIn: "08:15",
      checkOut: "17:00",
      status: "Đi muộn",
    },
    {
      id: 9,
      teacherId: 4,
      teacherName: "Phạm Thị D",
      date: "18/04/2025",
      checkIn: "",
      checkOut: "",
      status: "Nghỉ phép",
    },
    {
      id: 10,
      teacherId: 5,
      teacherName: "Hoàng Văn E",
      date: "18/04/2025",
      checkIn: "07:45",
      checkOut: "16:50",
      status: "Đúng giờ",
    },
  ]
  
  // Get all attendance records
  export function getAllAttendanceRecords() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...attendanceData]), 500)
    })
  }
  
  // Get attendance records by date
  export function getAttendanceByDate(date) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const records = attendanceData.filter((record) => record.date === date)
        resolve([...records])
      }, 500)
    })
  }
  
  // Get attendance records by teacher
  export function getAttendanceByTeacher(teacherId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const records = attendanceData.filter((record) => record.teacherId === Number.parseInt(teacherId))
        resolve([...records])
      }, 500)
    })
  }
  
  // Update attendance record
  export function updateAttendanceRecord(id, updatedData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = attendanceData.findIndex((record) => record.id === Number.parseInt(id))
        if (index !== -1) {
          attendanceData[index] = { ...attendanceData[index], ...updatedData }
          resolve(attendanceData[index])
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
          id: attendanceData.length + 1,
          ...record,
        }
        attendanceData.push(newRecord)
        resolve(newRecord)
      }, 500)
    })
  }
  