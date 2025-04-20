// src/api/mockTeachers.js
import { usersStore, generateId } from "./mockDataStore"

// Get all teachers
export function getTeachers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const teachers = usersStore.getUsersByRole("teacher")
      resolve([...teachers])
    }, 500)
  })
}

// Get teacher by ID
export function getTeacherById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const teacher = usersStore.getUserById(Number.parseInt(id))
      if (teacher && teacher.role === "teacher") {
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
        id: generateId(usersStore.users),
        ...teacher,
        role: "teacher",
        status: "active",
        avatar: "/placeholder.svg?height=80&width=80",
      }
      usersStore.addUser(newTeacher)
      resolve(newTeacher)
    }, 500)
  })
}

// Update teacher
export function updateTeacher(id, updatedData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const updatedTeacher = usersStore.updateUser(Number.parseInt(id), updatedData)
      if (updatedTeacher) {
        resolve(updatedTeacher)
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
      const deletedTeacher = usersStore.removeUser(Number.parseInt(id))
      if (deletedTeacher) {
        resolve(deletedTeacher)
      } else {
        reject(new Error("Không tìm thấy giáo viên"))
      }
    }, 500)
  })
}
