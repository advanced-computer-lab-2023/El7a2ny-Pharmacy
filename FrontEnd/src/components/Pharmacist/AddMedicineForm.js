import React, { useState } from 'react';

function AddMedicineForm() {
  const [medicine, setMedicine] = useState({
    name: '',
    activeIngredients: '',
    price: '',
    availableQuantity: '',
    image: null, // Add an 'image' property for the uploaded image
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    // If the input is of type 'file', use the 'files' property to get the uploaded file
    const newValue = type === 'file' ? files[0] : value;

    setMedicine({
      ...medicine,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can add your logic to process the form data here, e.g., validation or API call.
    console.log('Medicine Data:', medicine);

    // Reset the form fields after submission (except for the image)
    setMedicine({
      name: '',
      activeIngredients: '',
      price: '',
      availableQuantity: '',
      image: medicine.image, // Retain the uploaded image
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
          Active Ingredients:
          <input type="text" name="activeIngredients" value={medicine.activeIngredients} onChange={handleInputChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={medicine.price} onChange={handleInputChange} />
        </label>
        <label>
          Available Quantity:
          <input type="number" name="availableQuantity" value={medicine.availableQuantity} onChange={handleInputChange} />
        </label>
        <label>
          Medicine Image:
          <input type="file" name="image" onChange={handleInputChange} />
        </label>
        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
}

export default AddMedicineForm;
