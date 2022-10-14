import Image from "next/future/image";
import { useState } from "react";
import { Category } from "../../types/categoriesTypes";
import { NextLink } from "../ui";

interface Props {
  category: Category;
}

const CategoryLink = ({ category }: Props) => {
  const { name, icon, slug } = category;

  return (
    <div className="relative rounded-2xl overflow-hidden w-full ">
      <NextLink href={`/${slug}`}>
        <Image
          src={icon}
          alt={name}
          height={250}
          width={250}
          className="aspect-square rounded-2xl w-full hover:scale-125 transition duration-300 ease-out"
        />

        <div className="absolute inset-x-0 bottom-0  bg-black bg-opacity-60 flex items-center justify-center">
          <h4 className="text-white font-semibold text-sm sm:text-base text-center p-4">{name}</h4>
        </div>
      </NextLink>
    </div>
  );
};

export default CategoryLink;
