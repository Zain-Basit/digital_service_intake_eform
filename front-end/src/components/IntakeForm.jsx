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
    services: [],
    serviceDetails: {},
    stakeholders: []
  });

    const [numStakeholders, setNumStakeholders] = useState(0);
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

        const newServiceDetails = { ...prevData.serviceDetails };
        if (!checked) delete newServiceDetails[value];

        return {
          ...prevData,
          services: newServices,
          serviceDetails: newServiceDetails
        };
      });
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleServiceDetailChange = (service, value) => {
    setFormData(prevData => ({
      ...prevData,
      serviceDetails: {
        ...prevData.serviceDetails,
        [service]: value
      }
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        setFormData(prevData => ({
          ...prevData,
          ...json,
          services: Array.isArray(json.services) ? json.services : [],
          serviceDetails: typeof json.serviceDetails === 'object' ? json.serviceDetails : {}
        }));
      } catch (error) {
        console.error('Invalid JSON file:', error);
        setStatusMessage('Failed to load JSON: Invalid format.');
      }
    };

    reader.readAsText(file);
  };

  
  const handleStakeholderChange = (index, field, value) => {
    const updated = [...formData.stakeholders];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, stakeholders: updated }));
  };

  const handleNumStakeholdersChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setNumStakeholders(count);
    const stakeholdersArray = Array.from({ length: count }, (_, i) => formData.stakeholders?.[i] || { name: '', role: '', email: '' });
    setFormData(prev => ({ ...prev, stakeholders: stakeholdersArray }));
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

    if (formData.stakeholders.length > 0) {
      newErrors.stakeholders = [];
      formData.stakeholders.forEach((s, i) => {
        const entryErrors = {};
        if (!s.name?.trim()) entryErrors.name = 'Name is required.';
        if (!s.role?.trim()) entryErrors.role = 'Role is required.';
        if (!s.email?.trim()) {
          entryErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(s.email)) {
          entryErrors.email = 'Please enter a valid email.';
        }
        newErrors.stakeholders[i] = entryErrors;
      });
    }

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
          services: [],
          serviceDetails: {},
    stakeholders: []
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
        <label htmlFor="fileUpload" className="ontario-label">Prefill Form from JSON</label>
        <input
          id="fileUpload"
          type="file"
          accept=".json"
          className="ontario-input"
          onChange={handleFileUpload}
        />
      </div>

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

                {formData.services.includes(service) && (
                  <div className="ontario-form-group" style={{ marginTop: '8px' }}>
                    <label htmlFor={`serviceDetail-${service}`} className="ontario-label">
                      Please describe your need for {service}:
                    </label>
                    <textarea
                      id={`serviceDetail-${service}`}
                      className="ontario-input"
                      rows="3"
                      value={formData.serviceDetails[service] || ''}
                      onChange={(e) => handleServiceDetailChange(service, e.target.value)}
                    ></textarea>
                  </div>
                )}
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

      
      <div className="ontario-form-group">
        <label htmlFor="numStakeholders" className="ontario-label">Number of Stakeholders</label>
        <input
          id="numStakeholders"
          type="number"
          min="0"
          className="ontario-input"
          value={numStakeholders}
          onChange={handleNumStakeholdersChange}
        />
      </div>

      {formData.stakeholders?.map((stakeholder, index) => (
        <fieldset key={index} className="ontario-form-group">
          <legend className="ontario-label">Stakeholder {index + 1}</legend>
          <div className="ontario-form-group">
            {errors[`stakeholder-${index}-name`] && <div className="ontario-label__message--error">{errors[`stakeholder-${index}-name`]}</div>}
<label className="ontario-label" htmlFor={`stakeholder-name-${index}`}>Name (required)</label>
            <input
              id={`stakeholder-name-${index}`}
              className="ontario-input"
              value={stakeholder.name}
              onChange={e => handleStakeholderChange(index, 'name', e.target.value)}
            />
          </div>
          <div className="ontario-form-group">
            {errors[`stakeholder-${index}-role`] && <div className="ontario-label__message--error">{errors[`stakeholder-${index}-role`]}</div>}
<label className="ontario-label" htmlFor={`stakeholder-role-${index}`}>Role (required)</label>
            <input
              id={`stakeholder-role-${index}`}
              className="ontario-input"
              value={stakeholder.role}
              onChange={e => handleStakeholderChange(index, 'role', e.target.value)}
            />
          </div>
          <div className="ontario-form-group">
            {errors[`stakeholder-${index}-email`] && <div className="ontario-label__message--error">{errors[`stakeholder-${index}-email`]}</div>}
<label className="ontario-label" htmlFor={`stakeholder-email-${index}`}>Email (required)</label>
            <input
              id={`stakeholder-email-${index}`}
              className="ontario-input"
              value={stakeholder.email}
              onChange={e => handleStakeholderChange(index, 'email', e.target.value)}
            />
          </div>
        </fieldset>
      ))}

      <button type="submit" className="ontario-button">Submit</button>
      {statusMessage && <p className="ontario-margin-top-16">{statusMessage}</p>}
    </form>
  );
};

export default IntakeForm;
