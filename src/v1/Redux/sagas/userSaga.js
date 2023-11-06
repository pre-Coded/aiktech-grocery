import { call, put, takeLatest, select } from 'redux-saga/effects';
import { authAPI } from '../../Api';
import { actionsCreator } from '../actions/actionsCreator';
import { LOGOUT_USER, FETCH_USER_DETAILS } from '../actions/actionTypes';
import get from 'lodash/get';
import { toast } from 'react-toastify';

function* logoutUser(action) {
    try {
        yield put(actionsCreator.SET_LOGIN({ isLoggedIn: false, userDetails: {} }));
        yield put(actionsCreator.RESET_CART_DATA({}));
        yield put(actionsCreator.RESET_FAVOURITE_PRODUCTS({}));
        yield put(actionsCreator.RESET_EVERYTHING_ITEMS());
        localStorage.removeItem('auth_token');
    } catch (error) {

    }
}

function* fetchUserDetails(action) {
    try {
        const response = yield call(authAPI.fetchUserDetails);
        const data = get(response, 'data.data', {});
        yield put(actionsCreator.SET_USER_DETAILS(data));
    } catch (error) {
        yield put(actionsCreator.SET_USER_DETAILS({}));
    }
}

export default function* userSagas() {
    yield takeLatest(LOGOUT_USER, logoutUser);
    yield takeLatest(FETCH_USER_DETAILS, fetchUserDetails);
}
