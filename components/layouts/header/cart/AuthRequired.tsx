import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const AuthRequired = () => {
  const router = useRouter();

  return (
    <div className="w-full h-full flex text-gray-500 flex-col justify-center items-center">
      <ShoppingBagIcon className="h-20" />
      <p className="mt-1 text-gray-700">You need to login to access cart</p>
      <button onClick={() => router.push("/login")} className="mt-4 bg-indigo-600 text-white px-5 py-1 rounded">
        Login
      </button>
    </div>
  );
};
export default AuthRequired;
