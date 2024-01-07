import { method } from "lodash";
import requestMaker from "../Lib";

export const fetchAllOrders=(data)=>{
    const url = "/shop/tenant/orders/"
    const params={}
    const payload={}
    return requestMaker(url,"get",{params,payload})
}

export const fetchTenantID=(data)=>{
    const url='/account/tenants/fetch_tenant_id/'
    const params={}
    const payload={}
    return requestMaker(url,"get",{params,payload})
}

export const fetchInventorys=(data)=>{
    const url='/shop/inventories/'
    const params={}
    const payload={}
    return requestMaker(url,"get",{params,payload})
}

export const fetchOrderDetails = (data)=>{
    const url = `/shop/order/details/`
    const params={ ...data }
    const payload={}
    return requestMaker(url,"get",{params,payload})
}
export const fetchTenantProducts = (data)=>{
    const url = `/shop/tenant/products/`
    const params = { ...data }
    const payload = {}
    return requestMaker(url, "get", {params,payload})
}
export const fetchTenantCategories = (data)=>{
    const url = `/shop/tenant/categories/`
    const params = { ...data }
    const payload = {}
    return requestMaker(url, "get", {params,payload})
}

//  deleteProduct and delete Categories, subCategories
export const deleteProduct = (data)=>{
    const url = `/shop/tenant/products/`
    const params = {  }
    const payload = { ...data }
    return requestMaker(url, "delete", {params, payload})
}

export const deleteCategory = (data)=>{
    const url = `/shop/tenant/categories/`
    const params = {  }
    const payload = { ...data }
    return requestMaker(url, "delete", {params, payload})
}

export const deleteProductFromCategory = (data)=>{
    const url = `/shop/category/product/`
    const params = {  }
    const payload = { ...data }
    return requestMaker(url, "delete", {params, payload})
}

export const deleteSubCategoryFromCategory = (data)=>{
    const url = `/shop/category/subcategory/`
    const params = {  }
    const payload = { ...data }
    return requestMaker(url, "delete", {params, payload})
}

export const addCategory = (data)=>{
    const getFormData = data => Object.keys(data).reduce((formData, key) => {
        formData.append(key, data[key]);
        return formData;
    }, new FormData());
    const url = `/shop/post/add_category/`
    const params = {  }
    const payload = getFormData(data);
    return requestMaker(url, "post", {params,payload},{
        'Content-Type': 'multipart/form-data'
    })
}

export const editCategory = (data)=>{
    const getFormData = data => Object.keys(data).reduce((formData, key) => {
        formData.append(key, data[key]);
        return formData;
    }, new FormData());
    const url = `/shop/tenant/categories/`
    const params = {  }
    const payload = getFormData(data)
    return requestMaker(url, "patch", {params,payload})
}
export const addProductToCategory = (data)=>{
    const getFormData = data => Object.keys(data).reduce((formData, key) => {
        formData.append(key, data[key]);
        return formData;
    }, new FormData());
    const url = `/shop/category/product/`
    const params = {  }
    const payload = getFormData(data)
    return requestMaker(url, "patch", {params,payload})
}
export const linkProductToCategory = (data)=>{
    const url = `/shop/category/product/`
    const params = {  }
    const payload = { ...data }
    return requestMaker(url, "put", {params,payload})
}