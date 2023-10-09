// src/components/PatientRegistrationForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PatientRegistrationForm() {
    const navigate = useNavigate();
  // State to store form input values
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    gender: '',
    mobileNumber: '',
    emergencyContact: {
      fullName: '',
      contactNumber: '',
      relation: '',
    },
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle emergency contact input changes
  const handleEmergencyContactChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      emergencyContact: {
        ...formData.emergencyContact,
        [name]: value,
      },
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to your backend for patient registration
    console.log(formData);
    
    // After successful registration, navigate back to the login page
    navigate('/');
  };

  return (
    <div>
      <h2>Patient Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          Mobile Number:
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
          />
        </label>
        <h3>Emergency Contact</h3>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.emergencyContact.fullName}
            onChange={handleEmergencyContactChange}
          />
        </label>
        <label>
          Contact Number:
          <input
            type="tel"
            name="contactNumber"
            value={formData.emergencyContact.contactNumber}
            onChange={handleEmergencyContactChange}
          />
        </label>
        <label>
          Relation to the Patient:
          <input
            type="text"
            name="relation"
            value={formData.emergencyContact.relation}
            onChange={handleEmergencyContactChange}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>Register as Patient</button>
      </form>
    </div>
  );
}

export default PatientRegistrationForm;
