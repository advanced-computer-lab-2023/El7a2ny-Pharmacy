import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handlePatientRegistration = () => {
    navigate('/patient-registration');
  };

  const handlePharmacistRegistration = () => {
    navigate('/pharmacist-registration');
  };

  const handleLogin = () => {
    // Handle login logic here, e.g., sending a request to authenticate
    // You can access the username and password state variables here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="button" onClick={handleLogin}>Login</button>

      {/* Registration buttons */}
      <div>
        <h3>Register as:</h3>
        <button onClick={handlePatientRegistration}>Register as a Patient</button>
        <button onClick={handlePharmacistRegistration}>Register as a Pharmacist</button>
      </div>
    </div>
  );
}

export default LoginPage;
