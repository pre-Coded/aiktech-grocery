import { UPDATE_WALLET, } from '../actions/actionTypes';

const initialState = {
    isWallet : false,
    walletBalance : 0
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_WALLET: {
        console.log(state)
        console.log(payload)
      return {
          ...state,
        ...payload,
      };
    }
    default:
      return state;
  }
};
