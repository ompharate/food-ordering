"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";
import { useCart } from "@/context/cart";

export default function FoodSearchPage({ searchParams }) {
  const [foodProducts, setFoodProducts] = useState([]);
  const { user } = useAuth();
  const { setProduct } = useCart();
  const [searchKey, setSearchKey] = useState("");
  const router = useRouter();
  if (!user) {
    router.push("/auth/login");
  }

  const fetchAllProducts = async () => {
    try {
      const res = await fetch(
        `/api/admin/product/search?key=${searchParams.key}`,
        {
          method: "GET",
        }
      );

    
      if (!res.ok) {
        throw new Error("Failed to fetch food products");
      }

      const data = await res.json();

      setFoodProducts(data);
    } catch (error) {
      console.error("Error fetching food products:", error);
    }
  };

  useEffect(() => {
    if (searchParams.key) {
      fetchAllProducts(); 
    } else {
      router.push("/menu");
    }
  }, [searchParams]);

  async function goToSearch() {
    router.push(`/search?key=${searchKey}`);
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Our Menu</h1>

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center w-full max-w-sm space-x-2">
            <Input
              type="text"
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Search for food..."
            />
            <Button onClick={goToSearch} type="submit">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {foodProducts.map((product, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <img
                  src={product.Image}
                  alt={product.FoodName}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">
                  {product.FoodName}
                </h2>
                <p>{product.Description.slice(0, 30)}...</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">
                    ₹{product.Price.toFixed(2)}
                  </span>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    {/* <span className="ml-1">{product.rating.toFixed(1)}</span> */}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setProduct(product)} className="w-full">
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
