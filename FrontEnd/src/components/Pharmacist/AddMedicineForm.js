import React, { useState } from 'react';
import axios from 'axios';

function AddMedicineForm() {
  const [medicine, setMedicine] = useState({
    name: '',
    pictureUrl: '',
    price: '',
    quantity: '',
    
  });

  // Define your backend URL
  const backendURL = 'http://localhost:4000'; 
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    // If the input is of type 'file', use the 'files' property to get the uploaded file
    const newValue = type === 'file' ? files[0] : value;

    setMedicine({
      ...medicine,
      [name]: newValue,
    });
  };

  const submitMedicine = async () => {
    try {
      const apiUrl = `${backendURL}/api/medicine/add-medicine`;

      const response = await axios.post(apiUrl, medicine);

      if (response.status === 200) {
        console.log('Medicine added successfully:', response.data);
        // Reset the form fields after submission
        setMedicine({
          name: '',
          pictureUrl: '',
          price: '',
          quantity: '',
          
        });
      } else {
        console.error('Failed to add medicine:', response);
      }
    } catch (error) {
      console.error('Error while adding medicine:', error);
    }
  };

  const addMedicine = async () => {
    try {
      // Define the API endpoint where you want to send the data
      const apiUrl = `${backendURL}/api/medicine/add-medicine`;

      // Send a POST request with the medicine data
      const response = await axios.post(apiUrl, medicine);

      if (response.status === 200) {
        // Successfully added the medicine
        console.log('Medicine added successfully:', response.data);
        // You can add further logic, such as displaying a success message or redirecting the user.
      } else {
        console.error('Failed to add medicine.');
        // Handle the error, e.g., display an error message to the user.
      }
    } catch (error) {
      console.error('Error while adding medicine:', error);
      // Handle network errors or other issues.
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMedicine();
    // Reset the form fields here or add other logic as needed.
    setMedicine({
      name: '',
      pictureUrl: '',
      price: '',
      quantity: '',
      
    });
  };

  

  return (
    <div>
      <h2>Add Medicine</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Medicine Name:
          <input type="text" name="name" value={medicine.name} onChange={handleInputChange} />
        </label>
        <label>
          Picture Url:
          <input type="text" name="pictureUrl" value={medicine.pictureUrl} onChange={handleInputChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={medicine.price} onChange={handleInputChange} />
        </label>
        <label>
          Available Quantity:
          <input type="number" name="quantity" value={medicine.quantity} onChange={handleInputChange} />
        </label>
        
        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
}

export default AddMedicineForm;
