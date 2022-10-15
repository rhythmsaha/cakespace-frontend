import Image from "next/future/image";
import numeral from "numeral";
import { NextLink } from "../ui";

interface Props {
  images: string[];
  name: string;
  price: number;
  stock: number;
  description: string;
  slug: string;
}

const Product = ({ name, images, price, stock, slug }: Props) => {
  return (
    <NextLink href={`/product/${slug}`} className="w-full h-full ">
      <div className="cursor-pointer border border-gray-100 hover:shadow-md transition-shadow duration-200 rounded-xl p-4 w-full h-full">
        <div className="w-full object-cover aspect-square rounded-lg overflow-hidden">
          <Image
            src={images[0]}
            alt={name}
            height={500}
            width={500}
            className="w-full object-cover aspect-square rounded-lg overflow-hidden hover:scale-150 transition-transform ease-in-out duration-700"
          />
        </div>

        <div className="mt-1">
          <h3 className="text-base font-medium">{name}</h3>
          <p className="text-indigo-600 font-medium">₹{numeral(price).format("0,0.00")}</p>

          <div className="flex items-center gap-1 text-xs py-4">
            <p className="text-gray-500">Free Delivery</p>
            {stock !== 0 && <span className="text-emerald-500 font-medium">In Stock</span>}
          </div>
        </div>
      </div>
    </NextLink>
  );
};
export default Product;
