'use server'
import { cartQuantityUpdate, getCartData } from "@/services/cart";
import { verifySession } from "../lib/session";

export async function getFunCartData(userId?:any) {
    const token = await verifySession();
    const res = await getCartData(userId,token);
    return res;
}

export async function cartFunQuantityUpdate(formData?:FormData,actionType?:string) {
    const token = await verifySession();
    const res = await cartQuantityUpdate(formData,actionType,token);
    return res;
}



