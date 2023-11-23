import React, { useState } from 'react';

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('normal');
  const [error, setError] = useState('');
  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords don't match");
      }

      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          role,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail);
      }

      setError('');
      console.log('Registration successful!');
      const responseData = await response.json();
      const token = responseData.access_token;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      
    } catch (error) {
      setError(error.message);
    }
    
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="border rounded px-3 py-2 w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border rounded px-3 py-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="border rounded px-3 py-2 w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700">
            Role
          </label>
          <select
            id="role"
            className="border rounded px-3 py-2 w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="normal">Normal User</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegistrationPage;
