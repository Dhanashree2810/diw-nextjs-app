import Link from 'next/link';
import { MdSearch } from 'react-icons/md';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

interface HeaderProps {
  title: string;
}

const PageHeader = ({ title }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between w-full bg-white border-b border-gray-300 px-3 py-3">
      <Link href="/custom/homes" passHref>
        <div className="flex items-center flex-1 cursor-pointer">
          <MdOutlineKeyboardArrowLeft size={24} />
          <h1 className="ml-2 text-sm font-semibold capitalize text-gray-600">{title}</h1>
        </div>
      </Link>
      {/* <div className="relative flex items-center">
        <MdSearch className="text-gray-800 w-6 h-6" />                
      </div> */}
    </div>
  );
};

export default PageHeader;
