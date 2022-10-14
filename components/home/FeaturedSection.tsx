import { Product } from "../../types/product";
import FeaturedList from "./FeaturedList";

interface Props {
  featured: {
    title: string;
    products: Product[];
  }[];
}
const FeaturedSection = ({ featured }: Props) => {
  return (
    <section className="space-y-10">
      {featured.map((list, index) => (
        <FeaturedList key={index} title={list.title} products={list.products} />
      ))}
    </section>
  );
};
export default FeaturedSection;
