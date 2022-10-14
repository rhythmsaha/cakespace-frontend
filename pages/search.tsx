import React, { useState } from "react";
import { NextPageWithLayout } from "./_app";
import { Flavour } from "../types/categoriesTypes";
import { sortlist, SortObj } from "../utils/config";
import DefaultLayout from "../components/layouts/DefaultLayout";
import SimpleBar from "simplebar-react";
import FilterBar from "../components/browse/FilterBar";
import MobileFilter from "../components/browse/MobileFilter";
import SortBy from "../components/browse/SortBy";
import ProductsList from "../components/browse/ProductsList";
import { axios } from "../utils";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

interface Props {
  flavours: Flavour[];
}

const SearchPage: NextPageWithLayout<Props> = ({ flavours }) => {
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [selectedFlavours, setSelectedFlavours] = useState<string[]>([]);
  const [sortby, setSortby] = useState<SortObj>(sortlist[0]);

  const router = useRouter();

  const handlePriceChange = (value: number) => {
    setSelectedPrice(value);
  };

  const handleFlavourChange = (_flavours: string[]) => setSelectedFlavours(_flavours);

  return (
    <div className="flex browse-main-height overflow-hidden relative lg:pl-10">
      <aside className="hidden lg:block border-r w-48">
        <SimpleBar style={{ maxHeight: "100%", scrollBehavior: "smooth" }} className="px-2">
          <h4 className="text-lg text-gray-600 font-semibold py-1 mt-8">Filter</h4>

          <div className="py-4">
            <FilterBar
              flavours={flavours}
              onPriceChange={handlePriceChange}
              onFlavourChange={handleFlavourChange}
              selectedFlavours={selectedFlavours}
            />
          </div>
        </SimpleBar>
      </aside>

      <div className="flex-1 my-10 overflow-y-auto lg:pl-10 lg:pr-14">
        <div className="flex justify-between lg:justify-end items-center gap-4 py-4 w-full">
          <MobileFilter
            flavours={flavours}
            onPriceChange={handlePriceChange}
            onFlavourChange={handleFlavourChange}
            selectedFlavours={selectedFlavours}
          />

          <SortBy selected={sortby} onSelect={setSortby} sortlist={sortlist} />
        </div>
        <hr className="lg:mx-10" />

        <div>
          {router.query.search && (
            <ProductsList
              flavours={selectedFlavours}
              price={selectedPrice}
              sortby={sortby.sortby}
              searchQuery={router.query.search}
            />
          )}
        </div>
      </div>
    </div>
  );
};

SearchPage.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const flavours = await axios.get("/flavours");

  return {
    props: {
      flavours: flavours.data,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default SearchPage;
