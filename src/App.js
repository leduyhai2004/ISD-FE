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

// Admin routes
import AdminDashboard from "./pages/admin/AdminDashboard"
import TeacherManagement from "./pages/admin/TeacherManagement"
import LeaveManagement from "./pages/admin/LeaveManagement"
import AttendanceManagement from "./pages/admin/AttendanceManagement"
import NotificationManagement from "./pages/admin/NotificationManagement"
import TransferManagement from "./pages/admin/TransferManagement"
import ChatManagement from "./pages/admin/ChatManagement"
import AccountManagement from "./pages/admin/AccountManagement"
import ContractManagement from "./pages/admin/ContractManagement"
import ReportManagement from "./pages/admin/ReportManagement"

function App() {
  return (
    <Router>
      <Routes>
        {/* Trang đăng nhập */}
        <Route path="/" element={<Login />} />

        {/* Trang giáo viên */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/view" element={<ProfileView />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/contract" element={<Contract />} />
        <Route path="/leave" element={<LeaveRequest />} />
        <Route path="/attendance" element={<CheckInOut />} />
        <Route path="/attendance/history" element={<AttendanceHistory />} />

        {/* Trang admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/teachers" element={<TeacherManagement />} />
        <Route path="/admin/leave" element={<LeaveManagement />} />
        <Route path="/admin/attendance" element={<AttendanceManagement />} />
        <Route path="/admin/notifications" element={<NotificationManagement />} />
        <Route path="/admin/transfer" element={<TransferManagement />} />
        <Route path="/admin/chat" element={<ChatManagement />} />
        <Route path="/admin/accounts" element={<AccountManagement />} />
        <Route path="/admin/contracts" element={<ContractManagement />} />
        <Route path="/admin/reports" element={<ReportManagement />} />
      </Routes>
    </Router>
  )
}

export default App
