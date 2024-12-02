'use client';
import { useState } from 'react';
import Link from 'next/link';
import { MdHome, MdLocationOn, MdAdd, MdCancel, MdPerson } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaCartArrowDown, FaFlask } from 'react-icons/fa';
import { BsChatDots } from 'react-icons/bs';


const FooterTabs = () => {
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(true);

  const toggleMenu = () => {
    setOpen(!open);
    setIsAdd(!isAdd);
  };


  return (
    <>
      <div className="flex justify-between items-center bg-white p-2 border-t border-gray-400 shadow-md fixed bottom-0 w-full z-20">
        <Link href="/custom/home">
          <span className="flex flex-col items-center text-gray-600">
            <MdHome size={25} />
            <span className="text-xs font-semibold pt-2">HOME</span>
          </span>
        </Link>

        <Link href="/custom/plotmapping">
          <span className="flex flex-col items-center text-gray-600">
            <MdLocationOn size={25} />
            <span className="text-xs font-semibold  pt-2">PLOT MAPPING</span>
          </span>
        </Link>

        <div className="relative">
          <button
            className="bg-green-700 p-3 rounded-full text-white absolute -top-16 left-1/2 transform -translate-x-1/2 z-30"
            onClick={toggleMenu}
          >
            {isAdd ? <MdAdd size={30} /> : <MdCancel size={30} />}
          </button>
        </div>

        <Link href="/custom/discusses">
          <span className="flex flex-col items-center text-gray-600">
            <BsChatDots size={25} />
            <span className="text-xs font-semibold  pt-2">KRUSHI CHARCHA</span>
          </span>
        </Link>

        <Link href="/custom/labs">
          <span className="flex flex-col items-center text-gray-600">
            <FaFlask size={25} />
            <span className="text-xs font-semibold  pt-2">SOIL TESTING</span>
          </span>
        </Link>
      </div>

      <div
        className={`fixed bottom-14 left-0 w-full bg-white shadow-lg pt-6 px-6 pb-12 rounded-t-xl transform transition-transform duration-300 ease-in-out 
        ${open ? 'translate-y-0' : 'translate-y-full'} z-10`}
      >
        <div className="flex justify-evenly items-center gap-4">
          <Link href="/custom/wishlist">
            <span className="flex flex-col items-center text-gray-600">
              <AiOutlineHeart size={22} />
              <span className="text-xs  font-semibold">WISHLIST</span>
            </span>
          </Link>

          <Link href="/custom/buyorder">
            <span className="flex flex-col items-center text-gray-600">
              <MdPerson size={22} />
              <span className="text-xs font-semibold">MY ORDERS</span>
            </span>
          </Link>

          <Link href="/custom/product/buyagain">
            <span className="flex flex-col items-center text-gray-600">
              <FaCartArrowDown size={22} />
              <span className="text-xs  font-semibold">BUY AGAIN</span>
            </span>
          </Link>
        </div>
      </div>

    </>
  );
};

export default FooterTabs;
