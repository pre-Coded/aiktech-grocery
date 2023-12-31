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