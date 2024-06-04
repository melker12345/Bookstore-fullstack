import React from 'react';

const Banner: React.FC = () => {
  return (
    <div className="flex mt-0 items-center justify-center">
      <div className="w-2/3 h-6 overflow-hidden bg-gray-100 rounded-md relative">
        <div className="flex  whitespace-nowrap animate-scroll">
          <span className="mx-16 text-red-600 font-semibold leading-6">
            10% OFF
          </span>
          <span className="mx-16 text-red-600 font-semibold leading-6">
            SUMMER SALE
          </span>
          <span className="mx-16 text-red-600 font-semibold leading-6">
            10% OFF
          </span>
          <span className="mx-16 text-red-600 font-semibold leading-6">
            SUMMER SALE
          </span>
          <span className="mx-16 text-red-600 font-semibold leading-6">
            10% OFF
          </span>
          <span className="mx-16 text-red-600 font-semibold leading-6">
            SUMMER SALE
          </span>
          <span className="mx-16 text-red-600 font-semibold leading-6">
            10% OFF
          </span>
          <span className="mx-16 text-red-600 font-semibold leading-6">
            SUMMER SALE
          </span>
          <span className="mx-16 text-red-600 font-semibold leading-6">
            10% OFF
          </span>
          <span className="mx-16 text-red-600 font-semibold leading-6">
            SUMMER SALE
          </span>
          <span className="mx-16 text-red-600 font-semibold leading-6">
            10% OFF
          </span>
          <span className="mx-16 text-red-600 font-semibold leading-6">
            SUMMER SALE
          </span>
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, white, rgba(255,255,255,0) 20%, rgba(255,255,255,0) 80%, white)',
          }}
        ></div>
      </div>
    </div>
  );
};

export default Banner;
