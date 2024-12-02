'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import WatchList from '../watchlist/WatchList'; // ShadCN dropdown for watchlist
import logo from '@/assets/logo.png';
import productimg from '@/assets/trending-products.svg';
import { useUserStore } from '../../../../globalstate';

const TrendingProductsView = ({ productData }: any) => {
  const [products, setProducts] = useState(productData.slice(0, 4));
  const { loginUserInfo } = useUserStore();

  const calculateDiscount = (actualPrice: any, salePrice: any) => {
    if (!actualPrice || !salePrice) return 0;

    const discountPercentage = ((actualPrice - salePrice) / actualPrice) * 100;
    const roundedDiscount = Math.round(discountPercentage * 100) / 100;

    return roundedDiscount > 0 ? roundedDiscount : 0;
  };

  const addDeliverData = (item: any) => {
    if (item && item.deliveredData && !item.totalDeliverProductAdded) {
      let formattedData = item.deliveredData.trim();
      let additionalDelivered = parseInt(formattedData.startsWith('+') ? formattedData.substring(1) : formattedData);
      if (isNaN(additionalDelivered)) {
        additionalDelivered = 0;
      }
      item.totalDeliverProduct = isNaN(parseInt(item.totalDeliverProduct)) ? 0 : parseInt(item.totalDeliverProduct);
      item.totalDeliverProduct += additionalDelivered;
      item.totalDeliverProductAdded = true;
    }
    return `${item.totalDeliverProduct}`;
  };

  const calculateDiscountPercent = (regularPrice: any, salePrice: any) => {
    if (regularPrice > 0 && salePrice < regularPrice) {
      return ((regularPrice - salePrice) / regularPrice * 100).toFixed(2);
    }
    return 0;
  };

  return (
    <div className="trending-products py-4 mt-5 mx-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image src={productimg} alt="Trending Products" width={28} height={28} />
          <h2 className="text-lg font-semibold text-gray-900 ml-2 capitalize">Trending Product</h2>
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
          let discountPercent: any;
          if (loginUserInfo?.[0]?.role === 'DEALER') {
            discountPercent = calculateDiscountPercent(item.regularPrice, item.salePrice);
          } else {
            discountPercent = calculateDiscountPercent(item.regularPrice, item.salePriceFarmer);
          }

          let limited = new Date(item.endDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
          });


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
                  {item.size && (<small className="size"><span className="fw-600">{item.size}</span></small>)}

                  {discountPercent > 1 && (
                    <p className="mt-1 text-xs bg-green-700 w-fit flex items-center justify-center text-white px-2 py-1 rounded-md text-center">
                      Upto {discountPercent}% off
                    </p>
                  )}                  
                  <p className="mt-2 text-xs text-gray-700 font-semibold">
                    <span className="text-green-600 ">{addDeliverData(item)} + </span>
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

export default TrendingProductsView;
