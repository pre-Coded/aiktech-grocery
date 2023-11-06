import { SET_EVERYTHING_ITEMS, RESET_EVERYTHING_ITEMS } from '../actions/actionTypes';

const everythingdeliveryInitialState = {
  items: [],
};

export const everythingDeliveryReducer = (state = everythingdeliveryInitialState, { type, payload }) => {
  switch (type) {
    case SET_EVERYTHING_ITEMS: {
      return {
        ...state,
        ...payload
      };
    }
    case RESET_EVERYTHING_ITEMS: {
      return {
        ...state,
        items: []
      };
    }
    default:
      return state;
  }
};
