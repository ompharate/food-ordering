"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {  Star, Search } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth"
import { useEffect, useState } from "react"
import { useCart } from "@/context/cart"

const foodProducts = [
  { id: 1, name: "Margherita Pizza", price: 12.99, rating: 4.5, image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Chicken Burger", price: 8.99, rating: 4.2, image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Caesar Salad", price: 7.99, rating: 4.0, image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "Spaghetti Carbonara", price: 11.99, rating: 4.7, image: "/placeholder.svg?height=200&width=200" },
  { id: 5, name: "Sushi Roll", price: 14.99, rating: 4.8, image: "/placeholder.svg?height=200&width=200" },
  { id: 6, name: "Vegetable Stir Fry", price: 9.99, rating: 4.1, image: "/placeholder.svg?height=200&width=200" },
  { id: 7, name: "Beef Tacos", price: 10.99, rating: 4.3, image: "/placeholder.svg?height=200&width=200" },
  { id: 8, name: "Greek Gyros", price: 8.99, rating: 4.4, image: "/placeholder.svg?height=200&width=200" },
]

export default function FoodProductsPage() {
  const [foodProducts, setFoodProducts] = useState([])
  const { user } = useAuth();
  const {setProduct} = useCart();
  const router = useRouter();
  if(!user) {
    router.push("/auth/login")
  }


  const fetchAllProducts = async () => {
    const res = await fetch("/api/admin/product/all", {
      method: "GET",
    });

    const data = await res.json();
    setFoodProducts(data.foodItems);
  };
  useEffect(() => {
    fetchAllProducts();
   
  }, []);


  return (
    <div className="min-h-screen bg-background">
    

      <main className="container py-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Our Menu</h1>
        
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center w-full max-w-sm space-x-2">
            <Input type="text" placeholder="Search for food..." />
            <Button type="submit">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {foodProducts.map((product,index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <img
                  src={product.Image}
                  alt={product.FoodName}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{product.FoodName}</h2>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">₹{product.Price.toFixed(2)}</span>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    {/* <span className="ml-1">{product.rating.toFixed(1)}</span> */}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={()=>setProduct(product)}  className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

   
    </div>
  )
}