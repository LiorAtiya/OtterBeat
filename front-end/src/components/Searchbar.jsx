import { FiSearch } from "react-icons/fi";

const Searchbar = ({searchChange, name}) => {

  return (
  <form autoComplete="off" className="p-2 text-gray-400 focus-within:text-gray-600">
    <div className="flex flex-row items-center justify-start">
      <FiSearch className="w-5 h-5 ml-4" />
      <input
        name="search-field"
        autoComplete="off"
        id="search-field"
        placeholder={`Search ${name}`}
        type="search"
        // value={searchTerm}
        onChange={searchChange}
        className="flex-1 p-4 text-base text-white placeholder-gray-500 bg-transparent border-none outline-none"
      />
    </div>
  </form>
  );
};

export default Searchbar;
