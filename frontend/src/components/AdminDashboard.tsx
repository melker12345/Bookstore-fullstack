import React, { useState, useEffect } from 'react';
import { Product, Order, OrderedItem, User } from '../types/types';
import AddProductForm from './AddProductForm';
import TableView from './TableView';
import axios from 'axios';

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [OrderedItems, setOrderedItems] = useState<OrderedItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchData('products', setProducts);
    fetchData('orders', setOrders);
    fetchData('order_items', setOrderedItems);
    fetchData('users', setUsers);
  }, []);

  const fetchData = async (
    endpoint: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setState: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    try {
      const response = await fetch(
        `https://bookstore-fullstack-server.onrender.com/api/${endpoint}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}`);
      }
      const data = await response.json();
      setState(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(`Failed to fetch ${endpoint}`, error);
      setState([]);
    }
  };

  const handleProductAdded = () => {
    fetchData('products', setProducts);
  };

  const deleteItem = async (endpoint: string, id: number) => {
    try {
      await fetch(
        `https://bookstore-fullstack-server.onrender.com/api/${endpoint}/${id}`,
        {
          method: 'DELETE',
        }
      );
      fetchData(endpoint, (data) => {
        switch (endpoint) {
          case 'products':
            setProducts(data);
            break;
          case 'orders':
            setOrders(data);
            break;
          case 'order_items':
            setOrderedItems(data);
            break;
          case 'users':
            setUsers(data);
            break;
          default:
            break;
        }
      });
    } catch (error) {
      console.error(`Failed to delete from ${endpoint}`, error);
    }
  };

  const toggleFeature = async (productId: number, feature: keyof Product) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, [feature]: !product[feature] };
      }
      return product;
    });

    setProducts(updatedProducts);

    try {
      await axios.put(
        `https://bookstore-fullstack-server.onrender.com/api/products/${productId}`,
        {
          [feature]: !products.find((product) => product.id === productId)?.[
            feature
          ],
        }
      );
    } catch (error) {
      console.error('Failed to update product feature', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <AddProductForm onProductAdded={handleProductAdded} />
      <TableView<Product>
        title="Products"
        data={products}
        deleteItem={(id) => deleteItem('products', id)}
        toggleFeature={toggleFeature}
      />
      <TableView<Order>
        title="Orders"
        data={orders}
        deleteItem={(id) => deleteItem('orders', id)}
      />
      <TableView<OrderedItem>
        title="Order Items"
        data={OrderedItems}
        deleteItem={(id) => deleteItem('order_items', id)}
      />
      <TableView<User>
        title="Users"
        data={users}
        deleteItem={(id) => deleteItem('users', id)}
      />
    </div>
  );
};

export default AdminDashboard;
