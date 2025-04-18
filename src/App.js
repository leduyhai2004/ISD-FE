import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import ProfileView from "./pages/profile/ProfileView"
import ProfileEdit from "./pages/profile/ProfileEdit"
import Notifications from "./pages/Notifications"
import Messages from "./pages/Messages"
import Contract from "./pages/Contract"
import LeaveRequest from "./pages/LeaveRequest"
import CheckInOut from "./pages/CheckInOut"
import AttendanceHistory from "./pages/AttendanceHistory"

function App() {
  return (
    <Router>
      <Routes>
        {/* Trang đăng nhập */}
        <Route path="/" element={<Login />} />

        {/* Trang chính */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Hồ sơ */}
        <Route path="/profile/view" element={<ProfileView />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />

        {/* Thông báo */}
        <Route path="/notifications" element={<Notifications />} />

        {/* Tin nhắn */}
        <Route path="/messages" element={<Messages />} />

        {/* Hợp đồng */}
        <Route path="/contract" element={<Contract />} />

        {/* Nghỉ phép */}
        <Route path="/leave" element={<LeaveRequest />} />

        {/* Điểm danh */}
        <Route path="/attendance" element={<CheckInOut />} />
        <Route path="/attendance/history" element={<AttendanceHistory />} />
      </Routes>
    </Router>
  )
}

export default App
