// src/api/mockContract.js
import { contractsStore } from "./mockDataStore"
import { getCurrentUser } from "./mockAuth"

export function getContract() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser()
      if (currentUser) {
        const contract = contractsStore.getContractByTeacher(currentUser.id)
        if (contract) {
          // Format contract for display
          const formattedContract = {
            id: `CT-${new Date().getFullYear()}-${String(contract.id).padStart(3, "0")}`,
            startDate: contract.startDate.replace(/-/g, "/"),
            endDate: contract.endDate.replace(/-/g, "/"),
            salary: contract.salary,
            benefits: "Bảo hiểm y tế, thưởng lễ tết...",
            position: contract.position,
            workingHours: "40 giờ/tuần",
            pdfUrl: "#",
          }
          resolve({ ...formattedContract })
        } else {
          resolve(null)
        }
      } else {
        resolve(null)
      }
    }, 300)
  })
}
