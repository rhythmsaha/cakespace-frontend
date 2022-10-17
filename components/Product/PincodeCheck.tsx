import { useEffect, useRef, useState } from "react";

enum Availability {
  available,
  unavailable,
  uninitialized,
}

const PincodeCheck = () => {
  const [available, setAvailable] = useState<Availability>(Availability.uninitialized);

  const pincodeRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const checkPincodeHandler = () => {
    if (+pincodeRef.current.value >= 70000) {
      setAvailable(Availability.available);
    } else {
      setAvailable(Availability.unavailable);
    }
  };

  return (
    <div>
      <h4 className="text-gray-600 font-medium">Check avaibility</h4>
      <div className="mt-1 flex flex-col sm:flex-row max-w-xs overflow-hidden gap-2 ">
        <input
          ref={pincodeRef}
          type="text"
          className="flex-1 outline-none focus:ring-none border-1 border-gray-300 focus:ring-0 rounded"
        />
        <button className="bg-pink-500 text-white px-6 py-2 rounded" onClick={checkPincodeHandler}>
          Check
        </button>
      </div>

      {available === Availability.available && (
        <p className="px-1 mt-1 text-xs text-green-500 font-medium">Delivery available!</p>
      )}

      {available === Availability.unavailable && (
        <p className="px-1 mt-1 text-xs text-red-500 font-medium">Delivery not available in this pincode</p>
      )}
    </div>
  );
};
export default PincodeCheck;
