import React from "react";
import { Link } from "react-router-dom";
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

function SideBar() {
  return (
    <MDBCol
      md="2"
      className="bg-dark text-white min-vh-100 d-flex flex-column p-3"
    >
      <div className="text-center my-3">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small_2x/Basic_Ui__28186_29.jpg"
          alt="Admin"
          className="rounded-circle"
          style={{ width: "80px", height: "80px" }}
        />
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
          <Link to="/attendance" className="text-white text-decoration-none">
            Điểm Danh
          </Link>
        </li>
        <li className="p-2">
          <Link to="/notifications" className="text-white text-decoration-none">
            Thông báo
          </Link>
        </li>
        <li className="p-2">
          <Link to="/reports" className="text-white text-decoration-none">
            Báo cáo
          </Link>
        </li>
        <li className="p-2">
          <Link to="/reports" className="text-white text-decoration-none">
            Xem hồ sơ
          </Link>
        </li>
      </ul>
    </MDBCol>
  );
}

export default SideBar;
