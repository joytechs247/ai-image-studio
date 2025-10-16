import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-lg border-b border-gray-700">
      <div className="container mx-auto px-4 py-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          AI Image Studio
        </h1>
        <p className="mt-1 text-md text-gray-400">Edit Your Images Using AI</p>
      </div>
    </header>
  );
};

export default Header;
