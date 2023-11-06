import requestMaker from "../Lib";

export const fetchCartDetails = (data) => {
  const url = `/shop/get_cart/`;
  const params = {};
  const payload = {};
  return requestMaker(url, "get", { params, payload });
};

export const addCartItems = (payload) => {
  const url = `/shop/add_to_cart/`;
  const params = {};
  return requestMaker(url, "post", { params, payload });
};

export const placeOrder = (payload, cartId) => {
  const url = `/payments/checkout/${cartId}/EXPRESS/`;
  const params = {};
  return requestMaker(url, "post", { params, payload });
};

export const placeEverythingDelivery = (payload) => {
  const url = `/shop/place_order/-1/EVERYTHING/`;
  const params = {};
  return requestMaker(url, "post", { params, payload });
};

export const activeOrders = (pageno, payload) => {
  const url = `/shop/recent_order/?page=${pageno}`;
  const params = {};
  return requestMaker(url, "get", { params, payload });
};

export const fetchInvoice = (data) => {
  const { invoiceId = "" } = data;
  const url = `/shop/invoice/${invoiceId}/`;
  const params = {};
  const payload = {};
  return requestMaker(url, "get", { params, payload });
};

export const placeOrderByAgent = (data) => {
  const url = `/shop/place_order_everything/`;
  const params = {};
  const payload = { ...data };
  return requestMaker(url, "post", { params, payload });
};

export const fetchUnits = (data) => {
  const url = `/shop/stock/units/`;
  const params = {};
  const payload = {};
  return requestMaker(url, "get", { params, payload });
};

export const fetchDiscounts = (data) => {
  const url = `/shop/discount/`;
  const params = {};
  const payload = {};
  return requestMaker(url, "get", { params, payload });
};

export const applyDiscount = (data) => {
  const url = `/shop/cart/discount/`;
  const params = {};
  const payload = { ...data };
  return requestMaker(url, "post", { params, payload });
};

export const removeDiscount = (data) => {
  const url = `/shop/cart/discount/`;
  const params = {};
  const payload = { ...data };
  return requestMaker(url, "delete", { params, payload });
};

export const getWalletData = (data) => {
  const url = `/account/wallet/`;
  const params = {};
  const payload = {};
  return requestMaker(url, "get", { params, payload });
};

export const debitWallet = (payload) => {
  const url = `/account/wallet/`;
  const params = {};
  return requestMaker(url, "post", { params, payload });
};
