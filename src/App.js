// App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import LoginPage from "./components/auth/LoginPage";
import RegistrationPage from "./components/auth/RegistrationPage";
import FooterComponent from "./components/common/Footer";
import UserService from "./components/service/UserService";
import UpdateUser from "./components/userspage/UpdateUser";
import UserManagementPage from "./components/userspage/UserManagementPage";
import ProfilePage from "./components/userspage/ProfilePage";
import UpdateProfile from "./components/userspage/UpdateProfile";
import Dashboard from "./components/userspage/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            {/* <Route exact path="/login" element={<LoginPage />} /> */}
            <Route
              exact
              path="/"
              element={
                UserService.isAuthenticated() ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <LoginPage />
                )
              }
            />
            <Route
              exact
              path="/login"
              element={
                UserService.isAuthenticated() ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <LoginPage />
                )
              }
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Check if user is authenticated and admin before rendering admin-only routes */}
            {UserService.adminOnly() && (
              <>
                <Route path="/register" element={<RegistrationPage />} />
                <Route
                  path="/admin/user-management"
                  element={<UserManagementPage />}
                />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
                <Route
                  path="/update-profile/:userId"
                  element={<UpdateProfile />}
                />
              </>
            )}
            <Route path="*" element={<Navigate to="/login" />} />‰
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
