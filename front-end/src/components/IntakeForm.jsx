import React, { useState } from 'react';

const IntakeForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    description: ''
  });

  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatusMessage('Form submitted successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          description: ''
        });
      } else {
        setStatusMessage('Error submitting form.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage('Error submitting form.');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="ontario-form-group">
        <label htmlFor="firstName" className="ontario-label">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          className="ontario-input"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="ontario-form-group">
        <label htmlFor="lastName" className="ontario-label">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          className="ontario-input"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="ontario-form-group">
        <label htmlFor="email" className="ontario-label">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className="ontario-input"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="ontario-form-group">
        <label htmlFor="description" className="ontario-label">Description of Request</label>
        <textarea
          id="description"
          name="description"
          className="ontario-input"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>
      </div>

      <button type="submit" className="ontario-button">Submit</button>

      {statusMessage && <p className="ontario-margin-top-16">{statusMessage}</p>}
    </form>
  );
};

export default IntakeForm;
