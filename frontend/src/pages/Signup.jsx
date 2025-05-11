import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/userService';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [userData, setUserData] = useState({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const dataToSubmit = { ...userData, role: 0 }; // Set default role (e.g., 0 for candidate)

    try {
      const response = await signup(dataToSubmit);

      if (response.status === 200) {
        toast.success('User registered successfully!');
        setUserData({
          id: '',
          firstname: '',
          lastname: '',
          email: '',
          password: '',
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error.response?.data);
      const errorMsg = error.response?.data?.message || 'Something went wrong.';
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <div className="alert error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={userData.id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstname"
            value={userData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={userData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">Sign Up</button>
      </form>
      <p className="auth-switch">
        Already have an account?{' '}
        <span onClick={() => navigate('/signin')}>Sign In</span>
      </p>
    </div>
  );
};

export default SignUp;
