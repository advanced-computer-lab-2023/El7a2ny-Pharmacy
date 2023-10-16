import React, { useState } from 'react';
import axios from 'axios';

const RemoveUser = () => {
  const [patientId, setPatientId] = useState(''); 
  const [pharmacistId, setPharmacistId] = useState('');
  const [removed, setRemoved] = useState(false);

  const backendURL = 'http://localhost:4000'; 


  const handlePatientIdChange = (e) => {
    setPatientId(e.target.value); // Update patientId state
  }

  const handlePharmacistIdChange = (e) => {
    setPharmacistId(e.target.value); // Update pharmacistId state
  }


  const handleRemovePatient = async (id) => {
    try {
      const apiUrl = `${backendURL}/api/patients/remove-patient/${id}`;

      const response = await axios.delete(apiUrl);

      if (response.status === 200) {
        console.log('Patient removed successfully');
        
      } else {
        console.error('Failed to remove patient.');
      }
    } catch (error) {
      console.error('Error while removing patient:', error);
    }
  }

  const handleRemovePharmacist = async (id) => {
    try {
      const apiUrl = `${backendURL}/api/pharmacists/remove-pharmacist/${id}`;

      const response = await axios.delete(apiUrl);

      if (response.status === 200) {
        console.log('Pharmacist removed successfully');
        
      } else {
        console.error('Failed to remove pharmacist.');
      }
    } catch (error) {
      console.error('Error while removing pharmacist:', error);
    }
  }

  return (
    <div>
      <h2>Remove Patient by ID</h2>
      <label>
        Patient ID:
        <input
          type="text"
          value={patientId}
          onChange={handlePatientIdChange}
        />
      </label>
      <button onClick={() => handleRemovePatient(patientId)}>Remove Patient</button>

      <h2>Remove Pharmacist by ID</h2>
      <label>
        Pharmacist ID:
        <input
          type="text"
          value={pharmacistId}
          onChange={handlePharmacistIdChange}
        />
      </label>
      <button onClick={() => handleRemovePharmacist(pharmacistId)}>Remove Pharmacist</button>

      {removed && <p>User removed successfully.</p>}
    </div>
  );
}

export default RemoveUser;
