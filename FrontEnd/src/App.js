import logo from './logo.svg';
import React from 'react';
import './App.css';
import PatientRegistrationForm from './components/PatientRegistrationForm';
import LoginPage from './components/LoginPage';
import AppRouter from './AppRouter'; // Import the AppRouter component
import Admin from './components/Adminstrator/Admin';
import AddMedicineForm from './components/Pharmacist/AddMedicineForm';
import MedicineEditor from './components/Pharmacist/MedicineEditor';

function App() {
  return (
    <div className="App">
      <MedicineEditor /> {/* Render the AppRouter component */}
    </div>
  );
}

export default App;
