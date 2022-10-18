import { StarIcon } from "@heroicons/react/20/solid";

const RatingsBadge = () => {
  return (
    <span className="flex gap-1 items-center bg-green-600 rounded-md text-white px-2 py-1 justify-center">
      <span className="text-xs sm:text-sm font-medium">4.8</span>
      <span>
        <StarIcon className="h-3.5 w-3.5" />
      </span>
    </span>
  );
};
export default RatingsBadge;
