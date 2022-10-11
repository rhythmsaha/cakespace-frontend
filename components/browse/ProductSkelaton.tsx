const ProductSkelaton = () => {
  return (
    <div className="p-4">
      <div className="w-full aspect-square rounded-lg bg-gray-300 animate-pulse" />

      <div className="mt-2 space-y-1">
        <div className="h-5 bg-gray-300 rounded animate-pulse" />
        <div className="h-4 bg-gray-300 rounded animate-pulse" />
        <div className="py-4">
          <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
export default ProductSkelaton;
