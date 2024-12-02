'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdInbox } from 'react-icons/md';

interface CategoryItem {
  id: number;
  name: string;
  icon: string;
}

interface AccessoriesViewProps {
  categoryData: CategoryItem[];
}

const AccessoriesView = ({ categoryData }: AccessoriesViewProps) => {

  return (
    <div className="flex flex-wrap mt-5 bg-white">
      {categoryData.map((item: CategoryItem) => {
        const iconData = JSON.parse(item?.icon);
        const imagePath = `${process.env.NEXT_PUBLIC_API_URL}/ImportFiles/${iconData[0].filePath.replace(/\\/g, '/')}`;

        return (
          <Link
            key={item.id}
            href={item.name === 'Smart Krushi Kits' ? '/package' : `/product/category/${item.id}`}
            className="flex flex-col items-center py-3 px-2 m-4 bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer w-[120px]"            
          >
            <div className="">
              {item?.icon ? (
                <Image
                  src={imagePath}
                  alt={item?.name}
                  width={50}
                  height={50}
                  className="block mb-3 mx-auto"
                />
              ) : (
                <MdInbox className="text-red-500" size={30} />
              )}              
              <span className="text-xs font-semibold flex justify-center text-center capitalize text-gray-700">
                {item.name}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AccessoriesView;
