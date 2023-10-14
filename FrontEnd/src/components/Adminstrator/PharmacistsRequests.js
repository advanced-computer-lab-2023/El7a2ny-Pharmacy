import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PharmacistRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch pharmacist requests from the backend
    axios.get('http://localhost:4000/api/pharmacist/pending')
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching pharmacist requests:', error);
      });
  }, []);

  const handleApproveRequest = (requestId) => {
    // Send a request to the backend to approve the pharmacist request
          
        const newStatus = 'approved'; // The new approval status

        axios.patch(`http://localhost:4000/api/pharmacist/update-pharmacist/${requestId}`, { status: newStatus })
        .then((response) => {
            if (response.status === 200) {
            console.log('Request updated successfully');
            } else {
            console.error('Failed to update pharmacist request.');
            }
        })
        .catch((error) => {
            console.error('Error while updating pharmacist request:', error);
        });

  };

  return (
    <div>
      <h2>Pharmacist Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Hourly Rate</th>
            <th>Date Of Birth</th>
            <th>Education</th>
            <th>Affiliation</th>
            <th>Speciality</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td>{request.username}</td>
              <td>{request.name}</td>
              <td>{request.email}</td>
              <td>{request.hourlyRate}</td>
              <td>{request.DOB}</td>
              <td>{request.education}</td>
              <td>{request.affiliation}</td>
              <td>{request.speciality}</td>
              <td>{request.status}</td>
              <td>
                {request.status === 'pending' && (
                  <button onClick={() => handleApproveRequest(request._id)}>
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PharmacistRequests;
