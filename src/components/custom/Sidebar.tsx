'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@mdi/react';
import {
    mdiClose,
    mdiHome,
    mdiAccount,
    mdiHeartOutline,
    mdiOfficeBuildingOutline,
    mdiTrashCanOutline,
    mdiNotebookOutline,
    mdiHeadset
} from '@mdi/js';
import Image from 'next/image';
import { BiLogOutCircle } from "react-icons/bi";
import farmerImg from '@/assets/farmers-img.jpg';
import LocationComponent from './LocationComponent';
import { useUserStore } from '../../../globalstate';

interface SidebarProps {
    onClose: () => void;
    isOpen: boolean;
}

const Sidebar = ({ onClose, isOpen }: SidebarProps) => {
    const [activeMenu, setActiveMenu] = useState('/custom/home');
    const { loginUserInfo } = useUserStore();

    const logout = () => {
        useUserStore.getState().clearLoginUserInfo();
        console.log("User logged out");
    };

    const menuItems = [
        { name: 'Home', icon: mdiHome, path: '/custom/home' },
        { name: 'About Us', icon: mdiOfficeBuildingOutline, path: '/custom/about' },
        { name: 'My Profile', icon: mdiAccount, path: '/custom/myprofile' },
        { name: 'Wishlist', icon: mdiHeartOutline, path: '/custom/wishlist' },
        { name: 'Terms & Condition', icon: mdiNotebookOutline, path: '/custom/termscondition' },
        { name: 'Privacy Policy', icon: mdiNotebookOutline, path: '/custom/privacypolicy' },
        { name: 'Return/Refund Policy', icon: mdiNotebookOutline, path: '/custom/refundpolicy' },
        { name: 'Contact Us', icon: mdiHeadset, path: '/custom/contact' },
        { name: 'Delete User', icon: mdiTrashCanOutline, path: '/custom/deleteuser' },
    ];

    return (
        <div className={`fixed inset-y-0 left-0 w-4/5 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 z-50`}>
            <button className="absolute top-4 right-4" onClick={onClose}>
                <Icon path={mdiClose} size={1} />
            </button>

            <div className="flex items-center p-2 bg-gray-50">
                <div className="mr-4">
                    <Image src={farmerImg} alt="Profile Image" width={50} height={50} className="rounded-full" />
                </div>
                <div>
                    {loginUserInfo && loginUserInfo.length > 0 ? (
                        <p className="text-lg font-bold text-gray-800">
                            {loginUserInfo?.[0]?.name}
                        </p>
                    ) : (
                        <p className="text-lg text-gray-600">User not logged in</p>
                    )}
                    <LocationComponent />
                </div>
            </div>

            <nav className="mt-2">
                {menuItems.map((item, index) => (

                    <Link key={index} href={item.path || '#'} passHref>
                        <span
                            className={`flex items-center mb-2 p-2 mx-4 rounded-sm transition-colors border border-gray-200 ${activeMenu === item.path ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
                            onClick={() => {
                                setActiveMenu(item.path);
                                onClose();
                            }}
                        >
                            <Icon path={item.icon} size={1} className="mr-3" />
                            <span className="text-sm font-medium">{item.name}</span>
                        </span>
                    </Link>
                ))}
                <footer className="flex p-3 mx-4  items-center bg-white rounded-sm border border-gray-200">
                    <Link href="/" className="flex items-center text-sm font-medium gap-3 text-gray-700" onClick={logout}>
                        <BiLogOutCircle className="h-6 w-6 " />
                        Logout
                    </Link>
                </footer>
            </nav>
        </div>
    );
};

export default Sidebar;
