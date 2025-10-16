import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 mt-12 border-t border-gray-700">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} AI Image Studio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
