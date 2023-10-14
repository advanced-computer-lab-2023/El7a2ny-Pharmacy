import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {

  // Define your backend URL
  const backendURL = 'http://localhost:4000'; // Replace with your backend URL

  const [patient, setPatient] = useState(null);

  const [pharmacist, setPharmacist] = useState(null);

  const [admin, setAdmin] = useState(null);

  const showPat = async () => {
    try{
      const apiUrl = `${backendURL}/api/Patient/all-patients`;

      const response = await axios.get(apiUrl, getPatients);
      if (response.status === 200) {

      }
      else {
        console.error('Failed to showing patients:', response);
      }
    }
    catch (error) {
      console.error('Error while showing patients:', error);
    }
  }

  const showPharma = async () => {
    try{
      const apiUrl = `${backendURL}/api/Pharmacist/all-pharmacists`;

      const response = await axios.get(apiUrl, getPharmacist);

      if (response.status === 200) {

      }
      else {
        console.error('Failed to showing Pharmacists:', response);
      }
    }
    catch (error) {
      console.error('Error while showing Pharmacists:', error);
    }
  }

  const addAdmin1 = async () => {
    try {
      const apiUrl = `${backendURL}/api/Admins/add-admin`;

      const response = await axios.post(apiUrl, addAdmin);

      if (response.status === 200) {
        console.log('Admin added successfully:', response.data);
      } else {
        console.error('Failed to add admin.');
      }
    } catch (error) {
      console.error('Error while adding admin:', error);
    }
  }

  const removePatient1 = async () => {
    try {
      const apiUrl = `${backendURL}/api/Patient/remove-patient`;

      const response = await axios.delete(apiUrl, removePatient);

      if (response.status === 200) {
        console.log('Patient removed successfully:', response.data);
      } else {
        console.error('Failed to remove Patient.');
      }
    } catch (error) {
      console.error('Error while removeing Patient:', error);
    }
  }

  const removePharmacist1 = async () => {
    try {
      const apiUrl = `${backendURL}/api/Pharmacist/remove-pharmacist`;

      const response = await axios.delete(apiUrl, removePharmacist);

      if (response.status === 200) {
        console.log('Pharmacist removed successfully:', response.data);
      } else {
        console.error('Failed to remove Pharmacist.');
      }
    } catch (error) {
      console.error('Error while removeing Pharmacist:', error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addAdmin1();
  }


  return (
    <>
        <div id='admin-head'></div>

        <div id='admin-control-panel'>

          <form id='add-admin' onSubmit={handleSubmit}>
            <h2>Add an Admin</h2>

            <input type="text" placeholder="User name" name="username" id="username"></input>
            <input type="password" placeholder="Password" name="password" id="password"></input>
            <input type="submit" id="submit"></input>
            <label for="submit">SUBMIT</label>
          </form>

          <form id='admin-remove' onSubmit={handleSubmit}>
            <h2>Remove a Pharmacist or Patient</h2>

            <input type="radio" id="Pharmacist" name="pha-or-pat" value="Pharmacist"></input>
            <label for="Pharmacist">Pharmacist</label><br></br>

            <input type="radio" id="Patient" name="pha-or-pat" value="Patient"></input>
            <label for="Patient">Patient</label><br></br>

            <input type="text" placeholder="User name" name="username" id="username"></input>
            <input type="password" placeholder="Password" name="password" id="password"></input>
            <input type="submit" id="submit"></input>
            <label for="submit">SUBMIT</label>
          </form>

        </div>

        <div id='admin-info-board'>
          <div id='admin-joining-req'> {/* Should be rendered dynamicly */}

            <div id='joining-req-card'>
              <div className='joining-data'></div>
              <div className='joining-accept-btn'><input type="button" onClick={console.log("Accepted")} value="Accept" id="" ></input></div>
              <div className='joining-reject-btn'><input type="button" onClick={console.log("Rejected")} value="Reject" id=""></input></div>
            </div>

          </div>

<br></br>
{React.useEffect(() => {
    axios.get(backendURL).then((response) => {
      setPatient(response.data);
    });
  }, [])}
          <div id='admin-patient-view'>
            <div id='admin-patient-data'>
              <h3>Patients</h3>
              <ul>
                <li>{patient.username} {patient.password}</li>
              </ul>
            </div>
          </div>

          
  {React.useEffect(() => {
    axios.get(backendURL).then((response) => {
      setPharmacist(response.data);
    });
  }, [])}
          
          <div id='admin-pharmacist-view'>
            <div id='admin-pharmacist-data'>
              <h3>Pharmacist</h3>
              <ul>
                <li>{pharmacist.username} {pharmacist.password}</li>
              </ul>
            </div>
          </div>
        </div>
        
        
    </>
  )
}

export default Admin