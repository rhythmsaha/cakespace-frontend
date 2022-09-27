import Spinner from "../ui/Spinner";

const LoadingScreen = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner className="h-10 animate-spin text-indigo-500" />
    </div>
  );
};
export default LoadingScreen;
