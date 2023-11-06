import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import loaderReducer from './loaderReducer';
import paymentReducers from './paymentReducers';
import { everythingDeliveryReducer } from './orderReducer';
import { categoriesReducer, favouriteProductReducer, inventoryReducer, stockReducer, productsearchReducer } from './productReducer';

export default combineReducers({
  loader: loaderReducer,
  cart: cartReducer,
  auth: authReducer,
  payment:paymentReducers,
  favouriteProducts: favouriteProductReducer,
  categories: categoriesReducer,
  stockdropdown: stockReducer,
  everythingDelivery: everythingDeliveryReducer,
  inventory: inventoryReducer,
  productsearch: productsearchReducer
});
