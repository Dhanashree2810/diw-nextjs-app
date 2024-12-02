'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import PackageImg from '@/assets/krushi-packages.svg';
import FarmerChoice from '@/assets/farmers-choice.svg';
import logo from '@/assets/logo.png';
import { useUserStore } from "../../../../globalstate";

const SmartKrushiPackagesView = ({ subscriptionData }: any) => {
  const [products, setProducts] = useState(subscriptionData.slice(0, 4));
  const { loginUserInfo } = useUserStore();

  return (
    <div className="py-4 mt-6 mx-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image
            src={PackageImg}
            alt="Krushi Packages"
            width={28}
            height={28}
          />
          <h2 className="text-lg font-semibold text-gray-800 capitalize">
            Smart Krushi Packages
          </h2>
        </div>
        <div>
          <Link href="/custom/subscriptionpackages">
            <span className="text-sm font-bold text-gray-600">View All</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 w-[700px]">
        {products.map((item: any) => {
          const finalSalePrice =
          loginUserInfo?.[0]?.role === "Farmer" ? item.salePriceFarmer : item.salePrice;

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
                      height={20}
                      className="mx-auto"
                    />
                  )}
                </CardContent>
                <CardFooter className="flex flex-col justify-between items-start">
                  <div className="flex items-center text-gray-700">
                    <span className="text-sm">₹{finalSalePrice}</span>
                  </div>
                  <div className="flex items-center text-green-700 font-semibold mt-1">
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
  );
};

export default SmartKrushiPackagesView;
