import { verifySession } from '@/app/lib/session';
import SubscriptionPackageListPage from '@/app/pages/subscriptionpackage/SubscriptionPackageListPage';
import { getSubscriptionPackageData } from '@/services/subscriptionpackage';

export default async function page() {
  const tokendata = await verifySession();
  const packageData = await  getSubscriptionPackageData(tokendata);
  console.log("packageData",packageData);
  
  return (
    <div>
        <SubscriptionPackageListPage packageData={packageData}/>
    </div>
  )
}
