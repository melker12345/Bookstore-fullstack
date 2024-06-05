import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const shippingCost = 5.0;
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const navigate = useNavigate();
  const { authState } = useAuth();

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(subtotal);
  }, [cartItems]);

  const handleQuantityChange = (id: number, change: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + change } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = (id: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  const validate = () => {
    const newErrors = {
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    };
    let isValid = true;

    if (!userDetails.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userDetails.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (!userDetails.address) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    if (!userDetails.city) {
      newErrors.city = 'City is required';
      isValid = false;
    }

    if (!userDetails.state) {
      newErrors.state = 'State is required';
      isValid = false;
    }

    const zipRegex = /^\d{5}(?:[-\s]\d{4})?$/;
    if (!zipRegex.test(userDetails.zip)) {
      newErrors.zip = 'Invalid zip code';
      isValid = false;
    }

    if (!userDetails.country) {
      newErrors.country = 'Country is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;

    const deliveryMethod = (
      document.querySelector(
        'input[name="delivery"]:checked'
      ) as HTMLInputElement
    )?.value;
    const paymentMethod = (
      document.querySelector(
        'input[name="payment"]:checked'
      ) as HTMLInputElement
    )?.value;

    const userId = authState.user ? authState.user.id : 0;

    const orderData = {
      user_id: userId,
      items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      total: subtotal + shippingCost,
      address: userDetails.address,
      city: userDetails.city,
      state: userDetails.state,
      zip: userDetails.zip,
      country: userDetails.country,
      delivery_method: deliveryMethod,
      payment_method: paymentMethod,
    };

    try {
      const response = await fetch(
        'https://bookstore-fullstack-server.onrender.com/api/orders',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        }
      );

      const textResponse = await response.text();

      if (!response.ok) {
        console.error('Failed to place order:', textResponse);
        return;
      }

      localStorage.removeItem('cartItems');

      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto flex items-center justify-center flex-col h-full px-4 md:px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <img
          src="https://media.power-cdn.net/images/empty-shopping-cart.svg"
          alt="Empty Cart"
          className="my-16 w-80"
        />
        <p className="mb-4">
          Looks like you haven`t added anything to your cart yet.
        </p>
        <Link
          to="/products"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex items-center justify-center px-4 md:px-6 min-h-full">
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto my-auto py-12 px-4">
        <div className="space-y-6 py-6 px-8 rounded-2xl shadow-xl border">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[80px_1fr_80px] items-center gap-4"
              >
                <img
                  alt={item.name}
                  className="rounded-md object-cover"
                  height={100}
                  src={item.imageUrl}
                  style={{ aspectRatio: '100/100', objectFit: 'scale-down' }}
                  width={80}
                />
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                  <p className="text-sm font-bold">${item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500 dark:text-gray-400">Subtotal</p>
            <p className="font-medium">${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500 dark:text-gray-400">Shipping</p>
            <p className="font-medium">${shippingCost.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg font-medium">Total</p>
            <p className="text-lg font-medium">
              ${(subtotal + shippingCost).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="space-y-6 py-6 px-8 rounded-2xl shadow-xl border">
          <h2 className="text-2xl font-bold">Delivery & Payment</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                placeholder="First Last"
                value={userDetails.name}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
                className="mt-1 p-2 w-full border rounded-md"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                placeholder="m@example.com"
                type="email"
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
                className="mt-1 p-2 w-full border rounded-md"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                placeholder="1234 Main St"
                value={userDetails.address}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, address: e.target.value })
                }
                className="mt-1 p-2 w-full border rounded-md"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  placeholder="New York"
                  value={userDetails.city}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, city: e.target.value })
                  }
                  className="mt-1 p-2 w-full border rounded-md"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city}</p>
                )}
              </div>
              <div className="grid gap-2">
                <label htmlFor="state">State</label>
                <input
                  id="state"
                  placeholder="NY"
                  value={userDetails.state}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, state: e.target.value })
                  }
                  className="mt-1 p-2 w-full border rounded-md"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="zip">Zip</label>
                <input
                  id="zip"
                  placeholder="10001"
                  value={userDetails.zip}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, zip: e.target.value })
                  }
                  className="mt-1 p-2 w-full border rounded-md"
                />
                {errors.zip && (
                  <p className="text-red-500 text-sm">{errors.zip}</p>
                )}
              </div>
              <div className="grid gap-2">
                <label htmlFor="country">Country</label>
                <input
                  id="country"
                  placeholder="USA"
                  value={userDetails.country}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, country: e.target.value })
                  }
                  className="mt-1 p-2 w-full border rounded-md"
                />
                {errors.country && (
                  <p className="text-red-500 text-sm">{errors.country}</p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="delivery">Delivery Method</label>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="standard"
                  name="delivery"
                  value="standard"
                  defaultChecked
                />
                <label htmlFor="standard" className="flex items-center gap-2">
                  <span className="font-medium">Standard Shipping</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    3-5 business days
                  </span>
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="express"
                  name="delivery"
                  value="express"
                />
                <label htmlFor="express" className="flex items-center gap-2">
                  <span className="font-medium">Express Shipping</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    1-2 business days
                  </span>
                </label>
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="payment">Payment Method</label>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="card"
                  name="payment"
                  value="card"
                  defaultChecked
                />
                <label htmlFor="card" className="flex items-center gap-2">
                  <CreditCardIcon className="h-5 w-5" />
                  <span className="font-medium">Credit/Debit Card</span>
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" id="paypal" name="payment" value="paypal" />
                <label htmlFor="paypal" className="flex items-center gap-2">
                  <WalletIcon className="h-5 w-5" />
                  <span className="font-medium">PayPal</span>
                </label>
              </div>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function CreditCardIcon(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function WalletIcon(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}

export default Cart;
