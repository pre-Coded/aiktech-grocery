import server from './server'

export const requestService = `${server}/api/contactus/request/`;
export const categoryList = `${server}/api/shop/category/`
export const productList = `${server}/api/shop/products/`; //<str:category>/

export const addtoCart = `${server}/api/shop/add_to_cart/` //<str:name>/<str:phone>/
export const showCart = `${server}/api/shop/get_cart/` //<str:phone>/
export const placeOrder = `${server}/api/shop/place_order/`//<pk>/<str:phone>/<str:name>/<str:delivert_type>/

export const itemCount = `${server}/api/shop/get_total_cart_item/` //8057152295/prashant/

export const feedBack = `${server}/api/account/feedback/`

export const get_invoice = `${server}/api/shop/invoice/` //<pk>/
export const place_order_everythin = `${server}/api/shop/place_order_everything/`
export const serachUser = `${server}/api/shop/usersearch/`
export const productSearch = `${server}/api/shop/productsearch/`
export const all_orders = `${server}/api/shop/all_orders/`
export const stock_dropdown = `${server}/api/shop/get/stock/dropdowndetail/`
export const post_stock = `${server}/api/shop/post/stock/`
export const post_unit = `${server}/api/shop/post/stockunit/`
export const post_product = `${server}/api/shop/post/add_product/`
export const post_inventory = `${server}/api/shop/post/inventory/`

export const wasted = `${server}/api/shop/post/wastedproduct/`


export const units = `${server}/api/shop/stock/units/`

// Searching for products.
export const searchItem = `${server}/api/shop/search/` //<str:query>/ 
export const getProduct = `${server}/api/shop/get_product/` //<int:id>/

