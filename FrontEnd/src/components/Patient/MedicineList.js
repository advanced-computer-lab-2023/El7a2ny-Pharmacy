import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedicinalUse, setSelectedMedicinalUse] = useState(''); // For filtering

  const backendURL = 'http://localhost:4000';
  // Fetch all medicines on initial load
  useEffect(() => {
    axios.get(`${backendURL}/api/medicine/all-medicines`)
      .then((response) => {
        setMedicines(response.data);
      })
      .catch((error) => {
        console.error('Error fetching medicines:', error);
      });
  }, []);

  // Function to search for medicines by name
  const handleSearch = () => {
    axios.get(`${backendURL}/api/medicine/all-medicines/?name=${searchQuery}`)
      .then((response) => {
        setMedicines(response.data);
      })
      .catch((error) => {
        console.error('Error searching for medicines:', error);
      });
  };

  // Function to filter medicines based on medicinal use
  const handleFilter = () => {
    axios.get(`${backendURL}/api/medicine/all-medicines/filter?medicinalUse=${selectedMedicinalUse}`)
      .then((response) => {
        setMedicines(response.data);
      })
      .catch((error) => {
        console.error('Error filtering medicines:', error);
      });
  };

  return (
    <div>
      <h2>Medicine List</h2>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <select
          value={selectedMedicinalUse}
          onChange={(e) => setSelectedMedicinalUse(e.target.value)}
        >
          <option value="">Filter by Medicinal Use</option>
          <option value="Use1">Use1</option>
          <option value="Use2">Use2</option>
          {/* Add more medicinal use options here */}
        </select>
        <button onClick={handleFilter}>Apply Filter</button>
      </div>
      <ul>
        {medicines.map((medicine) => (
          <li key={medicine.id}>
            <img src={medicine.picture} alt={medicine.name} />
            <h3>{medicine.name}</h3>
            <p>{medicine.description}</p>
            <p>Price: ${medicine.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineList;
