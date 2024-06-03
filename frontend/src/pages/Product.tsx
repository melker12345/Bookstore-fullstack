import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import { Product } from '../types/types';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product', error);
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-3xl">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-3xl">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container  mx-auto h-full flex flex-col md:flex-row items-center justify-center px-4 md:px-6 py-12 ">
      <div className="flex flex-col bg-gray-100 md:flex-row items-center rounded-xl justify-center p-12">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-2/3 md:w-1/3 mb-10 sm:mb-0 rounded-lg shadow-lg object-cover"
        />
        <div className="md:ml-8">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-bold mb-4">${product.price}</p>
          <Button option="addToCart" text="Add to Cart" product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
