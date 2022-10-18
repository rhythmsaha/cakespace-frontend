import ReactStickyBox from "react-sticky-box";
import OverallRatings from "./OverallRatings";

const Reviews = () => {
  return (
    <div className="grid gap-6">
      <div className="">
        <ReactStickyBox offsetTop={90}>
          <OverallRatings />
        </ReactStickyBox>
      </div>
    </div>
  );
};
export default Reviews;
