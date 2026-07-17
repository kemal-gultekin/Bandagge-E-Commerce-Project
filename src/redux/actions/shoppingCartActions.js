import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM, TOGGLE_CART_ITEM_CHECK, SET_CART, SET_PAYMENT, SET_ADDRESS, SET_ADDRESS_LIST, SET_CARD_LIST } from '../types';
import axios from 'axios';
import { toast } from 'react-toastify';

export const addToCart = (product) => ({ type: ADD_TO_CART, payload: product });
export const removeFromCart = (productId) => ({ type: REMOVE_FROM_CART, payload: productId });
export const updateCartItem = (productId, count) => ({ type: UPDATE_CART_ITEM, payload: { productId, count } });
export const toggleCartItemCheck = (productId) => ({ type: TOGGLE_CART_ITEM_CHECK, payload: productId });
export const setCart = (cart) => ({ type: SET_CART, payload: cart });
export const setPayment = (payment) => ({ type: SET_PAYMENT, payload: payment });
export const setAddress = (address) => ({ type: SET_ADDRESS, payload: address });
export const setAddressList = (addressList) => ({ type: SET_ADDRESS_LIST, payload: addressList });
export const setCardList = (cardList) => ({ type: SET_CARD_LIST, payload: cardList });

// Thunk action for fetching addresses
export const fetchAddressList = () => {
    return async (dispatch, getState) => {
        const { user } = getState().client;
        const token = user?.token || localStorage.getItem('token');
        
        if (!token || token === 'undefined') return;

        try {
            const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/user/address', {
                headers: {
                    Authorization: token
                }
            });
            dispatch(setAddressList(response.data));
        } catch (error) {
            console.error('Error fetching addresses:', error);
            if (error.response?.status === 401) {
                // Token might be expired
                // dispatch(logoutUser()); 
            }
        }
    };
};

// Thunk action for adding a new address
export const postAddress = (addressData) => {
    return async (dispatch, getState) => {
        const { user } = getState().client;
        const token = user?.token || localStorage.getItem('token');
        
        if (!token || token === 'undefined') {
            toast.error('You must be logged in to add an address.');
            throw new Error('No authentication token');
        }

        try {
            const response = await axios.post('https://workintech-fe-ecommerce.onrender.com/user/address', addressData, {
                headers: {
                    Authorization: token
                }
            });
            dispatch(fetchAddressList());
            toast.success('Address added successfully!');
            return response.data;
        } catch (error) {
            console.error('Error adding address:', error);
            const message = error.response?.data?.message || 'Failed to add address.';
            toast.error(message);
            throw error;
        }
    };
};

// Thunk action for updating an address
export const updateAddress = (addressData) => {
    return async (dispatch, getState) => {
        const { user } = getState().client;
        const token = user?.token || localStorage.getItem('token');
        
        if (!token || token === 'undefined') {
            toast.error('Authentication required.');
            throw new Error('No authentication token');
        }

        try {
            const response = await axios.put('https://workintech-fe-ecommerce.onrender.com/user/address', addressData, {
                headers: {
                    Authorization: token
                }
            });
            dispatch(fetchAddressList());
            toast.success('Address updated successfully!');
            return response.data;
        } catch (error) {
            console.error('Error updating address:', error);
            const message = error.response?.data?.message || 'Failed to update address.';
            toast.error(message);
            throw error;
        }
    };
};

// Thunk action for deleting an address
export const deleteAddress = (addressId) => {
    return async (dispatch, getState) => {
        const { user } = getState().client;
        const token = user?.token || localStorage.getItem('token');
        
        if (!token || token === 'undefined') return;

        try {
            await axios.delete(`https://workintech-fe-ecommerce.onrender.com/user/address/${addressId}`, {
                headers: {
                    Authorization: token
                }
            });
            dispatch(fetchAddressList());
            toast.info('Address removed.');
        } catch (error) {
            console.error('Error deleting address:', error);
            toast.error('Failed to delete address.');
        }
    };
};

// Thunk action for fetching saved cards
export const fetchCardList = () => {
    return async (dispatch, getState) => {
        const { user } = getState().client;
        const token = user?.token || localStorage.getItem('token');
        
        if (!token || token === 'undefined') return;

        try {
            const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/user/card', {
                headers: {
                    Authorization: token
                }
            });
            dispatch(setCardList(response.data));
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    };
};

// Thunk action for adding a new card
export const postCard = (cardData) => {
    return async (dispatch, getState) => {
        const { user } = getState().client;
        const token = user?.token || localStorage.getItem('token');
        
        if (!token || token === 'undefined') {
            toast.error('You must be logged in to add a card.');
            throw new Error('No authentication token');
        }

        try {
            const response = await axios.post('https://workintech-fe-ecommerce.onrender.com/user/card', cardData, {
                headers: {
                    Authorization: token
                }
            });
            dispatch(fetchCardList());
            toast.success('Card added successfully!');
            return response.data;
        } catch (error) {
            console.error('Error adding card:', error);
            const message = error.response?.data?.message || 'Failed to add card.';
            toast.error(message);
            throw error;
        }
    };
};

// Thunk action for updating a card
export const updateCard = (cardData) => {
    return async (dispatch, getState) => {
        const { user } = getState().client;
        const token = user?.token || localStorage.getItem('token');
        
        if (!token || token === 'undefined') {
            toast.error('Authentication required.');
            throw new Error('No authentication token');
        }

        try {
            const response = await axios.put('https://workintech-fe-ecommerce.onrender.com/user/card', cardData, {
                headers: {
                    Authorization: token
                }
            });
            dispatch(fetchCardList());
            toast.success('Card updated successfully!');
            return response.data;
        } catch (error) {
            console.error('Error updating card:', error);
            const message = error.response?.data?.message || 'Failed to update card.';
            toast.error(message);
            throw error;
        }
    };
};

// Thunk action for deleting a card
export const deleteCard = (cardId) => {
    return async (dispatch, getState) => {
        const { user } = getState().client;
        const token = user?.token || localStorage.getItem('token');
        
        if (!token || token === 'undefined') return;

        try {
            await axios.delete(`https://workintech-fe-ecommerce.onrender.com/user/card/${cardId}`, {
                headers: {
                    Authorization: token
                }
            });
            dispatch(fetchCardList());
            toast.info('Card removed.');
        } catch (error) {
            console.error('Error deleting card:', error);
            toast.error('Failed to delete card.');
        }
    };
};
