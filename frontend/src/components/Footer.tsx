import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 flex flex-col sm:flex-row items-center justify-center w-full">
      <p className="text-lg mb-2 sm:mb-0">&copy; 2024 E-Commerce App</p>
      <div className="text-lg flex flex-wrap justify-center sm:justify-start">
        <a className="mx-2 hover:underline " href="/about">
          About
        </a>
        <a className="mx-2 hover:underline" href="/contact">
          Contact
        </a>
        <a className="mx-2 hover:underline" href="/privacy">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
