"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  ClipboardList,
  PlusCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";



export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [totalSales, setTotalSales] = useState(0);
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    setIsLoading(true);
    const response = await fetch(`/api/admin/product/allOrders?id=${user?.RestaurantID}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setOrders(data.orders);
    setTotalSales(data.totalSales);
    setIsLoading(false);
  }

  const router = useRouter();

  if (!user) return router.push("/auth/login");

 

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orders);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`bg-white ${
          sidebarOpen ? "w-64" : "w-16"
        } flex flex-col transition-all duration-300 ease-in-out`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2
            className={`font-bold text-xl ${sidebarOpen ? "block" : "hidden"}`}
          >
            Admin Panel
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
        <Separator />
        <nav className="flex-1">
          <Button variant="ghost" className="w-full justify-start p-4">
            <ClipboardList className="mr-2 h-4 w-4" />
            {sidebarOpen && <Link href={"/admin/dashboard"}>All Orders</Link>}
          </Button>
          <Button variant="ghost" className="w-full justify-start p-4">
            <PlusCircle className="mr-2 h-4 w-4" />
            {sidebarOpen && (
              <Link href={"/admin/dashboard/new"}>Add New Food</Link>
            )}
          </Button>
        </nav>
        <Separator />
        <Button variant="ghost" className="w-full justify-start p-4 mb-4">
          <LogOut className="mr-2 h-4 w-4" />
          {sidebarOpen && <span>Logout</span>}
        </Button>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalSales}
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <Card>
          <ScrollArea className="h-[400px]">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="p-4 font-medium"></th>
                  <th className="p-4 font-medium">Customer Name</th>
                  <th className="p-4 font-medium">Items</th>
                  <th className="p-4 font-medium">Quantity</th>
                  <th className="p-4 font-medium">Total</th>
                  <th className="p-4 font-medium">Address</th>
                  <th className="p-4 font-medium">Phone</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) =>
                  order.OrderItems.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-4">#</td>
                      <td className="p-4">{order.Customer?.Name}</td>{" "}
                      <td className="p-4">{item.FoodItem?.FoodName}</td>
                      {/* Assuming 'items' was meant to be the quantity */}
                      <td className="p-4">{item?.Quantity}</td>
                      <td className="p-4">₹{(item.FoodItem?.Price*item?.Quantity)}</td>
                      <td className="p-4">
                        <span>{order.Customer?.Address}</span>
                      </td>
                      <td className="p-4">
                        <span>{order.Customer?.Phone}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </ScrollArea>
        </Card>
      </main>
    </div>
  );
}
