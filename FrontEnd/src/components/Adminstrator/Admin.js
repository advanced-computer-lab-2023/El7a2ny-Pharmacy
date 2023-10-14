import React, { useState } from 'react';
import axios from 'axios';
import { useState } from 'react';

const Admin = () => {
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [searchUsername, setSearchUsername] = useState('');
  const [searchType, setSearchType] = useState('patient'); 
  const [searchResults, setSearchResults] = useState(null);

  const backendURL = 'http://localhost:4000'; 

  const handleAdminUsernameChange = (e) => {
    setAdminUsername(e.target.value);
  }

  const handleAdminPasswordChange = (e) => {
    setAdminPassword(e.target.value);
  }

  const handleSearchUsernameChange = (e) => {
    setSearchUsername(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = `${backendURL}/api/administrators/add-admin`;

      const adminData = {
        username: adminUsername,
        password: adminPassword,
      };

      const response = await axios.post(apiUrl, adminData);

      if (response.status === 200) {
        console.log('Admin added successfully:', response.data);
      } else {
        console.error('Failed to add admin.');
      }
    } catch (error) {
      console.error('Error while adding admin:', error);
    }
  }

  const handleSearch = async () => {
    try {
      let apiUrl;
      if (searchType === 'patient') {
        apiUrl = `${backendURL}/api/patients/all-patients?username=${searchUsername}`;
      } else if (searchType === 'pharmacist') {
        apiUrl = `${backendURL}/api/pharmacist/all-pharmacists?username=${searchUsername}`;
      } else {
        console.error('Invalid search type');
        return;
      }

      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        setSearchResults(response.data);
      } else {
        console.error('Failed to fetch search results.');
        setSearchResults(null);
      }
    } catch (error) {
      console.error('Error while fetching search results:', error);
      setSearchResults(null);
    }
  }

  return (
    <div>
      <h2>Add an Administrator</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={adminUsername}
            onChange={handleAdminUsernameChange}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            value={adminPassword}
            onChange={handleAdminPasswordChange}
          />
        </label>
        <button type="submit">Add Administrator</button>
      </form>

      <h2>Search for Patient/Pharmacist Information</h2>
      <div>
        <input
          type="text"
          placeholder="Enter Patient/Pharmacist Username or ID"
          value={searchUsername}
          onChange={handleSearchUsernameChange}
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="patient">Patient</option>
          <option value="pharmacist">Pharmacist</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>

      {searchResults && (
  <div>
    <h3>Search Results</h3>
    {searchType === 'patient' && (
      <div>
        {searchResults.map((patient) => {
          if (patient.username === searchUsername) {
            return (
              <div key={patient._id}>
                <p>Username: {patient.username}</p>
                <p>Name: {patient.name}</p>
                <p>Email: {patient.email}</p>
                <p>Date of Birth: {new Date(patient.DOB).toDateString()}</p>
                <p>Gender: {patient.gender}</p>
                <p>Mobile Number: {patient.mobile_number}</p>
                <h4>Emergency Contact:</h4>
                <p>Name: {patient.emergency_contact.name}</p>
                <p>Mobile Number: {patient.emergency_contact.mobile_number}</p>
                <p>Relation: {patient.emergency_contact.relation}</p>
                {/* Add more patient-specific fields here */}
              </div>
            );
          }
          return null;
        })}
      </div>
    )}
    {searchType === 'pharmacist' && (
      <div>
        {searchResults.map((pharmacist) => {
          if (pharmacist.username === searchUsername) {
            return (
              <div key={pharmacist._id}>
                <p>Username: {pharmacist.username}</p>
                <p>Name: {pharmacist.name}</p>
                <p>Email: {pharmacist.email}</p>
                {pharmacist.hourlyRate ? (
              <p>Hourly Rate: ${pharmacist.hourlyRate.toFixed(2)}</p>
                ) : (
              <p>Hourly Rate: N/A</p>
                )}
                <p>Date of Birth: {new Date(pharmacist.DOB).toDateString()}</p>
                <p>Education: {pharmacist.education}</p>
                <p>Affiliation: {pharmacist.affiliation}</p>
                <p>Specialty: {pharmacist.specialty}</p>
                <p>Status: {pharmacist.status}</p>
                {/* Add more pharmacist-specific fields here */}
              </div>
            );
          }
          return null;
        })}
      </div>
    )}
  </div>
)}


    </div>
  );
}

export default Admin;
