'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import CropsImg from '@/assets/crops.svg';
import GreenFarm from '@/assets/green-farm.jpg';

const TrendingCropsView = ({ cropData }: { cropData: any }) => {
  const [crops, setCrops] = useState(cropData.reverse().slice(0, 4));

  return (
    <div className="py-4 mt-6 mx-4 mb-14">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image src={CropsImg} alt="Crops" width={32} height={32} />
          <h2 className="ml-2 text-xl font-semibold text-gray-800">Trending Crops</h2>
        </div>

        <div>
          <Link href="/crop" passHref>
            <span className="text-sm font-bold text-gray-600">View All</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 w-[700px]">
        {crops.map((item: any) => {
          const iconData = JSON.parse(item.image);
          const imagePath = `${process.env.NEXT_PUBLIC_API_URL}/ImportFiles/${iconData[0].filePath.replace(/\\/g, '/')}`;

          let dynamicStyle = '';
          if (item?.classSeason === 'season monsoon') {
            dynamicStyle = 'bg-green-500';
          }
          if (item?.classSeason === 'season summar') {
            dynamicStyle = 'bg-yellow-500';
          }
          if (item?.classSeason === 'season winter') {
            dynamicStyle = 'bg-blue-500';
          }

          return (
            <div className="border shadow-sm rounded-lg overflow-hidden flex flex-col m-2 w-[165px] cursor-pointer">
              <Link href={`/crop/detail/${item.id}`} key={item.id} passHref>
                <div className="flex items-center justify-center">
                  {item?.image ? (
                    <Image
                      className="w-full h-[150px] object-cover"
                      src={imagePath}
                      alt={item.name}
                      width={180}
                      height={180}
                    />
                  ) : (
                    <Image
                      className="w-full h-[150px] object-cover"
                      src={GreenFarm}
                      alt={item.name}
                      width={180}
                      height={180}
                    />
                  )}
                </div>
                <div className="p-3 flex-1">
                  <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                  <div className={cn(`text-white text-sm mt-2 px-3 py-1 flex justify-center text-center w-fit rounded-md ${dynamicStyle}`)}>
                    <p>{item.actualSeason}</p>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div >
  );
};

export default TrendingCropsView;
