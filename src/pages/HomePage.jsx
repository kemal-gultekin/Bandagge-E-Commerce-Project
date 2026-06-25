import React from 'react';

// Components
import Slider from '../components/Slider';
import EditorsPick from '../components/EditorsPick';
import ProductCard from '../components/ProductCard';
import VitaClassic from '../components/VitaClassic';
import NeuralUniverse from '../components/NeuralUniverse';
import FeaturedPosts from '../components/FeaturedPosts';

 
const HomePage = () => {

  const localProducts = [
    { 
      id: 1, 
      title: 'Klasik Deri Ceket', 
      category: 'Erkek Dış Giyim', 
      price: 129.99, 
      image: 'src/Pictures/ShopOptions/product-cover-5.png' 
    },
    { 
      id: 2, 
      title: 'Zarif Süet Omuz Çantası', 
      category: 'Kadın Aksesuar', 
      price: 89.99, 
      image: 'src/Pictures/ShopOptions/product-cover-5-1.png' 
    },
    { 
      id: 3, 
      title: 'Örgü Pamuklu Kazak', 
      category: 'Unisex Giyim', 
      price: 45.00, 
      image: 'src/Pictures/ShopOptions/product-cover-5-2.png' 
    },
    { 
      id: 4, 
      title: 'Minimalist Kol Saati', 
      category: 'Premium Aksesuar', 
      price: 159.00, 
      image: 'src/Pictures/ShopOptions/product-cover-5-3.png' 
    },
    { 
      id: 5, 
      title: 'Retro Denim Ceket', 
      category: 'Kadın Dış Giyim', 
      price: 79.99, 
      image: 'src/Pictures/ShopOptions/product-cover-5-4.png' 
    },
    { 
      id: 6, 
      title: 'Athletic Koşu Ayakkabısı', 
      category: 'Spor Ayakkabı', 
      price: 110.00, 
      image: 'src/Pictures/ShopOptions/product-cover-5-5.png' 
    },
    { 
      id: 7, 
      title: 'Premium Fötr Şapka', 
      category: 'Aksesuar', 
      price: 35.00, 
      image: 'src/Pictures/ShopOptions/product-cover-5-6.png' 
    },
    { 
      id: 8, 
      title: 'Klasik Güneş Gözlüğü', 
      category: 'Gözlük & Aksesuar', 
      price: 55.00, 
      image: 'src/Pictures/ShopOptions/product-cover-5-7.png' 
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Slider Section */}
      <Slider />
      
      {/* Categories Section */}
      <EditorsPick />
      
      {/* Bestseller Products Section */}
      <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h4 className="text-xl font-normal text-gray-text mb-2">Featured Products</h4>
          <h3 className="text-2xl font-bold text-dark mb-2 uppercase tracking-tight">BESTSELLER PRODUCTS</h3>
          <p className="text-sm text-gray-text">Problems trying to resolve the conflict between</p>
        </div>

        {/* Product Grid - Using local data for manual edits */}
        <div className="flex flex-wrap -mx-4">
          {localProducts.map((product) => (
            <div key={product.id} className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-12">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Intro Sections */}
      <VitaClassic />
      <NeuralUniverse />
      <FeaturedPosts />
    </div>
  );
};

export default HomePage;
