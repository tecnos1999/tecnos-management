import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  searchTerm: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  return (
    <div className="flex items-center bg-gray-200 rounded-lg p-2 w-1/3">
      <FontAwesomeIcon icon={faSearch} className="text-gray-500 h-5 w-5" />
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={onSearch}
        className="bg-transparent focus:outline-none px-2 w-full"
      />
    </div>
  );
};

export default SearchBar;
