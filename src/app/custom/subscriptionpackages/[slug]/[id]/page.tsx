import { verifySession } from '@/app/lib/session';
import SubscriptionPackageDetailsPage from '@/app/pages/subscriptionpackage/SubscriptionPackageDetailsPage';
import { searchSubscriptionPackage } from '@/services/subscriptionpackage';


const EditSubscriptionPackagePage = async ({ params }: { params: { id: string } }) => {
    const tokendata = await verifySession();
    const { id } = params;
    let packageData;
    
    if (id) {
        packageData = await searchSubscriptionPackage(id,tokendata);
    }
    
    return <SubscriptionPackageDetailsPage packageData={packageData}/>;   
};

export default EditSubscriptionPackagePage;