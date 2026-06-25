import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM, TOGGLE_CART_ITEM_CHECK, SET_CART, SET_PAYMENT, SET_ADDRESS, SET_ADDRESS_LIST, SET_CARD_LIST } from '../types';

const initialState = {
  cart: [],
  payment: {},
  address: {},
  addressList: [],
  cardList: []
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItemIndex = state.cart.findIndex(item => item.product.id === action.payload.id);
      
      if (existingItemIndex > -1) {
        const newCart = [...state.cart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          count: newCart[existingItemIndex].count + 1
        };
        return { ...state, cart: newCart };
      }
      
      return {
        ...state,
        cart: [...state.cart, { count: 1, checked: true, product: action.payload }]
      };
    }
    
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };
      
    case UPDATE_CART_ITEM: {
        const newCart = state.cart.map(item => 
          item.product.id === action.payload.productId 
            ? { ...item, count: Math.max(1, action.payload.count) } 
            : item
        );
        return { ...state, cart: newCart };
    }

    case TOGGLE_CART_ITEM_CHECK: {
        const newCart = state.cart.map(item => 
            item.product.id === action.payload 
              ? { ...item, checked: !item.checked } 
              : item
        );
        return { ...state, cart: newCart };
    }

    case SET_CART:
      return { ...state, cart: action.payload };
    case SET_PAYMENT:
      return { ...state, payment: action.payload };
    case SET_ADDRESS:
      return { ...state, address: action.payload };
    case SET_ADDRESS_LIST:
      return { ...state, addressList: action.payload };
    case SET_CARD_LIST:
      return { ...state, cardList: action.payload };
    default:
      return state;
  }
};

export default shoppingCartReducer;
