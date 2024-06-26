import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Product } from '../types/types';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get('https://bookstore-fullstack-server.onrender.com/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  return (
    <>
      <section className="grid grid-cols-1 bg-red-500 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 md:p-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  );
};

export default ProductList;
