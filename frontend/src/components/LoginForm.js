import React, { useState } from 'react';
import { Link, Navigate} from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // The login was successful, you can redirect or handle it accordingly
        console.log('Login successful');
      } else {
        // The login failed, handle errors here
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }

    // Reset form fields after submission
    setUsername('');
    setPassword('');

  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600">
          Login
        </button>
        <p>
        Don't have an account? <Link to="/register">Register here</Link>.
      </p>
      </form>
    </div>
  );
};

export default LoginForm;
