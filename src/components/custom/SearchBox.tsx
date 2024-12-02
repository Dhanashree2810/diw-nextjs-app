import { ChangeEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder: string;
}

const SearchBox  = ({ searchQuery, setSearchQuery, placeholder }:SearchBoxProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-lg p-1 m-2 gap-2">
      <AiOutlineSearch className="text-gray-500 text-xl" />
      <input
        type="text"
        className="flex-1 h-8 bg-transparent outline-none font-poppins text-gray-500"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBox;
