import { all } from 'redux-saga/effects';
import cartSagas from './cartSagas';
import productSagas from './productSaga';
import userSagas from './userSaga';

export default function* rootSaga() {
  yield all([cartSagas(), userSagas(), productSagas()]);
}
