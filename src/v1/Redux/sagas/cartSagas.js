import { call, put, takeLatest, select } from 'redux-saga/effects';
import { cartAPI } from '../../Api'
import { actionsCreator } from '../actions/actionsCreator';
import { FETCH_CART_DETAILS, UPDATE_CART_DETAILS } from '../actions/actionTypes';

const extractCartDetails = ({ cart = {} }) => ({ cart });

function* fetchCartDetails(action) {
    try {
        const response = yield call(cartAPI.fetchCartDetails, {});
        yield put(actionsCreator.SET_CART_DATA(response['data']));
    } catch (error) {
        yield put(actionsCreator.RESET_CART_DATA({}));
    }
}

function* updateCartDetails(action) {
    try {
        const { cart = {} } = yield select(extractCartDetails);
        const { cartitem = [] } = cart;
        if (cartitem && cartitem.length > 0) {
            let modifiedCartItems = [...cartitem].map(item => {
                return {
                    product: item.id,
                    quantity: item.quantity
                }
            });
            const payload = {
                items: modifiedCartItems
            }
            const response = yield call(cartAPI.addCartItems, payload);
            yield put(actionsCreator.RESET_CART_DATA({}));
            yield put(actionsCreator.FETCH_CART_DETAILS());
        }
    } catch (error) {

    }
}

export default function* cartSagas() {
    yield takeLatest(FETCH_CART_DETAILS, fetchCartDetails);
    yield takeLatest(UPDATE_CART_DETAILS, updateCartDetails);
}
