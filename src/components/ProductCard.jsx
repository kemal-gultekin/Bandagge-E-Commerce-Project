import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const slugify = (text) => {
  return text
    ?.toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

// This component displays each product as a card.
const ProductCard = ({ product }) => {
  const categories = useSelector(state => state.product.categories);
  const category = categories.find(c => c.id === product.category_id);
  
  const gender = category?.gender === 'k' ? 'kadin' : 'erkek';
  const categoryName = slugify(category?.title || 'category');
  const productNameSlug = slugify(product.name || product.title || 'product');
  
  const detailUrl = product.category_id 
    ? `/shop/${gender}/${categoryName}/${product.category_id}/${productNameSlug}/${product.id}`
    : `/shop`;
  const productImage = (product.images && product.images[0]?.url) || product.image || 'https://via.placeholder.com/400x600?text=Product';

  return (
    <Link to={detailUrl} className="flex flex-col items-center text-center group cursor-pointer block hover:shadow-lg transition-all p-4 rounded-md">
      {/* Ürün Görseli */}
      <div className="w-full aspect-[3/4] mb-6 overflow-hidden bg-white border border-gray-100 rounded-sm">
        <img 
          src={productImage} 
          alt={product.name || product.title} 
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Ürün Başlığı */}
      <h5 className="text-base font-bold text-dark mb-2 truncate w-full px-2 group-hover:text-primary transition-colors">
        {product.name || product.title}
      </h5>
      
      {/* Ürün Kategorisi/Açıklaması */}
      <p className="text-sm font-bold text-gray-text mb-3 truncate w-full px-2">
        {product.description || product.category}
      </p>
      
      {/* Fiyat Bilgisi */}
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-base font-bold text-[#BDBDBD] line-through">
          ${(product.price * 1.2).toFixed(2)}
        </span>
        <span className="text-base font-bold text-[#23856D]">
          ${product.price.toFixed(2)}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded-full bg-[#23A6F0]" />
        <div className="w-4 h-4 rounded-full bg-[#23856D]" />
        <div className="w-4 h-4 rounded-full bg-[#E77C40]" />
        <div className="w-4 h-4 rounded-full bg-[#252B42]" />
      </div>
    </Link>
  );
};

export default ProductCard;
