// src/components/PharmacistRegistrationForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PharmacistRegistrationForm() {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    hourlyRate: '',
    affiliation: '',
    educationalBackground: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

   const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to your backend for pharmacist registration
    console.log(formData);

    // After successful registration, navigate back to the login page
    navigate('/');
  };

  return (
    <div>
      <h2>Pharmacist Registration</h2>
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
          Hourly Rate:
          <input
            type="text"
            name="hourlyRate"
            value={formData.hourlyRate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Affiliation (Hospital):
          <input
            type="text"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Educational Background:
          <textarea
            name="educationalBackground"
            value={formData.educationalBackground}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default PharmacistRegistrationForm;
