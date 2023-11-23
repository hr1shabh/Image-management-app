import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [images, setImages] = useState([]);
  const [predefinedLabels, setPredefinedLabels] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState({});
  const [filteredImages, setFilteredImages] = useState(images);
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    // Fetch images from the backend API
    const fetchImages = async () => {
      try {
        const imagesResponse = await fetch('http://localhost:8000/api/v1/images');
        const labelsResponse = await fetch('http://localhost:8000/api/v1/labels');

        if (!imagesResponse.ok || !labelsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const imagesData = await imagesResponse.json();
        const labelsData = await labelsResponse.json();

        setImages(imagesData);
        setPredefinedLabels(labelsData);

        // Initialize selectedLabels with an empty object
        const initialSelectedLabels = {};
        imagesData.forEach((image) => {
          initialSelectedLabels[image.filename] = [];
        });
        setSelectedLabels(initialSelectedLabels);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    // Apply the filter when selectedFilter changes
    if (selectedFilter) {
      const filtered = images.filter((image) => selectedLabels[image.filename]?.includes(selectedFilter));
      setFilteredImages(filtered);
    } else {
      // If no filter is selected, show all images
      setFilteredImages(images);
    }
  }, [selectedFilter, selectedLabels, images]);

  const handleAddLabel = (imageName, selected) => {
    setSelectedLabels((prevSelectedLabels) => ({
      ...prevSelectedLabels,
      [imageName]: [...new Set([...prevSelectedLabels[imageName], ...selected])],
    }));
  };

  const handleDeleteLabel = (imageName, labelToDelete) => {
    setSelectedLabels((prevSelectedLabels) => ({
      ...prevSelectedLabels,
      [imageName]: prevSelectedLabels[imageName].filter((label) => label !== labelToDelete),
    }));
  };

  return (
    <div >
      <nav className="bg-blue-500 p-4 mb-4 w-full">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Image Dashboard</h1>
          <div>
            <label htmlFor="filterSelect" className="mr-2 text-white text-sm font-semibold">
              Filter Images:
            </label>
            <select
              id="filterSelect"
              className="border rounded p-2"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="">All</option>
              {predefinedLabels.map((label) => (
                <option key={label.id} value={label.name}>
                  {label.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>
      <div className="grid grid-cols-3 gap-4">
        {filteredImages.map((image) => (
          <div key={image.id} className="border rounded overflow-hidden">
            <img
              src={`data:image/png;base64,${image.imageData}`}
              alt={image.filename}
              className="w-full h-48 object-contain"
            />
            <div className="p-4">
              <p className="text-gray-700 font-bold">{image.label}</p>
              <div className="mt-2">
                <label htmlFor={`labelSelect-${image.id}`} className="block text-sm font-semibold mb-1">
                  Assign Labels:
                </label>
                <div className="flex flex-wrap">
                  {predefinedLabels.map((label) => (
                    <div key={label.id} className="flex items-center mr-2 mb-1">
                      <input
                        type="checkbox"
                        id={`labelCheckbox-${label.id}-${image.id}`}
                        value={label.name}
                        checked={selectedLabels[image.filename]?.includes(label.name)}
                        onChange={(e) => {
                          const selected = e.target.checked ? [label.name] : [];
                          handleAddLabel(image.filename, selected);
                        }}
                        className="mr-1"
                      />
                      <label htmlFor={`labelCheckbox-${label.id}-${image.id}`} className="text-sm">
                        {label.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-2">
                <p className="font-semibold mb-1">Selected Labels:</p>
                <div className="flex flex-wrap">
                  {selectedLabels[image.filename]?.map((selectedLabel) => (
                    <div key={selectedLabel} className="flex items-center mr-2 mb-1">
                      <span className="bg-gray-200 rounded-full px-2 py-1 text-sm mr-1">
                        {selectedLabel}
                      </span>
                      <button
                        onClick={() => handleDeleteLabel(image.filename, selectedLabel)}
                        className="text-red-500 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
