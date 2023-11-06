import { OPEN_LOADER } from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  showSubmitBookingIdLoader: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_LOADER: {
      return {
        ...state,
        isLoading: true
      };
    }
    default:
      return state;
  }
};
