"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useCart } from "@/context/cart";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

function CartEmpty() {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh] gap-5">
      <h1 className="text-3xl font-bold">Your cart is empty</h1>
      <Link href="/menu" className="text-blue-700">
        Go back and shop
      </Link>
    </div>
  );
}

const Cart = () => {
  const { toast } = useToast();
  const { cart, clearCart, removeProduct, updateProductQuantity } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return router.push("/auth/login");
  }

  const originalPrice = cart.reduce(
    (accumulator, product) => accumulator + product.Price * product.quantity,
    0
  );

  const taxPrice = parseInt((originalPrice * 5) / 100);
  const totalBeforeSavings = originalPrice + taxPrice;
  const savingPrice = parseInt((totalBeforeSavings * 20) / 100);
  const totalPrice = parseInt(totalBeforeSavings - savingPrice);
  const ids = cart.map((product) => ({
    FoodItemID: product.FoodItemID,
    quantity: product.quantity,
    RestaurantID:product.RestaurantID
  }));
  if (cart.length <= 0) {
    return <CartEmpty />;
  }

  const onBuy = async () => {
    try {
      const res = await fetch("/api/user/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids, totalPrice,totalPrice:originalPrice, customerId: user.CustomerID }),
      });
      if (res.ok) {
        toast({
          title: "Order Successfully Added",
          description: Date.now(),
        });
        clearCart();
      } else {
        throw new Error("Failed to process the order");
      }
    } catch (error) {
      toast({
        title: "Order Failed",
        description: error.message,
      });
    }
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cart.map((product, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                >
                  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <Link href="#" className="shrink-0 md:order-1">
                      <img
                        className="h-20 w-20 dark:hidden"
                        src={product.Image}
                        alt="product image"
                      />
                      <img
                        className="hidden h-20 w-20 dark:block"
                        src={product.Image}
                        alt="product image"
                      />
                    </Link>

                    <label
                      htmlFor={`quantity-${product.FoodItemID}`}
                      className="sr-only"
                    >
                      Choose quantity:
                    </label>
                    <input
                      id={`quantity-${product.FoodItemID}`}
                      type="number"
                      min="1"
                      value={product.quantity}
                      onChange={(e) =>
                        updateProductQuantity(
                          product.FoodItemID,
                          parseInt(e.target.value)
                        )
                      }
                      className="w-16 p-1 border border-gray-300 rounded"
                    />

                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                      <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900 dark:text-white">
                          ₹{product.Price * product.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                      <Link
                        href="#"
                        className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                      >
                        {product.FoodName}
                      </Link>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => removeProduct(product.FoodItemID)}
                          type="button"
                          className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                        >
                          <svg
                            className="me-1.5 h-5 w-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18 17.94 6M18 18 6.06 6"
                            />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Order summary
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Original price
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      ₹{originalPrice}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Savings
                    </dt>
                    <dd className="text-base font-medium text-green-600">
                      -₹{savingPrice} (20%)
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Tax
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      ₹{taxPrice} (5%)
                    </dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    ₹{totalPrice}
                  </dd>
                </dl>
              </div>

              <Button onClick={onBuy} className="w-full" href="#">
                Cash on Delivery
              </Button>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {" "}
                  or{" "}
                </span>
                <Link
                  href="/menu"
                  title=""
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                >
                  Continue Shopping
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
