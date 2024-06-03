import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import { User } from '../types/types';
import axios from 'axios';
import LoginComponent from './LoginComponent';
import SignupComponent from './SignupComponent';
import Modal from './Modal';

const Navbar: React.FC = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get<User>('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const handleLogin = (user: User) => {
    setUser(user);
    setLoginOpen(false);
    setShowSuccessModal(true);
  };

  const handleSwitchToSignup = () => {
    setLoginOpen(false);
    setSignupOpen(true);
  };

  const handleSwitchToLogin = () => {
    setSignupOpen(false);
    setLoginOpen(true);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md text-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="h-8 w-8 bg-gray-800 rounded-full"></div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-800 hover:text-blue-500">
            Home
          </Link>
          <Link to="/about" className="text-gray-800 hover:text-blue-500">
            About
          </Link>
          <Link to="/products" className="text-gray-800 hover:text-blue-500">
            Products
          </Link>
        </div>
        <button className="md:hidden px-2 py-1 " onClick={toggleMobileMenu}>
          <div className="space-y-1">
            <div className="w-5 h-0.5 bg-gray-800"></div>
            <div className="w-5 h-0.5 bg-gray-800"></div>
            <div className="w-5 h-0.5 bg-gray-800"></div>
          </div>
        </button>
      </div>
      <div
        ref={menuRef}
        className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:hidden absolute top-0 left-0 w-full bg-gray-200 pt-2 pb-5 px-4 z-20 flex-col space-y-2  border-b-2`}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="self-end px-2 py-1 text-gray-800"
        >
          X
        </button>
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="text-gray-800 hover:text-blue-500 text-center"
        >
          Home
        </Link>
        <Link
          to="/about"
          onClick={() => setMobileMenuOpen(false)}
          className="text-gray-800 hover:text-blue-500 text-center"
        >
          About
        </Link>
        <Link
          to="/products"
          onClick={() => setMobileMenuOpen(false)}
          className="text-gray-800 hover:text-blue-500 text-center"
        >
          Products
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/cart" className="text-gray-800 hover:text-blue-500 ">
          <FaCartPlus size={24} />
        </Link>
        {user ? (
          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => setLoginOpen(true)}
              className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white"
            >
              Login
            </button>
            <button
              onClick={() => setSignupOpen(true)}
              className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white"
            >
              Signup
            </button>
          </>
        )}
      </div>
      <Modal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)}>
        <LoginComponent
          onSwitchToSignup={handleSwitchToSignup}
          onSuccess={handleLogin}
        />
      </Modal>
      <Modal isOpen={isSignupOpen} onClose={() => setSignupOpen(false)}>
        <SignupComponent onSwitchToLogin={handleSwitchToLogin} />
      </Modal>
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Login Successful</h2>
          <p>Welcome back!</p>
          <button
            className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => setShowSuccessModal(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
