import { FunnelIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import SimpleBar from "simplebar-react";
import { Category, Flavour, SubCategory } from "../../types/categoriesTypes";
import FilterBar from "./FilterBar";

interface Props {
  flavours: Flavour[];
  categories?: Category[];
  subCategories?: SubCategory[];
  selectedFlavours: string[];
  onPriceChange: (value: number) => void;
  onFlavourChange: (flavours: string[]) => void;
}

const MobileFilter = ({
  categories,
  flavours,
  onFlavourChange,
  onPriceChange,
  selectedFlavours,
  subCategories,
}: Props) => {
  const [showFilters, setShowFilters] = useState(false);

  const filterMenuRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const showFilterHandler = () => {
    setShowFilters(true);
  };

  const closeFilterMenu = () => {
    setShowFilters(false);
  };

  useClickAway(filterMenuRef, closeFilterMenu);

  return (
    <>
      <button
        className="lg:hidden flex items-center gap-1 text-gray-600  px-4 py-1.5 rounded-md shadow bg-white border active:bg-gray-50 transition duration-150"
        onClick={showFilterHandler}
      >
        <FunnelIcon className="h-5 w-5 text-gray-600" />
        <span>Filter</span>
      </button>

      {showFilters && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-25">
          <div ref={filterMenuRef} className="bg-white w-60 h-full shadow-xl">
            <SimpleBar style={{ maxHeight: "100%", scrollBehavior: "smooth" }}>
              <FilterBar
                categories={categories}
                subCategories={subCategories}
                flavours={flavours}
                onPriceChange={onPriceChange}
                onFlavourChange={onFlavourChange}
                selectedFlavours={selectedFlavours}
              />
            </SimpleBar>
          </div>
        </div>
      )}
    </>
  );
};
export default MobileFilter;
