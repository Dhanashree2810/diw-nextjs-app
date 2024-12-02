'use server'
import { getHomeCommonData, getHomeUserData, getSearchProductData } from "@/services/homes";
import { verifySession } from "../lib/session";

export async function getFunHomeCommonData(tokendata?:any) {
    // const token = await verifySession();
    const res = await getHomeCommonData(tokendata);
    return res;
}

export async function getFunHomeUserData() {
    const token = await verifySession();
    const res = await getHomeUserData(token);
    return res;
}


export async function getFunSearchProductData() {
    const token = await verifySession();
    const res = await getSearchProductData(token);
    return res;
}

