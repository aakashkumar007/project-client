// Loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      {/* Loader container */}
      <div className="relative flex items-center justify-center w-20 h-20">
        {/* Outer circle animation */}
        <div className="absolute border-t-4 border-blue-500 border-solid rounded-full animate-spin w-16 h-16"></div>
        
        {/* Inner circle animation */}
        <div className="absolute border-t-4 border-pink-500 border-solid rounded-full animate-spin w-12 h-12 animate-reverse"></div>

        {/* Dot in the center */}
        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;
