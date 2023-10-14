import React, { useState, useEffect } from "react";

function MedicineSreach() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const handleSearch = async () => {
    //from database
    try {
      const response = await fetch(`/api/medicines?name=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error("Failed to search for medicines.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (medicine) => {
    setSelectedMedicine(medicine);
  };

  useEffect(() => {
    if (selectedMedicine) {
      // If a medicine is selected, you can fetch its details from the backend here
      // For now, we'll assume it has been fetched and set in 'selectedMedicine'
    }
  }, [selectedMedicine]);

  return (
    <div>
      <h2>Medicine Search</h2>
      <div>
        <input
          type="text"
          placeholder="Enter name of Medicine"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {searchResults.map((medicine, index) => (
          <li key={index}>
            {medicine.name} - {medicine.price} - Sales: {medicine.sales} -
            Available Quantity: {medicine.availableQuantity} - Image: {medicine.image}
            <button onClick={() => handleEdit(medicine)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );

 }
export default MedicineSreach;