import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/types';
import Modal from './Modal';

type ButtonProps = {
  option: 'addToCart' | 'readMore';
  text: string;
  product?: Product;
};

const Button: React.FC<ButtonProps> = ({ option, text, product }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;

    const storedCartItems = localStorage.getItem('cartItems');
    const cartItems: Product[] = storedCartItems
      ? JSON.parse(storedCartItems)
      : [];

    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity! += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log('Cart Items After Adding:', cartItems);
    console.log(`Added product ${product.name} to cart`);

    setIsModalOpen(true);
  };

  const handleClick = () => {
    if (option === 'addToCart') {
      handleAddToCart();
    } else if (option === 'readMore' && product) {
      navigate(`/products/${product.id}`);
    } else {
      console.log('Invalid option');
    }
  };

  return (
    <>
      <button
        className="p-2 text-center text-base rounded-md font-medium text-white bg-blue-500 hover:scale-105 hover:ease-linear hover:duration-250"
        onClick={handleClick}
      >
        {text}
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Added to Cart</h2>
          {product && <p>{product.name} has been added to your cart.</p>}
          <button
            className="mt-4 p-2 bg-green-500 text-white rounded-md"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Button;
