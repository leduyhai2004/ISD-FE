import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { getCurrentUser } from "./api/mockAuth";
import { DataSyncProvider } from "./components/DataSyncProvider";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProfileView from "./pages/profile/ProfileView";
import ProfileEdit from "./pages/profile/ProfileEdit";
import Notifications from "./pages/Notifications";
import Messages from "./pages/Messages";
import Contract from "./pages/Contract";
import LeaveRequest from "./pages/LeaveRequest";
import CheckInOut from "./pages/CheckInOut";
import AttendanceHistory from "./pages/AttendanceHistory";

// Admin routes
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherManagement from "./pages/admin/TeacherManagement";
import LeaveManagement from "./pages/admin/LeaveManagement";
import AttendanceManagement from "./pages/admin/AttendanceManagement";
import NotificationManagement from "./pages/admin/NotificationManagement";
import TransferManagement from "./pages/admin/TransferManagement";
import ChatManagement from "./pages/admin/ChatManagement";
import AccountManagement from "./pages/admin/AccountManagement";
import ContractManagement from "./pages/admin/ContractManagement";
import ReportManagement from "./pages/admin/ReportManagement";
import ProfileRequestsManagement from "./pages/admin/ProfileRequestsManagement";

// Protected route component
const ProtectedRoute = ({ children, requiredRole }) => {
  const user = getCurrentUser();

  if (!user) {
    // Not logged in, redirect to login
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Wrong role, redirect to appropriate dashboard
    return (
      <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />
    );
  }

  return children;
};

function App() {
  return (
    <DataSyncProvider>
      <Router>
        <Routes>
          {/* Trang đăng nhập */}
          <Route path="/" element={<Login />} />

          {/* Trang giáo viên */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="teacher">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/view"
            element={
              <ProtectedRoute requiredRole="teacher">
                <ProfileView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute requiredRole="teacher">
                <ProfileEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute requiredRole="teacher">
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute requiredRole="teacher">
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contract"
            element={
              <ProtectedRoute requiredRole="teacher">
                <Contract />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leave"
            element={
              <ProtectedRoute requiredRole="teacher">
                <LeaveRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute requiredRole="teacher">
                <CheckInOut />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance/history"
            element={
              <ProtectedRoute requiredRole="teacher">
                <AttendanceHistory />
              </ProtectedRoute>
            }
          />

          {/* Trang admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/teachers"
            element={
              <ProtectedRoute requiredRole="admin">
                <TeacherManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/leave"
            element={
              <ProtectedRoute requiredRole="admin">
                <LeaveManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/attendance"
            element={
              <ProtectedRoute requiredRole="admin">
                <AttendanceManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/notifications"
            element={
              <ProtectedRoute requiredRole="admin">
                <NotificationManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/transfer"
            element={
              <ProtectedRoute requiredRole="admin">
                <TransferManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/chat"
            element={
              <ProtectedRoute requiredRole="admin">
                <ChatManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/accounts"
            element={
              <ProtectedRoute requiredRole="admin">
                <AccountManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contracts"
            element={
              <ProtectedRoute requiredRole="admin">
                <ContractManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute requiredRole="admin">
                <ReportManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile-requests"
            element={
              <ProtectedRoute requiredRole="admin">
                <ProfileRequestsManagement />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </DataSyncProvider>
  );
}

export default App;
