import React, { useState } from 'react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">{isLogin ? 'Login' : 'Signup'}</h2>
        <form>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter your username"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
        <button
          onClick={toggleForm}
          className="mt-4 text-blue-500 hover:underline"
        >
          {isLogin ? 'Create an account' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
