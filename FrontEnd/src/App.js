import logo from './logo.svg';
import React from 'react';
import './App.css';
import PatientRegistrationForm from './components/PatientRegistrationForm';
import LoginPage from './components/LoginPage';
import AppRouter from './AppRouter'; // Import the AppRouter component

function App() {
  return (
    <div className="App">
      <AppRouter /> {/* Render the AppRouter component */}
    </div>
  );
}

export default App;
