import React, { useState, useEffect } from 'react';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';

const Home: React.FC = () => {
  const { products, loading, error } = useProducts();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-400"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-3xl">{error}</p>
      </div>
    );

  const featuredProduct = products.find((product) => product.isFeatured);
  const bestSellers = products.filter((product) => product.isBestSeller);

  return (
    <>
      <main className="min-h-screen">
        {isLargeScreen ? (
          <section className="bg-gray-100 mt-8 py-12 md:py-20 flex justify-center mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mx-auto w-auto">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  largeBest Products
                </h1>
                <p className="text-gray-600 opacity-60 max-w-md">
                  {featuredProduct && featuredProduct.description}
                </p>
                <div className="flex gap-4">
                  {featuredProduct && (
                    <>
                      <Button
                        option="addToCart"
                        text="Add to Cart"
                        product={featuredProduct}
                      />
                      <Button
                        option="readMore"
                        text="View Details"
                        product={featuredProduct}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="flex justify-center max-h-[500px]">
                {featuredProduct && (
                  <img
                    alt={featuredProduct.name}
                    className="rounded-lg shadow-lg w-[400px] h-[500px] max-w-fit m-0 p-0"
                    src={featuredProduct.imageUrl}
                  />
                )}
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-gray-100 py-12 md:py-20">
            <div className="flex flex-col items-center gap-8 md:grid md:grid-cols-2">
              <div className="order-1 md:order-1 flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Discover the Best Products
                </h1>
              </div>
              <div className="order-2 md:order-2 flex justify-center max-h-[300px] md:max-h-[500px]">
                {featuredProduct && (
                  <img
                    alt={featuredProduct.name}
                    className="rounded-lg shadow-lg w-[200px] h-[300px] md:w-[400px] md:h-[500px] max-w-fit m-0 p-0"
                    src={featuredProduct.imageUrl}
                  />
                )}
              </div>
              <div className="order-3 md:order-1 flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
                <p className="text-gray-600 opacity-60 max-w-md mx-auto md:mx-0">
                  {featuredProduct && featuredProduct.description}
                </p>
                <div className="flex justify-center md:justify-start gap-4">
                  {featuredProduct && (
                    <>
                      <Button
                        option="addToCart"
                        text="Add to Cart"
                        product={featuredProduct}
                      />
                      <Button
                        option="readMore"
                        text="View Details"
                        product={featuredProduct}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-4 mb-8">
              <h2 className="text-2xl font-bold">Best Sellers</h2>
              <p className="text-gray-600">
                Check out our most popular products.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-gray-100 mb-8">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-4 mb-8">
              <h2 className="text-2xl font-bold">Best Reviewed Products</h2>
              <p className="text-gray-600">Check out our top-rated products.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bestSellers.reverse().map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
