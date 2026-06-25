import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronRight, Loader2, ChevronLeft } from 'lucide-react';
import { fetchProducts, setSort as setSortAction, setFilter as setFilterAction, setOffset as setOffsetAction } from '../redux/actions/productActions';

// Components
import FilterBar from '../components/FilterBar';
import ProductCard from '../components/ProductCard';
import BrandLogos from '../components/BrandLogos';

const ShopPage = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  
  const categories = useSelector(state => state.product.categories);
  const { productList, total, fetchState, filter, sort, limit, offset } = useSelector(state => state.product);
  
  // Local state for inputs to allow typing/selecting before committing
  const [localFilter, setLocalFilter] = useState(filter);
  const [localSort, setLocalSort] = useState(sort);
  
  // Current page derived from offset and limit
  const activePage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);
  
  useEffect(() => {
    const params = {
      limit: limit,
      offset: offset
    };
    if (categoryId) params.category = categoryId;
    if (filter) params.filter = filter;
    if (sort) params.sort = sort;
    
    dispatch(fetchProducts(params));
  }, [dispatch, categoryId, filter, sort, limit, offset]);

  // Reset offset when filter, sort or category changes
  useEffect(() => {
    dispatch(setOffsetAction(0));
  }, [dispatch, categoryId, filter, sort]);
  
  const handleFilterClick = () => {
    dispatch(setFilterAction(localFilter));
    dispatch(setSortAction(localSort));
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    const newOffset = (pageNumber - 1) * limit;
    dispatch(setOffsetAction(newOffset));
    // Scroll to top of product list
    window.scrollTo({ top: 500, behavior: 'smooth' });
  };
  
  // Helper to generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, activePage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    return pages;
  };
  
  // Sort categories by rating and take top 5
  const topCategories = [...categories]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const isLoading = fetchState === 'FETCHING';

  return (
    <div className="w-full bg-white">
      {/* Breadcrumb Section */}
      <div className="bg-light-gray py-6 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold text-dark mb-4 md:mb-0">Shop</h2>
          <div className="flex items-center space-x-2 text-sm font-bold">
            <Link to="/" className="text-dark">Home</Link>
            <ChevronRight size={16} className="text-[#BDBDBD]" />
            <span className="text-[#BDBDBD]">Shop</span>
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <div className="bg-light-gray pb-12 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-wrap -mx-2">
          {topCategories.map((cat) => (
            <div key={cat.id} className="w-full sm:w-1/2 lg:w-1/5 px-2 mb-4">
              <Link 
                to={`/shop/${cat.gender === 'k' ? 'kadin' : 'erkek'}/${cat.title.toLowerCase()}/${cat.id}`}
                className="relative h-[223px] overflow-hidden group block cursor-pointer"
              >
                <img 
                  src={cat.img} 
                  alt={cat.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-white">
                  <h5 className="text-base font-bold mb-2">{cat.title}</h5>
                  <p className="text-sm font-normal">Rating: {cat.rating}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Bar for Sorting and Views */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FilterBar 
          totalResults={total} 
          sort={localSort}
          setSort={setLocalSort}
          filter={localFilter}
          setFilter={setLocalFilter}
          onFilterClick={handleFilterClick}
        />
      </div>

      {/* Product List Section */}
      <section className="pb-20 px-6 md:px-10 max-w-7xl mx-auto min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-gray-text font-bold italic animate-pulse">Fetching amazing products...</p>
          </div>
        ) : (
          <div>
            {productList.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-text text-xl italic">No products found matching your criteria.</p>
              </div>
            ) : (
              <div className="flex flex-wrap -mx-4">
                {productList.map((product) => (
                  <div key={product.id} className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-12">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Custom Pagination */}
        {total > limit && (
          <div className="flex justify-center mt-20">
            <div className="flex border border-[#E8E8E8] rounded-md overflow-hidden shadow-sm">
                <button 
                  onClick={() => handlePageChange(1)}
                  disabled={activePage === 1}
                  className={`px-4 py-4 md:px-6 md:py-6 bg-white border-r border-[#E8E8E8] font-bold text-sm transition-all ${activePage === 1 ? 'text-[#BDBDBD] cursor-not-allowed' : 'text-primary hover:bg-primary hover:text-white cursor-pointer'}`}
                >
                  First
                </button>
                <button 
                  onClick={() => handlePageChange(activePage - 1)}
                  disabled={activePage === 1}
                  className={`px-4 py-4 md:px-4 md:py-6 bg-white border-r border-[#E8E8E8] font-bold text-sm transition-all ${activePage === 1 ? 'text-[#BDBDBD] cursor-not-allowed' : 'text-primary hover:bg-primary hover:text-white cursor-pointer'}`}
                >
                  <ChevronLeft size={16} />
                </button>
                
                {getPageNumbers().map(pageNum => (
                  <button 
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-4 md:px-5 md:py-6 border-r border-[#E8E8E8] font-bold text-sm transition-all ${activePage === pageNum ? 'bg-primary text-white' : 'bg-white text-primary hover:bg-primary hover:text-white cursor-pointer'}`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button 
                  onClick={() => handlePageChange(activePage + 1)}
                  disabled={activePage === totalPages}
                  className={`px-4 py-4 md:px-4 md:py-6 bg-white border-r border-[#E8E8E8] font-bold text-sm transition-all ${activePage === totalPages ? 'text-[#BDBDBD] cursor-not-allowed' : 'text-primary hover:bg-primary hover:text-white cursor-pointer'}`}
                >
                  <ChevronRight size={16} />
                </button>
                <button 
                  onClick={() => handlePageChange(totalPages)}
                  disabled={activePage === totalPages}
                  className={`px-4 py-4 md:px-6 md:py-6 bg-white font-bold text-sm transition-all ${activePage === totalPages ? 'text-[#BDBDBD] cursor-not-allowed' : 'text-primary hover:bg-primary hover:text-white cursor-pointer'}`}
                >
                  Last
                </button>
            </div>
          </div>
        )}
      </section>

      <BrandLogos />
    </div>
  );
};

export default ShopPage;
