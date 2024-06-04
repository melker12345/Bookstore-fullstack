import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import { Product } from '../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

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
    <div>
      <section className="container  mx-auto h-full flex flex-col md:flex-row items-center justify-center px-4 md:px-6 py-12 ">
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
      </section>

      <section className="bg-gray-100 py-10 mt-10 ">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                What Our Customers Say
              </h2>
              <p className="text-gray-500 ">
                Hear from real people who love our products.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow-sm ">
                <div className="flex items-start gap-4">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Sarah Johnson</h3>
                      <div className="flex items-center gap-0.5 text-sm">
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-500"
                        />
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-500"
                        />
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-500"
                        />
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-500"
                        />
                        <FontAwesomeIcon icon={faStar} />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 ">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Voluptatem odio delectus doloremque quasi cupiditate
                      dolorum debitis sint! Sunt molestias quia suscipit saepe,
                      temporibus sed reprehenderit
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm ">
                <div className="flex items-start gap-4">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Sarah Johnson</h3>
                      <div className="flex items-center gap-0.5 text-sm">
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-500"
                        />
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-500"
                        />
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-500"
                        />
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-500"
                        />
                        <FontAwesomeIcon icon={faStar} />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 ">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Voluptatem odio delectus doloremque quasi cupiditate
                      dolorum debitis sint! Sunt molestias quia suscipit saepe,
                      temporibus sed reprehenderit, unde quas impedit
                      dignissimos perferendis excepturi adipisci, esse deserunt
                      odio.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm ">
                <div className="flex items-start gap-4">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Sarah Johnson</h3>
                      <div className="flex items-center gap-0.5 text-sm">
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-500"
                        />
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-500"
                        />
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-500"
                        />
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-500"
                        />
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-500"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 ">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Voluptatem odio delectus doloremque quasi cupiditate
                      dolorum debitis sint! Sunt molestias quia suscipit saepe,
                      temporibus sed reprehenderit, unde quas impedit
                      dignissimos perferendis excepturi adipisci, esse deserunt
                      odio.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
