import React from 'react';
import { LayoutGrid, List, ChevronDown } from 'lucide-react';

const FilterBar = ({ totalResults, sort, setSort, filter, setFilter, onFilterClick }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center py-6 px-4 mb-10 bg-white">
      <div className="text-sm font-bold text-gray-text mb-4 md:mb-0">
        Showing all {totalResults} results
      </div>

      <div className="flex items-center space-x-4 mb-4 md:mb-0">
        <span className="text-sm font-bold text-gray-text">Views:</span>
        <div className="flex space-x-2">
          <button className="p-3 border border-[#ECECEC] rounded-md text-dark">
            <LayoutGrid size={16} />
          </button>
          <button className="p-3 border border-[#ECECEC] rounded-md text-gray-text">
            <List size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
        <input 
          type="text" 
          placeholder="Filter products..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-[#F9F9F9] border border-[#DDDDDD] text-gray-text text-sm rounded-md px-4 py-3 focus:outline-none w-full sm:w-48"
        />
        
        <div className="relative w-full sm:w-auto">
          <select 
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-[#F9F9F9] border border-[#DDDDDD] text-gray-text text-sm rounded-md px-4 py-3 focus:outline-none appearance-none pr-10 cursor-pointer w-full"
          >
            <option value="">Sort By</option>
            <option value="price:asc">Price: Low to High</option>
            <option value="price:desc">Price: High to Low</option>
            <option value="rating:asc">Rating: Low to High</option>
            <option value="rating:desc">Rating: High to Low</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-text pointer-events-none" />
        </div>
        
        <button 
          onClick={onFilterClick}
          className="bg-primary text-white px-8 py-3 rounded-md text-sm font-bold hover:bg-[#1b8ecf] transition-all w-full sm:w-auto"
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
