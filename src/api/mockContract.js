// src/api/mockContract.js

const contractData = {
    id: "CT-2024-001",
    startDate: "01/05/2024",
    endDate: "01/05/2025",
    salary: "15.000.000 VNĐ/tháng",
    benefits: "Bảo hiểm y tế, thưởng lễ tết...",
    position: "Giáo Viên Toán",
    workingHours: "40 giờ/tuần",
    pdfUrl: "#",
  }
  
  export function getContract() {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...contractData }), 300)
    })
  }
  