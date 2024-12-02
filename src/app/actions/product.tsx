'use server'
import { getProductLiveData } from "@/services/product";
import { verifySession } from "../lib/session";

export async function getFunProductLiveData() {
    const token = await verifySession();
    const res = await getProductLiveData(token);
    return res;
}



