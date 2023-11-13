import { method } from "lodash";
import requestMaker from "../Lib";



export const fetchAllOrders=(data)=>{
    const url = "/shop/fetch_all_orders/"
    const params={}
    const payload={}
    return requestMaker(url,"get",{params,payload})
}