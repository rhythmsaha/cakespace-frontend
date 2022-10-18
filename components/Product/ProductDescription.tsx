import type { Product } from "../../types/product";
import numeral from "numeral";
import { BoltIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import RatingsBadge from "./RatingsBadge";
import useCart from "../../hooks/useCart";
import { useAppSelector } from "../../hooks";
import { useRouter } from "next/router";

interface Props {
  product: Product;
}

const ProductDescription: React.FC<Props> = ({ product }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const cartItems = useAppSelector((state) => state.cart.items);
  const { addToCart, deleteItemFromCart } = useCart();

  const router = useRouter();
  const addedToCart = cartItems?.find((item) => item.product._id === product._id);

  const _addToCartHandler = () => {
    if (!isAuthenticated) return router.push("/login");

    if (addedToCart) {
      deleteItemFromCart(product._id);
    } else {
      addToCart(product._id);
    }
  };

  const buyNowHandler = () => {
    _addToCartHandler();
    router.push("/checkout");
  };

  return (
    <div className="lg:px-6">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">{product.name}</h1>
      </div>

      <div className="flex items-center gap-2 my-2">
        <RatingsBadge />
        <p className="text-sm text-gray-500">Ratings & 222 Reviews</p>
      </div>

      <div className="px-1 flex items-end gap-2">
        <div className="flex items-center gap-2">
          <span className="text-4xl font-medium text-gray-800">₹</span>
          <span className="text-5xl font-semibold text-gray-800">{numeral(product.price).format("0,0.00")}</span>
        </div>

        <p className="text-sm text-gray-600">Inclusive of all taxes.</p>
      </div>

      {product.weight && (
        <div className="mt-6">
          <span className="shadow-md px-4 py-2 text-sm border font-medium text-gray-500 rounded-md">
            {product.weight}g
          </span>
        </div>
      )}

      <div className="mt-10">
        <div className="mb-2">
          {product.stocks === 0 ? (
            <p className=" p-1 text-xs text-red-500 font-medium">Out of stock!</p>
          ) : product.stocks < 10 ? (
            <p className=" p-1 text-xs text-red-500 font-medium">Hurry, only {product.stocks} items left in stock!</p>
          ) : null}
        </div>

        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-2">
          <button
            className="w-full py-3 px-6 disabled:bg-gray-300 disabled:text-gray-500 font-medium bg-indigo-600 text-white rounded-md flex items-center justify-center gap-4"
            disabled={product.stocks === 0}
            onClick={_addToCartHandler}
          >
            {addedToCart ? <span>Added to Cart</span> : <span>Add to Cart</span>}

            <ShoppingBagIcon className="h-5 w-5" />
          </button>

          <button
            className="w-full py-3 px-6 bg-pink-500 text-white rounded-md flex items-center justify-center gap-4 disabled:bg-gray-300 disabled:text-gray-500 font-medium"
            disabled={product.stocks === 0}
            onClick={buyNowHandler}
          >
            <span>Buy Now</span>
            <BoltIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <section className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700">Description</h3>
        <article
          className="prose  prose-ul:space-y-0 prose-ul:m-0 prose-li:m-0 prose-p:m-0 prose-p:text-sm prose-li:text-sm"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </section>

      <div className="mt-6">
        <div>
          <h2 className="text-base font-semibold text-gray-700">Please Note:</h2>
          <ul className="list-disc px-5 space-y-1 text-sm mt-2 text-gray-700">
            <li>
              The cake stand, cutlery & accessories used in the image are only for representation purposes. They are not
              delivered with the cake.
            </li>
            <li>This cake is hand delivered in a good quality cardboard box.</li>
            <li>Country of Origin: India</li>
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <div>
          <h2 className="text-base font-semibold text-gray-700">Delivery Information</h2>
          <ul className="list-disc px-5 space-y-1 text-sm mt-2 text-gray-700">
            <li>
              Every cake we offer is handcrafted and since each chef has his/her own way of baking and designing a cake,
              there might be slight variation in the product in terms of design and shape.
            </li>

            <li>
              The chosen delivery time is an estimate and depends on the availability of the product and the destination
              to which you want the product to be delivered.
            </li>

            <li>
              Since cakes are perishable in nature, we attempt delivery of your order only once. The delivery cannot be
              redirected to any other address.
            </li>

            <li>This product is hand delivered and will not be delivered along with courier products.</li>

            <li>
              Occasionally, substitutions of flavours/designs is necessary due to temporary and/or regional
              unavailability issues.
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <div>
          <h2 className="text-base font-semibold text-gray-700">Care Instructions</h2>
          <ul className="list-disc px-5 space-y-1 text-sm mt-2 text-gray-700">
            <li>
              Store cream cakes in a refrigerator. Fondant cakes should be stored in an air conditioned environment.
            </li>

            <li>Slice and serve the cake at room temperature and make sure it is not exposed to heat</li>

            <li>Use a serrated knife to cut a fondant cake.</li>

            <li>
              Sculptural elements and figurines may contain wire supports or toothpicks or wooden skewers for support.
            </li>

            <li>Please check the placement of these items before serving to small children.</li>
            <li>The cake should be consumed within 24 hours.</li>
            <li>Enjoy your cake!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ProductDescription;
