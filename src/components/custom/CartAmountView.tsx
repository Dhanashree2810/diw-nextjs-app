'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaRupeeSign } from "react-icons/fa";


const CartAmountView = ({ cartBuyData }:any) => {
  const [cartSubTotalAmt, setCartSubTotalAmt] = useState(0);
  const [cartTotalRegularPrice, setCartTotalRegularPrice] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [cartBuyData]);

  const calculateTotal = () => {
    let subTotal = 0;
    let totalRegularPrice = 0;

    if (Array.isArray(cartBuyData)) {
      cartBuyData.forEach(element => {
        subTotal += element.totalAmount;
        totalRegularPrice += element.regularPrice * element.qty;
      });
    } else {
      console.error('cartBuyData is not an array or is null/undefined');
    }
    setCartSubTotalAmt(subTotal);
    setCartTotalRegularPrice(totalRegularPrice);
  };

  const productDiscountPercent = (totalPrice:number, subTotal:number) => {
    if (totalPrice === 0) return 0;
    return ((totalPrice - subTotal) / totalPrice * 100).toFixed(2);
  };

  return (
    <div className="flex justify-between p-4 bg-white border-t border-gray-200">
      <div className="">
        <p className="text-sm font-semibold text-gray-700">Total checkout Price</p>
        <div className="mt-2">
          <p className="text-lg font-semibold text-green-700 flex items-center">
            <FaRupeeSign size={20} />

            {cartSubTotalAmt.toFixed(2)}
          </p>

          <div className="flex items-center mt-2">
            <p className="text-xs font-semibold text-red-500">
              {productDiscountPercent(cartTotalRegularPrice, cartSubTotalAmt)}% OFF
            </p>
            <div className="flex items-center ml-2 line-through text-xs font-semibold text-gray-800">
              <span>M.R.P.</span>
              <p className="ml-1 flex items-center">
                <FaRupeeSign size={10}/>
                {cartTotalRegularPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <Link
          className="bg-green-700 text-white py-2 px-6 rounded-md"
          href={`/custom/carts`}
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default CartAmountView;
