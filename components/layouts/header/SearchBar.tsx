import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar = () => {
  return (
    <div className="relative rounded-md shadow-sm flex-grow max-w-md hidden lg2:block">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4">
        <MagnifyingGlassIcon className="h-4 text-gray-500" />
      </div>

      <input
        type="text"
        name="price"
        id="price"
        className=" rounded-md w-full bg-gray-100 focus:bg-gray-50 px-10 border-gray-100 focus:border-gray-100 focus:ring-0 sm:text-sm transition placeholder:text-gray-500"
        placeholder="Search for Cakes, Pastries and more"
      />
    </div>
  );
};
export default SearchBar;
