// components/UserManagementPage.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../service/UserService";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import Search from "../common/Search";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBInputGroup,
} from "mdb-react-ui-kit";

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch users data when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await UserService.getAllUsers(token);
      //   console.log(response);
      setUsers(response.ourUsersList); // Assuming the list of users is under the key 'ourUsersList'
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      // Prompt for confirmation before deleting the user
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );

      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (confirmDelete) {
        await UserService.deleteUser(userId, token);
        // After deleting the user, fetch the updated list of users
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <MDBContainer fluid className="p-0">
      <MDBRow>
        {/* Sidebar */}
        <MDBCol
          md="2"
          className="bg-dark text-white vh-100 d-flex flex-column p-3"
        >
          <h2 className="text-center fw-bold">HRMS</h2>
          <div className="text-center my-3">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small_2x/Basic_Ui__28186_29.jpg"
              alt="Admin"
              className="rounded-circle"
              style={{ width: "80px", height: "80px" }}
            />
            <h5 className="mt-2">Admin</h5>
          </div>
          <ul className="list-unstyled">
            <li className="p-2 bg-warning text-dark rounded">
              <Link
                to="/teacher-profile"
                className="btn btn-warning w-100 text-dark fw-bold"
              >
                Hồ Sơ Giáo Viên
              </Link>
            </li>
            <li className="p-2">
              <Link
                to="/attendance"
                className="text-white text-decoration-none"
              >
                Điểm Danh
              </Link>
            </li>
            <li className="p-2">
              <Link
                to="/notifications"
                className="text-white text-decoration-none"
              >
                Thông báo
              </Link>
            </li>
            <li className="p-2">
              <Link
                to="/business-trip"
                className="text-white text-decoration-none"
              >
                Chuyến công tác
              </Link>
            </li>
            <li className="p-2">
              <Link to="/reports" className="text-white text-decoration-none">
                Báo cáo
              </Link>
            </li>
          </ul>
        </MDBCol>

        {/* Main Content */}
        <MDBCol md="10" className="p-4 bg-light">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Quản lý Hồ Sơ Giáo Viên</h4>
            <MDBInputGroup>
              <Search search={search} setSearch={setSearch} />
            </MDBInputGroup>
          </div>

          {/* Add Teacher Button */}
          <button className="reg-button">
            {" "}
            <Link to="/register">+Add Teacher</Link>
          </button>

          {/* Teacher Table */}
          <MDBCard>
            <MDBCardBody>
              <MDBTable bordered>
                <MDBTableHead>
                  <tr>
                    <th>Tên</th>
                    <th>Ngày Sinh</th>
                    <th>Số Điện Thoại</th>
                    <th>Ngày Bắt Đầu</th>
                    <th>Bằng Cấp</th>
                    <th>Hành Động</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {users
                    .filter((user) => user.name.toLowerCase().includes(search))
                    .map((user) => (
                      <tr key={user.id}>
                        <td className="text-primary">{user.name}</td>
                        <td>{user.dob}</td>
                        <td>{user.phone}</td>
                        <td>{user.contract}</td>
                        <td>{user.degree}</td>
                        <td className="d-flex align-items-center">
                          <Link
                            to={`/update-user/${user.id}`}
                            className="btn btn-warning mx-2"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            className="btn btn-danger mx-2"
                            onClick={() => deleteUser(user.id)}
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default UserManagementPage;
