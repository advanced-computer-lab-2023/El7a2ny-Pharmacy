import React, { useState, useEffect } from 'react';

function MedicineFilterBrowse() {
  const [medicines, setMedicines] = useState([]);
  const [medicalUseFilter, setMedicalUseFilter] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState([]);

  useEffect(() => {
    //from database
    fetch('/api/medicines')
      .then((response) => response.json())
      .then((data) => {
        setMedicines(data);
        setFilteredMedicines(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    //Backend
    const filteredResults = medicines.filter((medicine) =>
      !medicalUseFilter || medicine.medicalUse === medicalUseFilter
    );

    setFilteredMedicines(filteredResults);
  }, [medicalUseFilter, medicines]);

  return (
    <div>
      <h1>Medicine List</h1>
      <div>
        <label>Filter by Medical Use:</label>
        <select
          value={medicalUseFilter}
          onChange={(e) => setMedicalUseFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="medicalUse1">Medical Use 1</option>
          <option value="medicalUse2">Medical Use 2</option>
          <option value="medicalUse3">Medical Use 3</option>
          //add options from database
        </select>
      </div>
      <ul>
        {filteredMedicines.map((medicine) => (
          <li key={medicine.id}>
            <h2>{medicine.name}</h2>
            <p>Price: ${medicine.price}</p>
            <p>ActiveIngredient: {medicine.activeIngredients}</p>
            <p>Description: {medicine.description}</p>
            <img src={medicine.image} alt={medicine.name} style={{ maxWidth: '250px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MedicineFilterBrowse;

