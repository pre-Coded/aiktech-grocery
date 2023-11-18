import { call, put, takeLatest, select } from 'redux-saga/effects';
import { productAPI } from '../../Api'
import { actionsCreator } from '../actions/actionsCreator';
import { FETCH_FAVOURITE_PRODUCTS, FETCH_CATEGORIES, FETCH_STOCK_DROPDOWN, FETCH_INVENTORY, FETCH_CATEGORIES_GLOBAL, FETCH_ALL_PRODUCTS } from '../actions/actionTypes';
import get from 'lodash/get';
import { formatOptions } from '../../Utils/general-utils';
import { toast } from 'react-toastify'

// const extractCartDetails = ({ cart = {} }) => ({ cart });

function* fetchFavouriteProducts(action) {
    try {
        const response = yield call(productAPI.fetchFavouriteProducts, {});
        const data = get(response, 'data.data', [])
        yield put(actionsCreator.SET_FAVOURITE_PRODUCTS({ products: data }));
    } catch (error) {

    }
}

function* fetchCategories(action) {
    try {
        const response = yield call(productAPI.fetchCategories, {});
        const data = get(response, 'data.data', [])
        yield put(actionsCreator.SET_CATEGORIES({ list: data }));
    } catch (error) {

    }
}

function* fetchCategoriesGlobal(action) {
    try {
        const response = yield call(productAPI.fetchCategoriesGlobal, {});
        const data = get(response, 'data.data', [])
        yield put(actionsCreator.SET_CATEGORIES_GLOBAL({ globalCategories: data }));
    } catch (error) {

    }
}

function* fetchStockDropdown(action) {
    try {
        const response = yield call(productAPI.stockDropdowndetail, {});

        const data = get(response, 'data', [])
        yield put(actionsCreator.SET_STOCK_DROPDOWN({ list: data }));
    } catch (error) {

    }
}

function* fetchInventories(action) {
    try {
        const response = yield call(productAPI.fetchInventories, {});
        const data = get(response, 'data.results', []);
        const formattedData = formatOptions(data, 'name', 'id', 'is_active');
        yield put(actionsCreator.SET_INVENTORY({ list: formattedData }));
    } catch (error) {

    }
}

function* fetchProductsearch(action) {
    try {
        yield put(actionsCreator.SET_ALL_PRODUCTS({ loading: true }));
        const response = yield call(productAPI.searchProduct, {inv: action.payload});
        yield put(actionsCreator.SET_ALL_PRODUCTS({ status: 400 }));
        const data = get(response, 'data.results', []);
        yield put(actionsCreator.SET_ALL_PRODUCTS({ results: data }));
        if (response.status===200){
            yield put(actionsCreator.SET_ALL_PRODUCTS({ loading: false }))
        }
        else{
            yield put(actionsCreator.SET_ALL_PRODUCTS({ loading: false }))
            toast.error("ERROR. in API");
        }
    } catch (error) {
        yield put(actionsCreator.SET_ALL_PRODUCTS({ loading: false }))
        toast.error("SERVER ERROR!");
    }
}

export default function* productSagas() {
    yield takeLatest(FETCH_FAVOURITE_PRODUCTS, fetchFavouriteProducts);
    yield takeLatest(FETCH_CATEGORIES, fetchCategories);
    yield takeLatest(FETCH_STOCK_DROPDOWN, fetchStockDropdown);
    yield takeLatest(FETCH_INVENTORY, fetchInventories);
    yield takeLatest(FETCH_CATEGORIES_GLOBAL, fetchCategoriesGlobal);
    yield takeLatest(FETCH_ALL_PRODUCTS, fetchProductsearch); 
} 

