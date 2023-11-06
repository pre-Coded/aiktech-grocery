import { SET_FAVOURITE_PRODUCTS, RESET_FAVOURITE_PRODUCTS, SET_CATEGORIES, SET_STOCK_DROPDOWN, SET_INVENTORY, SET_CATEGORIES_GLOBAL, SET_ALL_PRODUCTS } from '../actions/actionTypes';

const favouriteProductsInitialState = {
  products: [],
};

export const favouriteProductReducer = (state = favouriteProductsInitialState, { type, payload }) => {
  switch (type) {
    case SET_FAVOURITE_PRODUCTS: {
      return {
        ...state,
        ...payload
      };
    }
    case RESET_FAVOURITE_PRODUCTS: {
      return {
        ...payload
      };
    }
    default:
      return state;
  }
};

const categoriesInitialState = {
  list: [],
  globalCategories: []
};

export const categoriesReducer = (state = categoriesInitialState, { type, payload }) => {
  switch (type) {
    case SET_CATEGORIES: {
      return {
        ...state,
        ...payload
      };
    }
    case SET_CATEGORIES_GLOBAL: {
      return {
        ...state,
        ...payload
      };
    }
    default:
      return state;
  }
};

const stockDropdownInitialState = {
  list: {},
};

export const stockReducer = (state = stockDropdownInitialState, { type, payload }) => {
  switch (type) {
    case SET_STOCK_DROPDOWN: {
      return {
        ...state,
        ...payload
      };
    }
    default:
      return state;
  }
};

const inventoryInitialState = {
  list: [],
};

export const inventoryReducer = (state = inventoryInitialState, { type, payload }) => {
  switch (type) {
    case SET_INVENTORY: {
      return {
        ...state,
        ...payload
      };
    }
    default:
      return state;
  }
};
const productsearchInitialState = {
  results: [],
  loading: false,
  status: 400
};

export const productsearchReducer = (state = stockDropdownInitialState, { type, payload }) => {
  switch (type) {
    case SET_ALL_PRODUCTS: {
      return {
        ...state,
        ...payload
      };
    }
    default:
      return state;
  }
};