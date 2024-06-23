import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-500">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to VisionInsight</h1>
        <div>
          <Link to="/auth" className="bg-blue-500 text-white px-6 py-3 rounded-full mr-4">
            Login / Signup
          </Link>
          <Link to="/detector" className="bg-green-500 text-white px-6 py-3 rounded-full">
            Go to Detector
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
