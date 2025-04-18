import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Card from '../components/Card';
import LeaveTable from '../components/LeaveTable';
import Timetable from '../components/Timetable';
import '../styles/teacher_dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        <Topbar />
        <div className="scroll-content">
          <div className="cards-container">
            <Card icon="fas fa-calendar-check" count="10" label="Ngày nghỉ còn lại" color="yellow" />
            <Card icon="fas fa-bell" count="4" label="Thông báo" color="blue" />
            <Card icon="fas fa-chalkboard-teacher" count="2" label="Lịch giảng dạy hôm nay" color="green" />
          </div>
          <LeaveTable />
          <Timetable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
