import { SET_CART_DATA, RESET_CART_DATA, SET_DELIVERY_CHARGE, SET_PREVIOUS_DELIVERY_CHARGE, SET_ALL_PRODUCTS } from '../actions/actionTypes';

const initialState = {
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CART_DATA: {
      return {
        ...state,
        ...payload
      };
    }
    case RESET_CART_DATA: {
      return {
        ...payload
      };
    }
    case SET_DELIVERY_CHARGE: {
      return {
        ...state,
        ...payload
      }
    }
    case SET_PREVIOUS_DELIVERY_CHARGE: {
      return {
        ...state,
        ...payload
      }
    }
    default:
      return state;
  }
};
