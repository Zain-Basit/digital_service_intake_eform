import React, { useState } from 'react';

const IntakeForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    website: '',
    description: '',
    services: []
  });

  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState('');

  const servicesOptions = [
    'Web Development',
    'UX/UI Design',
    'Digital Strategy',
    'Content Writing',
    'SEO Optimization',
    'Branding',
    'Accessibility Review',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prevData => {
        const newServices = checked
          ? [...prevData.services, value]
          : prevData.services.filter(service => service !== value);
        return { ...prevData, services: newServices };
      });
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\+?[0-9\s\-()]{7,20}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.address.trim()) newErrors.address = 'Address is required.';
    if (!formData.company.trim()) newErrors.company = 'Company name is required.';

    if (formData.website.trim() && !/^https?:\/\/.+\..+$/.test(formData.website)) {
      newErrors.website = 'Please enter a valid website URL (starting with http:// or https://).';
    }

    if (!formData.services.length) newErrors.services = 'Please select at least one service.';
    if (!formData.description.trim()) newErrors.description = 'Description is required.';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

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
          phone: '',
          address: '',
          company: '',
          website: '',
          description: '',
          services: []
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
        {errors.firstName && <div className="ontario-label__message--error">{errors.firstName}</div>}
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
        {errors.lastName && <div className="ontario-label__message--error">{errors.lastName}</div>}
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
        {errors.email && <div className="ontario-label__message--error">{errors.email}</div>}
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
        {errors.phone && <div className="ontario-label__message--error">{errors.phone}</div>}
        <label htmlFor="phone" className="ontario-label">Phone Number</label>
        <input
          id="phone"
          name="phone"
          type="text"
          className="ontario-input"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="ontario-form-group">
        {errors.address && <div className="ontario-label__message--error">{errors.address}</div>}
        <label htmlFor="address" className="ontario-label">Address</label>
        <input
          id="address"
          name="address"
          type="text"
          className="ontario-input"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="ontario-form-group">
        {errors.company && <div className="ontario-label__message--error">{errors.company}</div>}
        <label htmlFor="company" className="ontario-label">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          className="ontario-input"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </div>

      <div className="ontario-form-group">
        {errors.website && <div className="ontario-label__message--error">{errors.website}</div>}
        <label htmlFor="website" className="ontario-label">Website</label>
        <input
          id="website"
          name="website"
          type="url"
          className="ontario-input"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      <div className="ontario-form-group">
        {errors.services && <div className="ontario-label__message--error">{errors.services}</div>}
        <fieldset className="ontario-fieldset">
          <legend className="ontario-label">Services Needed</legend>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {servicesOptions.map(service => (
              <div key={service} style={{ flex: '1 0 50%', paddingBottom: '8px' }}>
                <label>
                  <input
                    type="checkbox"
                    name="services"
                    value={service}
                    checked={formData.services.includes(service)}
                    onChange={handleChange}
                  />{' '}
                  {service}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="ontario-form-group">
        {errors.description && <div className="ontario-label__message--error">{errors.description}</div>}
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
