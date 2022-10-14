import { Category } from "../../types/categoriesTypes";
import CategoryLink from "./CategoryLink";

interface Props {
  categories: Category[];
}
const Categories = ({ categories }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 place-items-center">
      {categories.map((category) => (
        <CategoryLink category={category} key={category._id} />
      ))}
    </div>
  );
};
export default Categories;
