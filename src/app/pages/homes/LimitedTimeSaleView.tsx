'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';
import logo from '@/assets/logo.png';
import saleImg from '@/assets/sale.svg';

const LimitedTimeSaleView = ({ limitedTimeSale }: any) => {
  const [products, setProducts] = useState(limitedTimeSale.slice(0, 4));

  const addDeliverData = (item: any) => {
    if (item && item.deliveredData && !item.totalDeliverProductAdded) {
      let formattedData = item.deliveredData.trim();
      let additionalDelivered = parseInt(
        formattedData.startsWith('+') ? formattedData.substring(1) : formattedData
      );
      if (isNaN(additionalDelivered)) {
        additionalDelivered = 0;
      }
      item.totalDeliverProduct = isNaN(parseInt(item.totalDeliverProduct))
        ? 0
        : parseInt(item.totalDeliverProduct);
      item.totalDeliverProduct += additionalDelivered;
      item.totalDeliverProductAdded = true;
    }
    return `${item.totalDeliverProduct}`;
  };

  const formatEndDate = (endDate: any) => {
    return moment(endDate).format('DD MMMM');
  };

  return (  
    <div className="trending-products py-4 mt-5 mx-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image src={saleImg} alt="Trending Products" width={28} height={28} />
          <h2 className="text-lg font-semibold text-gray-900 ml-2 capitalize">Limited Time Sale</h2>
        </div>
        <div>
          <Link href="/product">
            <span className="text-sm font-bold text-gray-600">View All</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 w-[700px]">
        {products.map((item: any) => {
          const imageUrls = item.image.split(',').map((url: string) => url.trim());

          return (
            <div className="p-3 border border-gray-200 bg-white shadow-md rounded-md ">
              <Link key={item.id} href={`/product/details/${item.sku}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <Image src={logo} alt="Logo" width={50} height={50} />
                  </div>
                  {/* <div className="border border-gray-200 rounded-full bg-white p-1">
                  <WatchList productId={item.id} name={item.name} sku={item.sku} slug={item.slug} />
                </div> */}
                  <div className="addtoCart">
                    <button className="text-blue-500">
                      {/* onClick={() => addToCart(item, 'submit')} */}
                      <i className="iconoir-cart"></i>
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex justify-center items-center">
                  {item?.image ? (
                    <Image src={imageUrls[0]} alt={item.name} width={150} height={150} />
                  ) : null}
                </div>
                <div className="mt-1 pt-3">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h3>                  
                  <div className="mt-2 text-xs text-white bg-green-800 p-2 w-fit leading-3 rounded-sm font-semibold ">
                    {formatEndDate(item.endDate)}
                  </div>
                  <p className="mt-2 text-xs text-gray-700">
                    <span className="text-green-600">{addDeliverData(item)} + </span>
                    Products Delivered
                  </p>
                </div>
              </Link>
            </div>

          );
        })}
      </div>
    </div>

  );
};

export default LimitedTimeSaleView;
