'use client'
import { useState, useEffect } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { getFunHomeUserData, getFunSearchProductData } from "@/app/actions/homes";
import Link from "next/link";
import LocationComponent from "./LocationComponent";


interface UserInfo {
    firstName: string;
    defaultLanguage: string;
    district?: string;
    state?: string;
}

interface Product {
    name: string;
    nameHi: string;
    nameMr: string;
    sku: string;
    image: string;
}

interface HeaderProps {
    toggleSidebar: any;
    sidebarVisible:any
}

export default function Header({ toggleSidebar,sidebarVisible }: HeaderProps) {
    const [query, setQuery] = useState("");
    const [showSearchDialog, setShowSearchDialog] = useState(false);
    const [showSearchResult, setShowSearchResult] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [cartDatas, setcartDatas] = useState<any[]>([]);
    const [notification, setnotification] = useState<any[]>([]);
    const [userInfo, setUserInfo] = useState<any>();

    useEffect(() => {
        const getSearchData = async () => {
            if (query.length > 1) {
                const productData = await getFunSearchProductData();
                const filtered = productData.filter(
                    (product: any) =>
                        product.name.toLowerCase().includes(query.toLowerCase()) ||
                        product.nameHi.toLowerCase().includes(query.toLowerCase()) ||
                        product.nameMr.toLowerCase().includes(query.toLowerCase()) ||
                        product.sku.toLowerCase().includes(query.toLowerCase())
                );
                setFilteredProducts(filtered);
            } else {
                setFilteredProducts([]);
            }
        }

        const getUserData = async () => {
            const userData = await getFunHomeUserData();
            setUserInfo(userData.userCustomData[0]);
        }
        getSearchData();
        getUserData();
    }, [query]);

    const handleToggleSidebar = () =>{        
        toggleSidebar();
    }

    return (
        <header className="mainHeader w-full p-4 bg-white shadow-md">
            <div className="headerContent flex justify-between items-center">
                <div className="menu flex items-center">
                    <IoMenuSharp className="h-6 w-6 text-gray-500 cursor-pointer" onClick={handleToggleSidebar} />
                    <div className=" flex flex-col ml-4">
                        <h2 className="name text-lg font-bold">Hi, {userInfo?.name}</h2>
                        <div>
                            <LocationComponent />
                        </div>
                    </div>
                </div>
                <div className="menuIcons flex space-x-4">
                    <div className="icon" onClick={() => setShowSearchDialog(true)}>
                        <IoSearchOutline className="h-6 w-6 text-gray-500 cursor-pointer" />
                    </div>

                    <Link href={`/allnotifications`}>
                        <div className="icon relative">
                            <FaRegBell className="h-6 w-6 text-gray-500 cursor-pointer" />
                            {notification.length > 0 && (
                                <span className="count absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                    {notification.length}
                                </span>
                            )}
                        </div>
                    </Link>

                    <Link href={`/carts`}>
                        <div className="icon relative">
                            <MdOutlineShoppingCart className="h-6 w-6 text-gray-500 cursor-pointer" />
                            {cartDatas.length > 0 && (
                                <span className="count absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                    {cartDatas.length}
                                </span>
                            )}
                        </div>
                    </Link>
                </div>
            </div>

            {showSearchDialog && (
                <div className="searchDialogBox fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50">
                    <div className="searchHeader bg-white p-4 flex items-center">
                        <button onClick={() => { setShowSearchDialog(false); setShowSearchResult(false); setQuery(""); }}>
                            <i className="ri-arrow-left-fill text-xl"></i>
                        </button>
                        <input
                            type="text"
                            className="ml-4 p-2 border rounded w-full"
                            placeholder={
                                userInfo?.defaultLanguage === "Hi"
                                    ? "सर्च..."
                                    : userInfo?.defaultLanguage === "Mr"
                                        ? "सर्च..."
                                        : "Search..."
                            }
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setShowSearchResult(true);
                            }}
                            autoFocus
                        />
                    </div>

                    {showSearchResult && (
                        <div className="searchResult p-4 bg-white">
                            {query.length > 1 && filteredProducts.length > 0 ? (
                                <ul>
                                    {filteredProducts.map((item) => (
                                        <Link href={`/products/${item.sku}`}>
                                            <li key={item.sku} className="flex items-center p-2 border-b">
                                                <img src={item.image.split(",")[0]} alt={item.name} className="h-8 w-8 mr-4" />
                                                <span>
                                                    {userInfo?.defaultLanguage === "Hi"
                                                        ? item.nameHi
                                                        : userInfo?.defaultLanguage === "Mr"
                                                            ? item.nameMr
                                                            : item.name}
                                                </span>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-center text-gray-500">
                                    {userInfo?.defaultLanguage === "Hi"
                                        ? "परिणाम नहीं मिला..."
                                        : userInfo?.defaultLanguage === "Mr"
                                            ? "निकाल सापडला नाही..."
                                            : "Result not found..."}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
