// src/api/mockAttendance.js

let attendanceState = {
  status: "not_checked_in",
  checkInTime: "",
  checkOutTime: "",
};

const historyState = [
  {
    id: 1,
    date: "2025-04-14",
    checkIn: "08:02",
    checkOut: "17:00",
    status: "Đúng giờ",
  },
  {
    id: 2,
    date: "2025-04-15",
    checkIn: "08:10",
    checkOut: "17:05",
    status: "Đi muộn",
  },
  { id: 3, date: "2025-04-16", checkIn: "", checkOut: "", status: "Vắng mặt" },
];

/**
 * Lấy trạng thái hiện tại
 */
export function getAttendance() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...attendanceState }), 300);
  });
}

/**
 * Cập nhật trạng thái Check In / Check Out
 * @param {{ status: string, checkInTime: string, checkOutTime: string }} newState
 */
export function postAttendance(newState) {
  return new Promise((resolve) => {
    setTimeout(() => {
      attendanceState = { ...newState };
      // Nếu check-out thì đẩy thêm vào lịch sử
      if (newState.status === "checked_out") {
        historyState.push({
          id: historyState.length + 1,
          date: new Date().toLocaleDateString(),
          checkIn: newState.checkInTime.split(", ")[1] || "--",
          checkOut: newState.checkOutTime.split(", ")[1],
          status: "Đã Check Out",
        });
      }
      resolve({ ...attendanceState });
    }, 300);
  });
}

/**
 * Lấy lịch sử
 */
export function getHistory() {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...historyState]), 300);
  });
}
