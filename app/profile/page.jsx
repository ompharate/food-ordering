"use client"
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);


   console.log(user)

  async function fetchOrders() {
    setIsLoading(true);
    const response = await fetch(`/api/user/order/${user.CustomerID}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setOrders(data.orders);
    setIsLoading(false);
  }

  const router = useRouter();

  if (!user) return router.push("/auth/login");

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="w-full flex justify-center my-5">
        <div className="w-full max-w-xl bg-white border border-gray-200 p-5 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRviRD5-NJ781r1WEytfypBvsra_GUYdli2oA&s"}
              alt="Profile"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {user.Name}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user.Email}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center my-5">
        <div className="w-full max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Latest Orders
            </h5>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {!isLoading &&
                orders.map((order) => (
                  <li key={order.OrderID} className="py-3 sm:py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        {order.OrderItems.map((item, index) => (
                          <div key={item.FoodItemID} className="flex items-center">
                            <img
                              className="w-8 h-8 rounded-full"
                              src= {item.FoodItem.Image}
                              alt={item.FoodItem.FoodName}
                            />
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white ms-2">
                            {item.FoodItem.FoodName}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        ₹{order.TotalAmount}
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
