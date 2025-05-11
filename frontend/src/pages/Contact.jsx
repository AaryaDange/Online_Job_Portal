import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      setError('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email.');
      return;
    }

    setSubmitted(true);
    setError('');
  };

  return (
    <div className="auth-container">
      <h2>Contact Us</h2>
      {submitted ? (
        <p style={{ color: 'var(--primary)' }}>Thank you for contacting us!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <div className="alert error">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input className='textar'
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              placeholder="Your Message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'rgb(73, 91, 86)',
                color: 'var(--text-light)',
                resize: 'vertical',
              }}
            />
          </div>

          <button type="submit" className="btn">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactUs;
