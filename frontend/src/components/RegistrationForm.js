import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // TODO: Send registration data to the backend
    // You can use a similar fetch approach as in the login form

    // Reset form fields and error state after successful registration
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setError('');

    // Set registrationComplete to trigger the redirection
    setRegistrationComplete(true);
  };

  if (registrationComplete) {
    // Redirect to the admin dashboard
    return <Navigate to="/admin-dashboard" replace />;
  }

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
