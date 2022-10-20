import { Dialog, Transition } from "@headlessui/react";
import { ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/future/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useAppSelector } from "../../../../hooks";
import useCart from "../../../../hooks/useCart";
import AuthRequired from "./AuthRequired";
import CartFooter from "./CartFooter";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const [open, setOpen] = useState(false);

  const { isAuthenticated, isInitialized } = useAppSelector((state) => state.auth);
  const { items, totalAmount, totalQuantity } = useAppSelector((state) => state.cart);

  const { cartLoading, addToCart, clearCart, fetchCart, removeFromCart, deleteItemFromCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const cartButtonClickHandler = () => {
    setOpen(true);
  };

  return (
    <>
      <button className="relative aspect-square w-10" onClick={cartButtonClickHandler}>
        {totalQuantity > 0 && (
          <span className="absolute right-0 -top-1 flex items-center justify-center h-4 w-4 rounded-full bg-red-600 text-white font-mono text-xs leading-none">
            {totalQuantity}
          </span>
        )}

        <div className="flex flex-col items-center justify-center">
          <ShoppingBagIcon className="h-6" />
          <p className="text-xs font-semibold text-gray-600">Bag</p>
        </div>
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen lg:max-w-md">
                    <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        {!isAuthenticated && <AuthRequired />}

                        {isAuthenticated && (
                          <div className="mt-8">
                            <div className="flow-root">
                              {items.length === 0 ? (
                                <EmptyCart />
                              ) : (
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                  {items?.map((item) => (
                                    <CartItem key={item.product._id} {...item} />
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {isAuthenticated && items.length > 0 && <CartFooter onClose={() => setOpen(false)} />}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
export default Cart;
