import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PharmacistRegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    DOB: '',
    hourlyRate: '',
    affiliation: '',
    education: '',
    status: 'Pending', // Default status
    speciality: '', 
  });

  const backendURL = 'http://localhost:4000';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the pharmacist registration request to the backend
      const response = await axios.post(`${backendURL}/api/pharmacist/register-request`, formData);

      if (response.status === 200) {
        console.log('Pharmacist registration request successful.');
        navigate('/'); // Navigate to the home page
      } else {
        console.error('Failed to register pharmacist.');
      }
    } catch (error) {
      console.error('Error while registering pharmacist:', error);
    }
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
          Hourly Rate:
          <input
            type="number"
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
            name="education"
            value={formData.education}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Speciality:
          <input
            type="text"
            name="speciality"
            value={formData.speciality}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PharmacistRegistrationForm;
