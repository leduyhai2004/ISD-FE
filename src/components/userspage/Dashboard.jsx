import React from "react";
import Topbar from "./../../SmallComponent/Topbar";
import Card from "./../../SmallComponent/Card";
import LeaveTable from "./../../SmallComponent/LeaveTable";
import Timetable from "./../../SmallComponent/Timetable";
import Sidebar from "../../SmallComponent/Sidebar";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        <Topbar />
        <div className="scroll-content">
          <div className="cards-container">
            <Card
              icon="fas fa-calendar-check"
              count="10"
              label="Ngày nghỉ còn lại"
              color="yellow"
            />
            <Card icon="fas fa-bell" count="4" label="Thông báo" color="blue" />
            <Card
              icon="fas fa-chalkboard-teacher"
              count="2"
              label="Lịch giảng dạy hôm nay"
              color="green"
            />
          </div>
          <LeaveTable />
          <Timetable />
        </div>
      </div>
    </div>
  );
}
