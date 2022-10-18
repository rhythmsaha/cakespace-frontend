import { StarIcon } from "@heroicons/react/20/solid";

const OverallRatings = () => {
  return (
    <div>
      <div>
        <h3 className="text-xl font-bold text-gray-700">Customer Reviews</h3>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((el, i) => (
              <StarIcon className={`h-6 w-6 ${i < 4 ? "text-yellow-300" : "text-gray-200"}`} key={i} />
            ))}
          </div>
          <p>Based on 222 Reviews</p>
        </div>

        <div className="mt-5 space-y-2">
          <RatingProgress star={5} percent={63} />
          <RatingProgress star={4} percent={10} />
          <RatingProgress star={3} percent={6} />
          <RatingProgress star={2} percent={12} />
          <RatingProgress star={1} percent={9} />
        </div>
      </div>
    </div>
  );
};
export default OverallRatings;

interface ProgressProps {
  star: number;
  percent: number;
}
const RatingProgress: React.FC<ProgressProps> = ({ percent, star }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <span className="text-gray-600">{star}</span>
        <StarIcon className="h-6 w-6 text-yellow-300 mb-0.5" />
      </div>

      <div className="w-full h-3 relative bg-gray-100 rounded-full overflow-hidden">
        <div
          style={{ width: percent + "%" }}
          className={`h-full bg-yellow-300 absolute left-0 inset-y-0 rounded-full`}
        />
      </div>

      <span className="text-gray-600">{percent}%</span>
    </div>
  );
};
