import { useState } from 'react';

const Feedback = () => {
  const [feedback, setFeedback] = useState({
    firstName: '',
    lastName: '',
    email: '',
    rating: '5',
    comments: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedback);
    setSubmitted(true);
    setFeedback({
      firstName: '',
      lastName: '',
      email: '',
      rating: '5',
      comments: ''
    });
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: 'rgb(0, 35, 34)',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    color: 'rgb(227, 246, 234)'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgb(227, 246, 234)'
  };

  const inputStyle = {
    backgroundColor:'rgb(73, 91, 86)',
    width: '100%',
    maxWidth: '300px',
    padding: '10px',
    margin: '8px 0',
    borderRadius: '4px',
    border: '1px solid ',
    fontSize: '16px',
    color: 'rgb(227, 246, 234)'
    
  };

  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor:'rgb(227, 246, 234)',
    color: 'black',
    
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
    width: '150px',
    
  };

  const ratingContainer = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    margin: '10px 0',
    fontSize:'20px'
  };

  const radioLabel = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  if (submitted) {
    return (
      <div style={containerStyle}>
        <h2>Thank You!</h2>
        <p>Your feedback has been submitted successfully.</p>
        <button onClick={() => setSubmitted(false)} style={buttonStyle}>
          Submit Another Feedback
        </button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2>Share Your Feedback</h2>
      <p>Help us improve our job portal by sharing your experience</p>

      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          name="firstName"
          value={feedback.firstName}
          onChange={handleChange}
          required
          placeholder="First Name"
          style={inputStyle}
        />
        <input
          type="text"
          name="lastName"
          value={feedback.lastName}
          onChange={handleChange}
          required
          placeholder="Last Name"
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          value={feedback.email}
          onChange={handleChange}
          required
          placeholder="Email"
          style={inputStyle}
        />

        <div style={ratingContainer}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <label key={rating} style={radioLabel}>
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={feedback.rating === rating.toString()}
                onChange={handleChange}
              />
              {rating}
            </label>
          ))}
        </div>

        <textarea
          name="comments"
          value={feedback.comments}
          onChange={handleChange}
          rows="4"
          required
          placeholder="Your comments"
          style={{ ...inputStyle, height: '100px' }}
        />

        <button type="submit" style={buttonStyle}>Submit</button>
      </form>
    </div>
  );
};

export default Feedback;