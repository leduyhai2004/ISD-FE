// src/api/mockAdminContract.js
import { contractsStore, generateId } from "./mockDataStore"

// Get all contracts
export function getAllContracts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...contractsStore.contracts]), 500)
  })
}

// Get contracts by status
export function getContractsByStatus(status) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredContracts = contractsStore.getContractsByStatus(status)
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

      const expiringContracts = contractsStore.contracts.filter((contract) => {
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
        id: generateId(contractsStore.contracts),
        ...contract,
        status: "active",
      }
      contractsStore.addContract(newContract)
      resolve(newContract)
    }, 500)
  })
}

// Update contract
export function updateContract(id, updatedData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const updatedContract = contractsStore.updateContract(Number.parseInt(id), updatedData)
      if (updatedContract) {
        resolve(updatedContract)
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
      const deletedContract = contractsStore.removeContract(Number.parseInt(id))
      if (deletedContract) {
        resolve(deletedContract)
      } else {
        reject(new Error("Không tìm thấy hợp đồng"))
      }
    }, 500)
  })
}
