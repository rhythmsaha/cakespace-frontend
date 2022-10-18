import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import RatingsBadge from "./RatingsBadge";

type Props = {};
const Review = (props: Props) => {
  return (
    <div>
      <div className="p-4 rounded-lg shadow">
        <div className="flex gap-2">
          <span>
            <RatingsBadge />
          </span>

          <span>
            <h4 className="font-semibold text-gray-800">Excellent</h4>
          </span>
        </div>

        <div className="mt-3">
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt impedit tenetur nam repellat iste
            accusamus vitae sit, ratione ab similique optio quibusdam commodi dolorem ullam sint quam? Officia, itaque
            quam.
          </p>
        </div>

        <div className="mt-2 flex flex-col lg:flex-row lg:items-center gap-1 text-xs sm:text-sm">
          <span className="font-medium text-gray-400">John Doe </span>

          <div className="flex items-center">
            <CheckBadgeIcon className="h-4 w-4 min-w-min text-gray-400 mr-1" />
            <p className="text-gray-500">
              Certified Buyer, Ernakulam <span>8 days ago</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Review;
