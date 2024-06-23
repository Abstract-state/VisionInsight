import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Detector = () => {
  const [video, setVideo] = useState(null);
  const [objectName, setObjectName] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleVideoUpload = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleObjectNameChange = (e) => {
    setObjectName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('video', video);
    formData.append('object_name', objectName);

    try {
      setStatus('Uploading and processing video...');
      navigate('/processing');

      const response = await fetch('http://127.0.0.1:5000/process_video', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      navigate('/output', { state: { outputVideoPath: data.output_video } });
    } catch (error) {
      console.error('Error uploading video:', error);
      setStatus('Error uploading video.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Upload Video for Detection</h2>
        {status && <p className="mb-4 text-red-500">{status}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Video File</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Object Name</label>
            <input
              type="text"
              value={objectName}
              onChange={handleObjectNameChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter the object name"
              required
            />
          </div>
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
            Upload and Detect
          </button>
        </form>
      </div>
    </div>
  );
};

export default Detector;
