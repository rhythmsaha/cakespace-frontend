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
import StickyBox from "react-sticky-box";

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
    <div className="flex gap-6">
      <div className="border-r hidden lg:block">
        <StickyBox offsetTop={80} offsetBottom={20}>
          <div className="browse-main-height">
            <FilterBar
              flavours={flavours}
              onPriceChange={handlePriceChange}
              onFlavourChange={handleFlavourChange}
              selectedFlavours={selectedFlavours}
            />
          </div>
        </StickyBox>
      </div>

      <div className="flex-1 mb-20 mt-10">
        <div className="mx-auto w-11/12">
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

          <ProductsList
            flavours={selectedFlavours}
            price={selectedPrice}
            sortby={sortby.sortby}
            searchQuery={router.query.search}
          />
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
