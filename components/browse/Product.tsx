import Image from "next/future/image";
import numeral from "numeral";

interface Props {
  image: string;
  name: string;
  price: number;
  stock: number;
  description: string;
}

const Product = ({ name, image, price, stock, description }: Props) => {
  return (
    <div className="cursor-pointer hover:shadow transition-shadow duration-200 rounded-xl p-4">
      <Image src={image} alt={name} height={500} width={500} className="w-full object-cover aspect-square rounded-lg" />

      <div className="mt-1">
        <h3 className="text-base font-medium">{name}</h3>
        <p className="text-indigo-600 font-medium">₹{numeral(price).format("0,0.00")}</p>

        <div className="flex items-center gap-1 text-xs py-4">
          <p className="text-gray-500">Free Delivery</p>
          {stock !== 0 && <span className="text-emerald-500 font-medium">In Stock</span>}
        </div>
      </div>
    </div>
  );
};
export default Product;
