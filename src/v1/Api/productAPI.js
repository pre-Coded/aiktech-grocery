import requestMaker from "../Lib";

export const fetchCategories = (data) => {
  const url = `/shop/category/`;
  const params = { ...data };
  const payload = {};
  return requestMaker(url, "get", { params, payload });
};

export const fetchCategoriesGlobal = (data) => {
  const url = `/shop/fetchcategories/`;
  const params = { ...data };
  const payload = {};
  return requestMaker(url, "get", { params, payload });
};

export const fetchOffers = (data) => {
  const url = `/shop/offers/`;
  const params = { ...data };
  const payload = {};
  return requestMaker(url, "get", { params, payload });
};

export const fetchProducts = (data) => {
  const { name, id } = data;
  const url = `/shop/products/${name}/${id}/`;
  const params = {};
  const payload = {};
  return requestMaker(url, "get", { params, payload });
};

export const fetchFavouriteProducts = (data) => {
  const url = `/shop/favourite_products/`;
  const params = {};
  const payload = {};
  return requestMaker(url, "get", { params, payload });
};

export const addFavouriteProduct = (data) => {
  const url = `/shop/addfavourite_products/`;
  const params = {};
  const payload = { ...data };
  return requestMaker(url, "post", { params, payload });
};

export const deleteFavouriteProduct = (data) => {
  const url = `/shop/favourite_products/`;
  const params = {};
  const payload = { ...data };
  return requestMaker(url, "delete", { params, payload });
};

export const addStock = (data) => {
  const url = `/shop/post/stock/`;
  const params = {};
  const payload = { ...data };
  return requestMaker(url, "post", { params, payload });
};

export const addUnit = (data) => {
  const url = `/shop/post/stockunit/`;
  const params = {};
  const payload = { ...data };
  return requestMaker(url, "post", { params, payload });
};

export const addProduct = (data) => {
  const url = `/shop/post/add_product/`;
  const params = {};
  const payload = { ...data };
  return requestMaker(url, "post", { params, payload },  {
    'Content-Type': 'multipart/form-data',
    'Accept': '*/*'
  });
};

export const addInventory = (data) => {
  const url = `/shop/post/inventory/`;
  const params = {};
  const payload = { ...data };
  return requestMaker(url, "post", { params, payload });
};

export const sellableProductSearch = (data) => {
  const { search, page } = data;
  const url = `/shop/sellableproductsearch/${search}/`;
  const params = page ? { page: page } : {};
  const payload = {};
  return requestMaker(url, "get", { params, payload });
};

export const searchProduct = (data) => {
  const { inv } = data;
  console.log(inv,"inv");
  const url = `/shop/productsearch/?inv=${inv}`;
  const params = {};
  const payload = {};
  return requestMaker(url, "get", { params, payload });
};

export const stockDropdowndetail = (data) => {
  const url = `/shop/get/stock/dropdowndetail/`;
  const params = { ...data };
  const payload = {};
  return requestMaker(url, "get", { params, payload });
};

export const fetchInventories = (data) => {
  const url = `/shop/inventory/`;
  const params = {};
  const payload = {};
  return requestMaker(url, "get", { params, payload });
};

export const fetchleafcategory = (data) => {
  const { leaf } = data;
  const url = `/shop/categories/leaf/`;
  const params = {};
  const payload = {};
  return requestMaker(url, "get", { params, payload });
};

export const fetchPagedProducts = (data) => {
  const { page , subCategoryName, subCategoryId } = data;
  console.log(data,"data");
  if(!page) page=1
  const url = `/shop/products/Pagination/`;
  const params = {data};
  const payload = {};
  return requestMaker(url, "get", { params, payload });
}

export const editProduct = (data) => {
  const url = `/shop/tenant/products/`;
  const params = {};
  const payload = { ...data };
  return requestMaker(url, "patch", { params, payload }, {
    'Content-Type': 'multipart/form-data',
  });
};

export const addSubCategory = (data) => {
  const url = `/shop/category/subcategory/`;
  const params = {};
  const payload = { ...data };
  return requestMaker(url, "put", { params, payload },  {
    'Content-Type': 'multipart/form-data',
    'Accept': '*/*'
  });
};