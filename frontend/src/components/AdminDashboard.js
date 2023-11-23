import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [existingImages, setExistingImages] = useState([]);
  const [existingLabels, setExistingLabels] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [newLabel, setNewLabel] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imagesResponse = await axios.get('http://localhost:8000/api/v1/images');
        const labelsResponse = await axios.get('http://localhost:8000/api/v1/labels');
        setExistingImages(imagesResponse.data);
        setExistingLabels(labelsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
  };

  const handleLabelChange = (e) => {
    setNewLabel(e.target.value);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', newImage);

      await axios.post('http://localhost:8000/api/v1/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Refresh the existing images list
      const updatedImagesResponse = await axios.get('http://localhost:8000/api/v1/images');
      setExistingImages(updatedImagesResponse.data);

      // Clear the new image state
      setNewImage(null);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleCreateLabel = async () => {
    try {
      const accessToken = localStorage.getItem('token');

      console.log('Sending request with token:', accessToken);

      const response = await axios.post('http://localhost:8000/api/v1/labels', { name: newLabel });

      console.log('Response:', response);

      // Refresh the existing labels list
      const updatedLabelsResponse = await axios.get('http://localhost:8000/api/v1/labels');
      setExistingLabels(updatedLabelsResponse.data);

      // Clear the new label state
      setNewLabel('');
    } catch (error) {
      console.error('Error creating label:', error);
    }
  };

  const handleDeleteLabel = async (labelName) => {
    try {
      // Send a DELETE request to the backend to delete the label
      await axios.delete(`http://localhost:8000/api/v1/labels/${labelName}`);

      // Refresh the existing labels list
      const updatedLabelsResponse = await axios.get('http://localhost:8000/api/v1/labels');
      setExistingLabels(updatedLabelsResponse.data);
    } catch (error) {
      console.error('Error deleting label:', error);
    }
  };

  const handleDeleteImage = async (filename) => {
    try {
      // Send a DELETE request to the backend to delete the image
      await axios.delete(`http://localhost:8000/api/v1/images/${filename}`);

      // Refresh the existing images list
      const updatedImagesResponse = await axios.get('http://localhost:8000/api/v1/images');
      setExistingImages(updatedImagesResponse.data);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
<div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">Admin Dashboard</div>
          {/* Add any additional navigation items or user-related info here */}
        </div>
      </nav>

<div className="container mx-auto p-4">
  <div className="mb-8">
    <h3 className="text-2xl font-bold mb-4">Existing Images</h3>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {existingImages.map((image) => (
        <li key={image.filename} className="mb-4 bg-white rounded-lg overflow-hidden shadow-md">
          <img
            src={`data:image/png;base64,${image.imageData}`}
            alt={image.filename}
            className="w-full h-48 object-contain"
          />
          <div className="p-4">
            <p className="text-xl font-bold">{image.filename}</p>
            <button
              onClick={() => handleDeleteImage(image.filename)}
              className="bg-red-500 text-white py-1 px-2 mt-2 rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>

  <div className="mb-8">
    <h3 className="text-2xl font-bold mb-4">Existing Labels</h3>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {existingLabels.map((label) => (
        <li key={label.name} className="bg-white rounded-lg overflow-hidden shadow-md p-4">
          <p className="text-xl font-bold">{label.name}</p>
          <button
            onClick={() => handleDeleteLabel(label.name)}
            className="bg-red-500 text-white py-1 px-2 mt-2 rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>

  <div className="mb-8">
    <h3 className="text-2xl font-bold mb-4">Upload New Image</h3>
    <div className="flex items-center">
      <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2 p-2 border border-gray-300 rounded-l" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded-r hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        Upload
      </button>
    </div>
  </div>

  <div>
    <h3 className="text-2xl font-bold mb-4">Create New Label</h3>
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Enter label"
        value={newLabel}
        onChange={handleLabelChange}
        className="mb-2 p-2 border border-gray-300 rounded-l"
      />
      <button
        onClick={handleCreateLabel}
        className="bg-green-500 text-white py-2 px-4 rounded-r hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800"
      >
        Create Label
      </button>
    </div>
  </div>
</div>
</div>
  );
};

export default AdminDashboard;