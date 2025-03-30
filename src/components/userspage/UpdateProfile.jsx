import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { Link } from "react-router-dom";

function UpdateProfile() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    city: "",
    contract: "",
    phone: "",
    address: "",
    department: "",
    dob: "",
    degree: "",
  });

  useEffect(() => {
    fetchUserDataById(userId); // Pass the userId to fetchUserDataById
  }, [userId]); //wheen ever there is a chane in userId, run this

  const fetchUserDataById = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getUserById(userId, token); // Pass userId to getUserById
      const {
        name,
        email,
        role,
        city,
        contract,
        phone,
        address,
        department,
        dob,
        degree,
      } = response.ourUsers;
      setUserData({
        name,
        email,
        role,
        city,
        contract,
        phone,
        address,
        department,
        dob,
        degree,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm(
        "Are you sure you want to update this user?"
      );
      if (confirmUpdate) {
        const token = localStorage.getItem("token");
        const res = await UserService.updateUser(userId, userData, token);
        console.log(res);
        // Redirect to profile page or display a success message
        navigate("/profile"); //here
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      alert(error);
    }
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5"> Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="name">
            Name
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="name"
            id="firstName"
            required
            value={userData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="email">
            Email
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="email"
            id="email"
            required
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="role">
            Role
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="role"
            id="role"
            required
            value={userData.role}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="city">
            City
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="city"
            id="city"
            required
            value={userData.city}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="city">
            Contract
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="contract"
            id="contract"
            required
            value={userData.contract}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="phone">
            PhoneNumber
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="phone"
            id="phone"
            required
            value={userData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="department">
            Department
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="department"
            id="department"
            required
            value={userData.department}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="department">
            Address
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="address"
            id="address"
            required
            value={userData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="department">
            Date of birth
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="dob"
            id="dob"
            required
            value={userData.dob}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="department">
            Degree of teacher
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="degree"
            id="degree"
            required
            value={userData.degree}
            onChange={handleInputChange}
          />
        </div>

        <div className="row mb-5">
          <div className="col-sm-2">
            <button type="submit" className="btn btn-outline-success btn-lg">
              Save
            </button>
          </div>

          <div className="col-sm-2">
            <Link
              to={"/profile"}
              type="submit"
              className="btn btn-outline-warning btn-lg"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfile;
