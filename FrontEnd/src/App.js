import logo from './logo.svg';
import React from 'react';
import './App.css';
import PatientRegistrationForm from './components/PatientRegistrationForm';
import LoginPage from './components/LoginPage';
import AppRouter from './AppRouter';
import Admin from './components/Adminstrator/Admin';
import AddMedicineForm from './components/Pharmacist/AddMedicineForm';
import MedicineEditor from './components/Pharmacist/MedicineEditor';
import RemoveUser from './components/Adminstrator/RemoveUser';
import PharmacistRequests from './components/Adminstrator/PharmacistsRequests';
import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState("");

  return (
    <div className="App">
      <Admin /> {/* Render the AppRouter component */}
    </div>
  );
}

export default App;
