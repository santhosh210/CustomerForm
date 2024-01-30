import React, { useState, useEffect } from "react";
import './CustomerForm.css';

const CustomerForm = () => {
  const [customer, setCustomer] = useState({
    name: '',
    employeeId: '',
    city: '',
    gender: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('customer', JSON.stringify(customer));
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCityChange = (e) => {
    setCustomer({ ...customer, city: e.target.value });
  };

  const handleGenderChange = (e) => {
    setCustomer({ ...customer, gender: e.target.value });
  };

  useEffect(() => {
    // Load data from local storage on component mount
    const savedCustomer = JSON.parse(localStorage.getItem('customer'));
    if (savedCustomer) {
      setCustomer(savedCustomer);
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          placeholder=" Enter Name "
          id="name"
          name="name"
          value={customer.name}
          onChange={handleChange}
          readOnly={!isEditing}
          required
          onClick={handleEdit}
        />
        <br />
        <label htmlFor="employeeId">Employee ID:</label>
        <input
          type="number"
          placeholder=" Enter Employee ID "
          id="employeeId"
          name="employeeId"
          value={customer.employeeId}
          onChange={handleChange}
          readOnly={!isEditing}
          required
        />
        <br />
        <label htmlFor="city">City:</label>
        <select id="city" name="city" value={customer.city} onChange={handleCityChange} required>
          <option value="">Select City </option>
          <option value="New York">New York</option>
          <option value="London">London</option>
          <option value="Tokyo">Tokyo</option>
        </select>
        <br />
        <label htmlFor="gender">Gender:</label>
        <label htmlFor="male">
          <input
            type="radio"
            id="male"
            name="gender"
            value="Male"
            checked={customer.gender === 'Male'}
            onChange={handleGenderChange}
            required
          />{' '}
          Male
        </label>
        <label htmlFor="female">
          <input
            type="radio"
            id="female"
            name="gender"
            value="Female"
            checked={customer.gender === 'Female'}
            onChange={handleGenderChange}
            required
          />{' '}
          Female
        </label>
        <br />
        {isEditing ? (
          <button type="submit">Save</button>
        ) : (
          <button type="button" onClick={handleEdit}>
            Edit
          </button>
        )}
      </form>
      {customer && (
        <div>
          <p>Name: {customer.name}</p>
          <p>Employee ID: {customer.employeeId}</p>
          <p>City: {customer.city}</p>
          <p>Gender: {customer.gender}</p>
        </div>
      )}
    </div>
  )
}

export default CustomerForm;
