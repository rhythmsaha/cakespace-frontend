import { useRouter } from "next/router";
import { Category } from "../../types/categoriesTypes";

interface Props {
  categories: Category[];
}

const CategoriesFilter = ({ categories }: Props) => {
  const router = useRouter();

  return (
    <div>
      <h4 className="font-semibold text-gray-700">Category</h4>
      <ul className="mt-1 space-y-1">
        {categories.map((category) => (
          <li key={category._id}>
            <div className="flex items-center gap-1">
              <input
                type="radio"
                className="text-indigo-600 focus:ring-indigo-600"
                defaultChecked={router.query.category === category.slug}
                name="category"
                id={category._id}
                onChange={() => router.push(`/${category.slug}`)}
              />
              <label className="ml-1 block text-sm text-gray-900 cursor-pointer" htmlFor={category._id}>
                {category.name}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CategoriesFilter;
