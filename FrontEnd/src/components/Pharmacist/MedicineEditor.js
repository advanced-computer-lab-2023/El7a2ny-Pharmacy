import React, { useState, useEffect } from 'react';

function MedicineEditor() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const handleSearch = async () => {
    // Send a GET request to your backend to search for medicines by name
    try {
      const response = await fetch(`/api/medicines?name=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error('Failed to search for medicines.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (medicine) => {
    setSelectedMedicine(medicine);
  };

  const handleUpdate = async () => {
    // Calculate sales and available quantity
    const updatedMedicine = {
      ...selectedMedicine,
      sales: selectedMedicine.sales + 1, // Increment sales by 1
      availableQuantity: selectedMedicine.availableQuantity - 1, // Decrement available quantity by 1
    };

    // Send a PUT request to your backend to update medicine details and price
    try {
      const response = await fetch(`/api/medicines/${updatedMedicine.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMedicine),
      });

      if (response.ok) {
        console.log('Medicine details updated successfully.');
        setSelectedMedicine(updatedMedicine);
      } else {
        console.error('Failed to update medicine details.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedMedicine) {
      // If a medicine is selected, you can fetch its details from the backend here
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
            {medicine.name} - {medicine.price} - Sales: {medicine.sales} - Available Quantity: {medicine.availableQuantity}
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
