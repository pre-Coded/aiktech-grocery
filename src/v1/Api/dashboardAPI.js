import { method } from "lodash";
import requestMaker from "../Lib";



export const fetchAllOrders=(data)=>{
    const url = "/shop/fetch_all_orders/"
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
    const url='/shop/inventorys/fetch_all_inventorys/'
    const params={}
    const payload={}
    return requestMaker(url,"get",{params,payload})
}