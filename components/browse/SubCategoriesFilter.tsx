import { useRouter } from "next/router";
import { SubCategory } from "../../types/categoriesTypes";

interface Props {
  subCategories: SubCategory[];
}

const SubCategoriesFilter = ({ subCategories }: Props) => {
  const router = useRouter();

  return (
    <div>
      <h4 className="font-semibold text-gray-700">Sub Category</h4>
      <ul className="mt-1 space-y-1">
        {subCategories.map((subcategory) => (
          <li key={subcategory._id}>
            <div className="flex items-center gap-1">
              <input
                type="radio"
                className="text-indigo-600 focus:ring-indigo-600"
                defaultChecked={router.query.subcategory === subcategory.slug}
                name="subcategory"
                id={subcategory._id}
                onChange={() => router.push(`/${router.query.category}/${subcategory.slug}`)}
              />
              <label className="ml-1 block text-sm text-gray-900 cursor-pointer" htmlFor={subcategory._id}>
                {subcategory.name}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SubCategoriesFilter;
