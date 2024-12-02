'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cartFunQuantityUpdate, getFunCartData } from "@/app/actions/cart";
import CartAmountView from "@/components/custom/CartAmountView";
import PageHeader from "@/components/custom/PageHeader";
import logo from '@/assets/logo.png';
import krushipackages from '@/assets/krushi-packages.svg';
import farmerschoice from '@/assets/farmers-choice.svg';
import { IoCartOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { getFunProductLiveData } from "@/app/actions/product";
import { globalStore, useUserStore } from "../../../../globalstate";
import { getFunWishlistData } from "@/app/actions/wishlist";


const SmartKrushiPackage = (props: any) => {
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [finalSalePrice, setFinalSalePrice] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [finalMinQty, setFinalMinQty] = useState(0);
  const [cartBuyData, setCartBuyData] = useState([]);
  const [productList, setProductList] = useState<any[]>([]);
  const { loginUserInfo } = useUserStore();
  const { setCartListBind, setCartListList, cartListBind, cartListList,setWatchListBind, setWatchListList } = globalStore();

  // useEffect(() => {
  //   const getAllCartData = async () => {
  //     const cartData = await getFunCartData();
  //     console.log("cartData", cartData);

  //     calculateTotal(cartData);
  //   };
  //   getAllCartData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getFunProductLiveData();
      setProductList(products);

      // if (!cartListBind) {
        const cartsData = await getFunCartData(loginUserInfo?.[0]?.id);
        
        setCartListList(cartsData);
        setCartListBind(true);
        calculateTotal(cartsData);

        const wishlistData = await getFunWishlistData(loginUserInfo?.[0]?.id);
        setWatchListList(wishlistData);
        setWatchListBind(true);        
      // }else{
      //   calculateTotal(cartListList);
      // }

      const smartKrushiPData = await props?.packageData;
      let packageData = smartKrushiPData[0];
      setSubscriptionData(packageData);

      const salePrice = loginUserInfo?.[0]?.role === "Farmer" ? packageData.salePriceFarmer : packageData.salePrice;
      setFinalSalePrice(salePrice);

      const minQty = loginUserInfo?.[0]?.role === "Farmer" ? packageData.minQtyFarmer : packageData.minQty;
      setFinalMinQty(minQty);

      const discountPercentage = parseProductDiscountPercent(`${packageData.regularPrice},${salePrice}`);
      setDiscountPercent(discountPercentage);

      const relatedProducts = JSON.parse(packageData?.relatedProduct);
      relatedProducts.forEach((item: any, index: number) => {
        const correspondingItem = products.find((product: any) => product.sku === item.sku);
        if (correspondingItem) {
          relatedProducts[index].name = correspondingItem.name;
        }
      });

      setRelatedProducts(relatedProducts);
    };
    fetchData();
  }, []);


  const parseProductDiscountPercent = (value: any) => {
    const prices = value.split(',').map(Number);
    if (prices.length !== 2 || isNaN(prices[0]) || isNaN(prices[1])) {
      return 0;
    }
    const actualPrice = prices[0];
    const salePrice = prices[1];
    const discountPercentage = ((actualPrice - salePrice) / actualPrice) * 100;
    return Math.round(discountPercentage * 100) / 100;
  };

  const calculateTotal = (arrayCartInput: any) => {
    setCartBuyData(arrayCartInput);
  };

  const updateCartData = async () => {
    const cartData = await getFunCartData();
    calculateTotal(cartData);
  };


  const addToCart = async (item: any, actionType: string) => {
    if (!loginUserInfo) {
      alert("User is not logged in. Please log in first.");
      return;
    }

    let tempMinQty = loginUserInfo?.[0]?.role === "Farmer" ? item.minQtyFarmer : item.minQty;
    let tempSalePrice = loginUserInfo?.[0]?.role == "Farmer" ? item.salePriceFarmer : item.salePrice;
    let tempRegularPrice = loginUserInfo?.[0]?.role == "Farmer" ? item.regularPriceFarmer : item.regularPrice;



    if (actionType === "submit") {

      if (!loginUserInfo) {
        alert("User information is not available. Please log in.");
        return;
      }

      let cartData: any = {
        name: item?.name,
        sku: item?.sku,
        slug: item?.slug,
        qty: finalMinQty,
        regularPrice: tempRegularPrice,
        salePrice: tempSalePrice,
        actualSalePrice: tempSalePrice,
        wogActualSalePrice: tempSalePrice,
        regularShippingAmount: 0,
        actualShippingAmount: 0,
        couponDiscount: 0,
        igst: item?.igst,
        sgst: item?.sgst,
        cgst: item?.cgst,
        totalGst: 0,
        totalAmount: tempSalePrice * finalMinQty,
        appUserId: loginUserInfo?.[0]?.id,
        image: item?.image,
        minQty: tempMinQty,
        totalShippingAmount: 0,
      };
      await cartFunQuantityUpdate(cartData, actionType);
      await updateCartData();
    } else {
      let tempMinQty = loginUserInfo?.[0]?.role == "Farmer" ? item.minQtyFarmer : item.minQty;
      if (actionType === 'add') {
        setFinalMinQty(finalMinQty + tempMinQty);
      } else if (actionType === 'remove') {
        setFinalMinQty(finalMinQty - tempMinQty);
        if (finalMinQty < 1) {
          setFinalMinQty(tempMinQty);
          alert('Minimum quantity reached');
        }
      }
    }
  };

  return (
    <>
      <PageHeader title="Smart Krushi Packages" />
      <div className="mx-auto p-4">
        <div className="bg-white shadow-md rounded-md overflow-hidden py-4 border-2 border-gray-200">
          <div className="flex justify-between items-center p-2">
            <Image
              src={logo}
              alt="Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={krushipackages}
              alt="Krushi Packages"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
        </div>

        <div className="bg-white my-5">
          <h2 className="text-xl font-semibold mt-2">{subscriptionData?.name}</h2>
          <Image
            src={farmerschoice}
            alt="Farmers Choice"
            width={200}
            height={100}
            className="object-contain mt-2"
          />
          <div className=" flex flex-row mt-2 gap-4">
            <p className="text-red-600 text-xl font-bold">{discountPercent}% </p>
            <p className="text-lg font-semibold ">
              ₹ {finalSalePrice}
            </p>
          </div>
          <p className="text-gray-700 text-sm font-semibold mt-2">
            M.R.P.: ₹ <span className="line-through"> {subscriptionData?.regularPrice}</span>
          </p>
        </div>

        <div className="mt-4">
          <table className="table-auto w-full text-left border-collapse text-sm">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="p-2">Sr. No</th>
                <th className="p-2">Product</th>
                <th className="p-2">Qty</th>
              </tr>
            </thead>
            <tbody>
              {relatedProducts.map((product: any, index: number) => (
                <tr key={product.sku} className="border-t">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className=" flex flex-row justify-between gap-5">
          <div className="flex items-center justify-center p-2 space-x-10 border border-gray-400 rounded-l-full rounded-r-full">
            <Button
              className="px-4 py-1 bg-gray-200 rounded-full"
              disabled={subscriptionData?.minQty == finalMinQty}
              onClick={() => addToCart(subscriptionData, "remove")}>
              -
            </Button>
            <span>{finalMinQty}</span>
            <Button className="px-4 py-1 bg-gray-700 rounded-full" onClick={() => addToCart(subscriptionData, "add")}>
              +
            </Button>
          </div>

          <Button
            disabled={subscriptionData?.minQty < 1}
            className="flex items-center justify-center w-full  p-6 bg-gray-700 text-white"
            onClick={() => addToCart(subscriptionData, "submit")}
          >
            <IoCartOutline size={24} />
            <span className="ml-2">Add to Cart</span>
          </Button>
        </div>
      </div>
      <div className="sticky bottom-0 w-full">
        <CartAmountView cartBuyData={cartBuyData} />
      </div>
    </>
  );
};

export default SmartKrushiPackage;
