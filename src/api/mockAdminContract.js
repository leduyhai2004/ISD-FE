// src/api/mockAdminContract.js

// Mock contracts data
const contractsData = [
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
    {
      id: 3,
      teacherId: 3,
      teacherName: "Lê Văn C",
      startDate: "2023-05-01",
      endDate: "2023-12-01",
      status: "expired",
      type: "Hợp đồng 6 tháng",
      position: "Giáo viên Lý",
      salary: "14.000.000 VNĐ",
    },
    {
      id: 4,
      teacherId: 4,
      teacherName: "Phạm Thị D",
      startDate: "2023-06-15",
      endDate: "2024-06-15",
      status: "active",
      type: "Hợp đồng 1 năm",
      position: "Giáo viên Hóa",
      salary: "15.000.000 VNĐ",
    },
    {
      id: 5,
      teacherId: 5,
      teacherName: "Hoàng Văn E",
      startDate: "2023-09-01",
      endDate: "2024-09-01",
      status: "active",
      type: "Hợp đồng 1 năm",
      position: "Giáo viên Sinh",
      salary: "15.000.000 VNĐ",
    },
  ]
  
  // Get all contracts
  export function getAllContracts() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...contractsData]), 500)
    })
  }
  
  // Get contracts by status
  export function getContractsByStatus(status) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredContracts = contractsData.filter((contract) => contract.status === status)
        resolve([...filteredContracts])
      }, 500)
    })
  }
  
  // Get expiring contracts
  export function getExpiringContracts(daysThreshold = 30) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const today = new Date()
        const threshold = new Date()
        threshold.setDate(today.getDate() + daysThreshold)
  
        const expiringContracts = contractsData.filter((contract) => {
          const endDate = new Date(contract.endDate)
          return endDate <= threshold && endDate >= today && contract.status === "active"
        })
  
        resolve([...expiringContracts])
      }, 500)
    })
  }
  
  // Create new contract
  export function createContract(contract) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newContract = {
          id: contractsData.length + 1,
          ...contract,
          status: "active",
        }
        contractsData.push(newContract)
        resolve(newContract)
      }, 500)
    })
  }
  
  // Update contract
  export function updateContract(id, updatedData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = contractsData.findIndex((contract) => contract.id === Number.parseInt(id))
        if (index !== -1) {
          contractsData[index] = { ...contractsData[index], ...updatedData }
          resolve(contractsData[index])
        } else {
          reject(new Error("Không tìm thấy hợp đồng"))
        }
      }, 500)
    })
  }
  
  // Delete contract
  export function deleteContract(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = contractsData.findIndex((contract) => contract.id === Number.parseInt(id))
        if (index !== -1) {
          const deletedContract = contractsData.splice(index, 1)[0]
          resolve(deletedContract)
        } else {
          reject(new Error("Không tìm thấy hợp đồng"))
        }
      }, 500)
    })
  }
  