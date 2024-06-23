import React from 'react';
import { useLocation } from 'react-router-dom';

const Output = () => {
  const location = useLocation();
  const { outputVideoPath } = location.state || {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Detection Result</h2>
        {outputVideoPath ? (
          <>
            <video controls className="w-full mb-4">
              <source src={`http://127.0.0.1:5000/${outputVideoPath}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <a
              href={`http://127.0.0.1:5000/${outputVideoPath}`}
              download
              className="bg-green-500 text-white px-6 py-3 rounded-full"
            >
              Download Video
            </a>
          </>
        ) : (
          <p>No video to display.</p>
        )}
      </div>
    </div>
  );
};

export default Output;
