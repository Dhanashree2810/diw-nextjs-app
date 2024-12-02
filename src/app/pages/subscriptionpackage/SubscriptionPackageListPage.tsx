'use client'
import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import SearchBox from "@/components/custom/SearchBox";
import PageHeader from "@/components/custom/PageHeader";
import PackageImg from '@/assets/krushi-packages.svg';
import logo from '@/assets/logo.png'
import FarmerChoice from '@/assets/farmers-choice.svg';
import { useUserStore } from "../../../../globalstate";


const SubscriptionPackageListPage = (props: any) => {
  const [subscriptionPackageList, setSubscriptionPackageList] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { loginUserInfo } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      const data = await props.packageData;
      let sortedData = [...data].sort((a, b) => b.id - a.id);
      setSubscriptionPackageList(sortedData);
    };
    fetchData();
  }, []);

  const filteredSubscriptionPackage = subscriptionPackageList.filter((subpackage: any) =>
    subpackage.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };


  return (
    <>
      <PageHeader title="Smart Krushi Packages" />
      <div className=" mx-4">
        <SearchBox searchQuery={searchQuery} setSearchQuery={handleSearch} placeholder="Search Packages" />        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 w-[750px]">
          {filteredSubscriptionPackage.map((item: any) => {
            const finalSalePrice = loginUserInfo?.[0]?.role === 'Farmer' ? item.salePriceFarmer : item.salePrice;

            return (
              <Card className="border border-gray-200 shadow-md cursor-pointer">
                <Link key={item.id} href={`/custom/subscriptionpackages/details/${item.id}`}>
                  <CardHeader>
                    <Image src={logo} alt="Logo" width={50} height={50}
                    />
                    <Image
                      src={item.image || PackageImg}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="mx-auto"
                    />
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-sm font-semibold text-gray-700">
                      {item.name}
                    </h3>
                    {item.isFarmerChoice && (
                      <Image
                        src={FarmerChoice}
                        alt="Farmer's Choice"
                        width={100}
                        height={40}
                        className="object-cover mx-auto"
                      />
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col justify-between items-start">
                    <div className="flex items-center text-gray-700">
                      <span className="text-sm">₹{finalSalePrice}</span>
                    </div>
                    <div className="flex items-center text-green-700 font-semibold">
                      <span className="text-xs">Save</span>
                      <span className="text-xs ml-1">₹{item.regularPrice - finalSalePrice}</span>
                    </div>
                  </CardFooter>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SubscriptionPackageListPage;
