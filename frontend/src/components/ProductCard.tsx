import React from 'react';
import Button from './Button';
import { Product } from '../types/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const slicedname = product.name.slice(0, 32);

  return (
    <div className="bg-white rounded-lg flex flex-col items-center justify-center shadow-md overflow-hidden min-h-[500px] border">
      <div className="aspect-w-3 aspect-h-4">
        <span className="text-xl font-bold text-center flex items-center justify-center w-full my-4">
          ${product.price}
        </span>

        <img
          alt={product.name}
          className="rounded-lg shadow-lg object-cover w-full h-[200px]"
          src={product.imageUrl}
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{slicedname}</h3>
        <p className="text-gray-500 mb-1 h-40 overflow-hidden">
          {product.description.slice(0, 169)}
        </p>
        <div className="flex items-center justify-between mt-4">
          <Button option="addToCart" text="Add to Cart" product={product} />
          <Button option="readMore" text="View Details" product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
