"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ClipboardList,
  PlusCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { AllProducts } from "@/components/table/AllProducts";

export default function AddNewFood() {
  const [Products, setAllProducts] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const fetchAllProducts = async () => {
    const res = await fetch("/api/admin/product/all", {
      method: "GET",
    });

    const data = await res.json();

    setAllProducts(data.foodItems);
  };
  useEffect(() => {
    fetchAllProducts();
    setRefetch(false);
  }, [refetch]);

  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/admin/product/create", {
      method: "POST",
      body: JSON.stringify({
        formData,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (res.ok) {
      toast({
        title: "Product Added Successfully",
      });
    } else {
      toast({
        title: data.error,
      });
    }

    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: null,
    });
    setRefetch(true);
  };

  async function deleteById(id) {
    try {
      await fetch(`/api/admin/product/delete/${id}`, {
        method: "DELETE",
      });
      toast({
        title: "Product deleted successfully!",
      });
      setRefetch(true);
    } catch (error) {
      toast({
        title: "Error deleting product",
      });
    }
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
        <h1 className="text-3xl font-bold mb-6">Add New Food Item</h1>

        <Card>
          <CardHeader>
            <CardTitle>Food Item Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  name="category"
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange({ target: { name: "category", value } })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="appetizer">Appetizer</SelectItem>
                    <SelectItem value="main_course">Main Course</SelectItem>
                    <SelectItem value="dessert">Dessert</SelectItem>
                    <SelectItem value="beverage">Beverage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Add Food Item
              </Button>
            </form>
          </CardContent>
        </Card>
        <AllProducts Products={Products} deleteById={deleteById} />
      </main>
    </div>
  );
}
