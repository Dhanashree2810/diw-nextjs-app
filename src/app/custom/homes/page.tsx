import { verifySession, logout, decrypt } from '@/app/lib/session';
import HomesPage from '@/app/pages/homes/Homes';
import { getHomeCommonData } from '@/services/homes';
import { redirect } from 'next/navigation';

export default async function page() {
  const userToken  = await verifySession();

  if (!userToken) {
    console.log("No valid session token, redirecting to login");
    redirect('/');
    return;
  }
  
  const homeData = await getHomeCommonData(userToken);

  if (!homeData) {
    console.error("Failed to fetch home data");
  }

  return (
    <>   
      <HomesPage homeData={homeData} />
    </>
  )
}