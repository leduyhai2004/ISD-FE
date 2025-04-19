// src/api/mockTeachers.js

// Mock teachers data
const teachersData = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "teacher@example.com",
      phone: "0123-456-789",
      subject: "Toán",
      joinDate: "01/05/2020",
      status: "active",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranb@example.com",
      phone: "0123-456-790",
      subject: "Văn",
      joinDate: "15/08/2019",
      status: "active",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@example.com",
      phone: "0123-456-791",
      subject: "Anh",
      joinDate: "10/02/2021",
      status: "active",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamd@example.com",
      phone: "0123-456-792",
      subject: "Lý",
      joinDate: "05/09/2020",
      status: "inactive",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      email: "hoange@example.com",
      phone: "0123-456-793",
      subject: "Hóa",
      joinDate: "20/11/2019",
      status: "active",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]
  
  // Get all teachers
  export function getTeachers() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...teachersData]), 500)
    })
  }
  
  // Get teacher by ID
  export function getTeacherById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const teacher = teachersData.find((t) => t.id === Number.parseInt(id))
        if (teacher) {
          resolve({ ...teacher })
        } else {
          reject(new Error("Không tìm thấy giáo viên"))
        }
      }, 500)
    })
  }
  
  // Add new teacher
  export function addTeacher(teacher) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTeacher = {
          id: teachersData.length + 1,
          ...teacher,
          status: "active",
          avatar: "/placeholder.svg?height=80&width=80",
        }
        teachersData.push(newTeacher)
        resolve(newTeacher)
      }, 500)
    })
  }
  
  // Update teacher
  export function updateTeacher(id, updatedData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = teachersData.findIndex((t) => t.id === Number.parseInt(id))
        if (index !== -1) {
          teachersData[index] = { ...teachersData[index], ...updatedData }
          resolve(teachersData[index])
        } else {
          reject(new Error("Không tìm thấy giáo viên"))
        }
      }, 500)
    })
  }
  
  // Delete teacher
  export function deleteTeacher(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = teachersData.findIndex((t) => t.id === Number.parseInt(id))
        if (index !== -1) {
          const deletedTeacher = teachersData.splice(index, 1)[0]
          resolve(deletedTeacher)
        } else {
          reject(new Error("Không tìm thấy giáo viên"))
        }
      }, 500)
    })
  }
  