import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PatientRegistrationForm() {
  const navigate = useNavigate();

  // State to store form input values
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    DOB: '',
    gender: '',
    mobile_number: '',
    emergency_contact: {
      name: '',
      mobile_number: '',
      relation: '',
    },
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Split the name attribute into an array
    const nameArray = name.split('.');
  
    if (nameArray.length === 2) {
      // This is an emergency contact field
      setFormData({
        ...formData,
        emergency_contact: {
          ...formData.emergency_contact,
          [nameArray[1]]: value,
        },
      });
    } else {
      // This is a regular field
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  // Handle emergency contact input changes
  const handleEmergencyContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      emergency_contact: {
        ...prevData.emergency_contact,
        [name]: value,
      },
    }));
  };
  

  const backendURL = 'http://localhost:4000'; 

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send formData to your backend for patient registration
      const response = await axios.post(`${backendURL}/api/patients/register`, formData);

      if (response.status === 200) {
        console.log('Patient registration successful.');
        // After successful registration, navigate back to the login page
        navigate('/LoginPage');
      } else {
        console.error('Failed to register patient.');
      }
    } catch (error) {
      console.error('Error while registering patient:', error);
    }
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
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="DOB"
            value={formData.DOB}
            onChange={handleInputChange}
          />
        </label>
        <label>
          gender:
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Mobile Number:
          <input
            type="text"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleInputChange}
          />
        </label>
        <h3>Emergency Contact</h3>
        <label>
          Full Name:
          <input
            type="text"
            name="emergency_contact.name"
            value={formData.emergency_contact.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Contact Number:
          <input
            type="text"
            name="emergency_contact.mobile_number"
            value={formData.emergency_contact.mobile_number}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Relation to the Patient:
          <input
            type="text"
            name="emergency_contact.relation"
            value={formData.emergency_contact.relation}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Register as Patient</button>
      </form>
    </div>
  );

}

export default PatientRegistrationForm;
