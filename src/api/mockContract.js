// src/api/mockContract.js
import { contractsStore } from "./mockDataStore";
import { getCurrentUser } from "./mockAuth";

export function getContract() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        const contract = contractsStore.getContractByTeacher(currentUser.id);
        if (contract) {
          // Format contract for display
          const formattedContract = {
            id: `CT-${new Date().getFullYear()}-${String(contract.id).padStart(
              3,
              "0"
            )}`,
            startDate: contract.startDate.replace(/-/g, "/"),
            endDate: contract.endDate.replace(/-/g, "/"),
            salary: contract.salary,
            benefits: "Bảo hiểm y tế, thưởng lễ tết...",
            position: contract.position,
            workingHours: "40 giờ/tuần",
            pdfUrl: "#",
          };
          resolve({ ...formattedContract });
        } else {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    }, 300);
  });
}

export function downloadContract(contractId) {
  return new Promise((resolve) => {
    // Get the contract data first
    getContract().then((contract) => {
      if (!contract) {
        resolve({
          success: false,
          data: null,
          message: "Contract not found",
        });
        return;
      }

      // Get current user for the contract
      const currentUser = getCurrentUser();

      // Simulate API call delay
      setTimeout(() => {
        // In a real application, we would generate a PDF here
        // For this mock, we'll create a text representation of the contract

        const contractText = `
HỢP ĐỒNG LAO ĐỘNG
--------------------------

Mã Hợp Đồng: ${contract.id}

THÔNG TIN GIÁO VIÊN:
Họ và tên: ${currentUser.name}
Mã số: ${currentUser.id}
Chức vụ: ${contract.position}
Email: ${currentUser.email}

CHI TIẾT HỢP ĐỒNG:
Ngày bắt đầu: ${contract.startDate}
Ngày kết thúc: ${contract.endDate}
Mức lương: ${contract.salary}
Giờ làm việc: ${contract.workingHours}

QUYỀN LỢI:
${contract.benefits}

ĐIỀU KHOẢN VÀ ĐIỀU KIỆN:
1. Giáo viên đồng ý tuân thủ các quy định và chính sách của nhà trường.
2. Giáo viên sẽ thực hiện các nhiệm vụ giảng dạy theo lịch trình đã thỏa thuận.
3. Hợp đồng có thể được gia hạn theo thỏa thuận của cả hai bên.
4. Mọi thay đổi về điều khoản hợp đồng phải được thỏa thuận bằng văn bản.

Chữ ký Giáo viên:                    Chữ ký Đại diện Nhà trường:
_________________                    _________________

Ngày: ${new Date().toLocaleDateString("vi-VN")}
`;

        // Convert text to Uint8Array (simulating PDF data)
        const encoder = new TextEncoder();
        const contractData = encoder.encode(contractText);

        resolve({
          success: true,
          data: contractData,
          message: "Contract downloaded successfully",
          fileName: `Contract-${contract.id}.txt`, // Changed to .txt since we're generating text
        });
      }, 1500);
    });
  });
}
