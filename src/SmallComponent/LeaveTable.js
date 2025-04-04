import React from 'react';
import '../styles/teacher_dashboard.css';

const LeaveTable = () => {
  return (
    <div className="table-container">
      <h3>Yêu Cầu Nghỉ Phép Gần Đây</h3>
      <table>
        <thead>
          <tr>
            <th>Loại nghỉ</th>
            <th>Số ngày</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nghỉ phép</td>
            <td>2</td>
            <td>22/04/2024</td>
            <td>24/04/2024</td>
            <td className="status approved">Đã duyệt</td>
          </tr>
          <tr>
            <td>Nghỉ ốm</td>
            <td>1</td>
            <td>22/04/2024</td>
            <td>22/04/2024</td>
            <td className="status pending">Chờ duyệt</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LeaveTable;
