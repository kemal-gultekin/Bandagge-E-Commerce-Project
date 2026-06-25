import { SET_USER, SET_ROLES, SET_THEME, SET_LANGUAGE } from '../types';
import axios from 'axios';
import { toast } from 'react-toastify';

export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles });
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme });
export const setLanguage = (lang) => ({ type: SET_LANGUAGE, payload: lang });

// Thunk action creator for login
export const loginUser = (loginData, rememberMe) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('https://workintech-fe-ecommerce.onrender.com/login', loginData);
      const user = response.data;
      
      dispatch(setUser(user));
      
      if (rememberMe) {
        localStorage.setItem('token', user.token);
      }
      
      toast.success(`Welcome back, ${user.name}!`);
      return user;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(message);
      throw error;
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(setUser({}));
    localStorage.removeItem('token');
    toast.info('You have been logged out.');
  };
};

// Thunk action creator to verify token on app load
export const verifyToken = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    
    if (!token) return;

    try {
      const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/verify', {
        headers: {
          Authorization: token
        }
      });
      
      const user = response.data;
      // Ensure token is preserved in state
      const userWithToken = { ...user, token: user.token || token };
      dispatch(setUser(userWithToken));
      
      // Update token in case it was refreshed by server
      if (user.token) {
        localStorage.setItem('token', user.token);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('token');
      // If verification fails, we just don't set the user
    }
  };
};

// Thunk action creator for roles
// It should be triggered only in case of need (e.g. if roles are empty)
export const fetchRoles = () => {
  return async (dispatch, getState) => {
    const { roles } = getState().client;
    
    // Check if roles are already fetched
    if (roles && roles.length > 0) {
      return;
    }

    try {
      // Assuming there is an endpoint for roles. 
      // If not, we can use a mock or handle the error.
      const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/roles');
      dispatch(setRoles(response.data));
    } catch (error) {
      console.error('Error fetching roles:', error);
      // Fallback or error handling
    }
  };
};
