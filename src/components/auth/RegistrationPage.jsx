import React, { useState } from "react";
import UserService from "../service/UserService";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    city: "",
    contract: "",
    phone: "",
    address: "",
    department: "",
    dob: "",
    degree: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the register method from UserService

      const token = localStorage.getItem("token");
      await UserService.register(formData, token);

      // Clear the form fields after successful registration
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
        city: "",
        contract: "",
        phone: "",
        address: "",
        department: "",
        dob: "",
        degree: "",
      });
      alert("User registered successfully");
      navigate("/admin/user-management");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred while registering user");
    }
  };

  return (
    <div className="auth-container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            placeholder="Enter your role"
            required
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Enter your city"
            required
          />
        </div>
        <div className="form-group">
          <label>Contract:</label>
          <input
            type="text"
            name="contract"
            value={formData.contract}
            onChange={handleInputChange}
            placeholder="Enter your contract"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone"
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter your address"
            required
          />
        </div>
        <div className="form-group">
          <label>department:</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            placeholder="Enter your department"
            required
          />
        </div>
        <div className="form-group">
          <label>Birthday:</label>
          <input
            type="text"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            placeholder="Enter your birthday"
            required
          />
        </div>
        <div className="form-group">
          <label>Degree:</label>
          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleInputChange}
            placeholder="Enter your degree"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
