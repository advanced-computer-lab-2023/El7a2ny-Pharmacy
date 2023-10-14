import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MedicineEditor() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const backendURL = 'http://localhost:4000'; // Replace with your backend URL

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/medicine/all-medicines?name=${searchQuery}`);
      if (response.status === 200) {
        setSearchResults(response.data);
      } else {
        console.error('Failed to search for medicines.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (medicine) => {
    setSelectedMedicine({ ...medicine, id: medicine._id }); // Use "_id" as the property name
  };
  

  const handleUpdate = async () => {
    
    try {
      const updateMedicine = {
        ...selectedMedicine,
        
      };

      const response = await axios.patch(`${backendURL}/api/medicine/update-medicine/${updateMedicine.id}`, updateMedicine);

      if (response.status === 200) {
        console.log('Medicine details updated successfully.');
        setSelectedMedicine(updateMedicine);
      } else {
        console.error('Failed to update medicine details.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedMedicine) {
      // If a medicine is selected, you can fetch its details from the backend here using Axios
      // For now, we'll assume it has been fetched and set in 'selectedMedicine'
    }
  }, [selectedMedicine]);

  return (
    <div>
      <h2>Search and Edit Medicine</h2>
      <div>
        <input
          type="text"
          placeholder="Search by medicine name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {searchResults.map((medicine, index) => (
          <li key={index}>
            {medicine.name} - {medicine.price} - Sales: {medicine.sales} - Available Quantity: {medicine.quantity}
            <button onClick={() => handleEdit(medicine)}>Edit</button>
          </li>
        ))}
      </ul>
      {selectedMedicine && (
        <div>
          <h3>Edit Medicine Details</h3>
          <label>
            Medicine Name:
            <input
              type="text"
              name="name"
              value={selectedMedicine.name}
              onChange={(e) =>
                setSelectedMedicine({ ...selectedMedicine, name: e.target.value })
              }
            />
          </label>
          <label>
            Active Ingredients:
            <input
              type="text"
              name="activeIngredients"
              value={selectedMedicine.activeIngredients}
              onChange={(e) =>
                setSelectedMedicine({ ...selectedMedicine, activeIngredients: e.target.value })
              }
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={selectedMedicine.price}
              onChange={(e) =>
                setSelectedMedicine({ ...selectedMedicine, price: e.target.value })
              }
            />
          </label>
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
}

export default MedicineEditor;
