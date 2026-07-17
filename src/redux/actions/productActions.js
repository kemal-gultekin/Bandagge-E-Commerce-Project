import { 
  SET_CATEGORIES, 
  SET_PRODUCT_LIST, 
  SET_PRODUCT,
  SET_TOTAL, 
  SET_FETCH_STATE, 
  SET_LIMIT, 
  SET_OFFSET, 
  SET_FILTER,
  SET_SORT 
} from '../types';
import axios from 'axios';

export const setCategories = (categories) => ({ type: SET_CATEGORIES, payload: categories });
export const setProductList = (products) => ({ type: SET_PRODUCT_LIST, payload: products });
export const setProduct = (product) => ({ type: SET_PRODUCT, payload: product });
export const setTotal = (total) => ({ type: SET_TOTAL, payload: total });
export const setFetchState = (state) => ({ type: SET_FETCH_STATE, payload: state });
export const setLimit = (limit) => ({ type: SET_LIMIT, payload: limit });
export const setOffset = (offset) => ({ type: SET_OFFSET, payload: offset });
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter });
export const setSort = (sort) => ({ type: SET_SORT, payload: sort });

// Thunk action creator for categories
export const fetchCategories = () => {
  return async (dispatch, getState) => {
    const { categories } = getState().product;
    
    // Only fetch if categories are empty
    if (categories && categories.length > 0) return;

    try {
      const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/categories');
      dispatch(setCategories(response.data));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
};

// Thunk action creator for products
export const fetchProducts = (queryParams = {}) => {
  return async (dispatch) => {
    dispatch(setFetchState('FETCHING'));
    try {
      const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/products', {
        params: queryParams
      });
      
      const { total, products } = response.data;
      
      dispatch(setProductList(products));
      dispatch(setTotal(total));
      dispatch(setFetchState('FETCHED'));
    } catch (error) {
      console.error('Error fetching products:', error);
      dispatch(setFetchState('FAILED'));
    }
  };
};

// Thunk action creator for a single product
export const fetchProduct = (productId) => {
  return async (dispatch) => {
    dispatch(setFetchState('FETCHING'));
    // Important: clear previous product state to avoid showing old data
    dispatch(setProduct({}));

    // Guard against invalid, missing, or non-numeric IDs to avoid 500 errors from backend
    const normalizedId = String(productId).trim();
    if (!productId || normalizedId === 'undefined' || normalizedId === 'null' || isNaN(Number(normalizedId))) {
      console.warn('Skipping API fetch. Invalid or non-numeric productId passed to fetchProduct:', productId);
      dispatch(setFetchState('FAILED'));
      return;
    }

    try {
      const response = await axios.get(`https://workintech-fe-ecommerce.onrender.com/products/${normalizedId}`);
      dispatch(setProduct(response.data));
      dispatch(setFetchState('FETCHED'));
    } catch (error) {
      console.warn('Error fetching product:', error.message || error);
      dispatch(setFetchState('FAILED'));
    }
  };
};
