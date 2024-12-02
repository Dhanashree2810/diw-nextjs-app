'use server'
import { getSubscriptionPackageData, searchSubscriptionPackage } from "@/services/subscriptionpackage";
import { verifySession } from "../lib/session";

export async function getFunSubscriptionPackage(tokendata?:any) {
    const res = await getSubscriptionPackageData(tokendata);
    return res;
}

export async function searchFunSubscriptionPackage(id?:any) {
    const token = await verifySession();
    const res = await searchSubscriptionPackage(id,token);
    return res;
}



