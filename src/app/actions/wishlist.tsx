'use server'
import { getWishlistData } from "@/services/wishlist";
import { verifySession } from "../lib/session";

export async function getFunWishlistData(userId?:any) {
    const token = await verifySession();
    const res = await getWishlistData(userId,token);
    return res;
}