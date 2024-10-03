"use client";

import { useState } from "react";
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

// Mock data for orders
const orders = [
  { id: 1, customer: "John Doe", items: 3, total: 42.99, status: "Delivered" },
  {
    id: 2,
    customer: "Jane Smith",
    items: 2,
    total: 25.98,
    status: "Processing",
  },
  { id: 3, customer: "Bob Johnson", items: 1, total: 15.99, status: "Pending" },
  {
    id: 4,
    customer: "Alice Brown",
    items: 4,
    total: 56.96,
    status: "Delivered",
  },
  {
    id: 5,
    customer: "Charlie Davis",
    items: 2,
    total: 31.98,
    status: "Processing",
  },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  if (user?.role !== "owner") {
    return router.push("/menu");
  }

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

        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">254</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,345</div>
              <p className="text-xs text-muted-foreground">
                +18% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">
                -8% from last hour
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Customer Satisfaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98%</div>
              <p className="text-xs text-muted-foreground">
                +2% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <Card>
          <ScrollArea className="h-[400px]">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Items</th>
                  <th className="p-4 font-medium">Total</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="p-4">{order.id}</td>
                    <td className="p-4">{order.customer}</td>
                    <td className="p-4">{order.items}</td>
                    <td className="p-4">${order.total.toFixed(2)}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          order.status === "Delivered"
                            ? "bg-green-200 text-green-800"
                            : order.status === "Processing"
                            ? "bg-blue-200 text-blue-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </Card>
      </main>
    </div>
  );
}
