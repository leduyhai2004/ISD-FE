import React from 'react';
import '../styles/teacher_dashboard.css';

const Timetable = () => {
  return (
    <div className="table-container">
      <h3>Thời Khóa Biểu</h3>
      <table>
        <thead>
          <tr>
            <th>Giờ</th>
            <th>Lớp</th>
            <th>Môn</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>07:00 - 07:45</td>
            <td>10A1</td>
            <td>Toán</td>
          </tr>
          <tr>
            <td>08:00 - 08:45</td>
            <td>10A2</td>
            <td>Toán</td>
          </tr>
          <tr>
            <td>09:00 - 09:45</td>
            <td>10A3</td>
            <td>Toán</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
