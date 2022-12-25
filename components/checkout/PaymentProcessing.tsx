import { ThreeCircles } from "react-loader-spinner";

const PaymentProcessing = () => {
  return (
    <div className="flex flex-col items-center">
      <span className="w-16 sm:w-20 lg:w-24">
        <ThreeCircles
          height="100%"
          width="100%"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="loading"
          outerCircleColor="#4f46e5"
          innerCircleColor="#ec4899"
          middleCircleColor="#4f46e5"
        />
      </span>
      <p className="text-xl sm:text-2xl lg:text-4xl font-semibold text-gray-800 mt-4 lg:mt-6 text-center">
        Please wait...
      </p>
      <p className="text-xl sm:text-2xl lg:text-4xl font-semibold text-gray-800 lg:mt-2 text-center">
        we are fetching your payment info
      </p>
    </div>
  );
};
export default PaymentProcessing;
