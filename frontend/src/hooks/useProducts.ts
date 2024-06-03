// src/hooks/useProducts.ts
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Product } from '../types/types';

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          'http://localhost:5000/api/products'
        );
        const productsWithDate = response.data.map((product) => ({
          ...product,
          created_at: new Date(product.created_at),
        }));
        setProducts(productsWithDate);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useProducts;
