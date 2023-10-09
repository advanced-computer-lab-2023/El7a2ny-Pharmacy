// src/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import PatientRegistrationForm from './components/PatientRegistrationForm';
import PharmacistRegistrationForm from './components/PharmacistRegistrationForm';

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Set the empty string route to LoginPage */}
        <Route path="" element={<LoginPage />} />
        <Route path="/patient-registration" element={<PatientRegistrationForm />} />
        <Route path="/pharmacist-registration" element={<PharmacistRegistrationForm />} />
        {/* Add routes for other components/pages here */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
