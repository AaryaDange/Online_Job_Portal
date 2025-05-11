import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../services/userService'; // Make sure this path is correct
import { toast } from 'react-toastify';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await signIn(email, password);
      console.log('Full login response:', response);

      const token =
        response.data?.token ||
        response.data?.data?.token ||
        response.token ||
        null;

      if (!token) {
        toast.error('Token not found in response.');
        return;
      }

      localStorage.setItem('token', token);
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || 'Invalid credentials';
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      {error && <div className="alert error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn">Sign In</button>
      </form>
      <p className="auth-switch">
        Don't have an account? <span onClick={() => navigate('/signup')}>Sign Up</span>
      </p>
    </div>
  );
};

export default Signin;
