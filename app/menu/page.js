import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart, Menu, Star, Search } from 'lucide-react'

// Mock data for food products
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
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">FoodieExpress</span>
          </Link>
          <nav className="ml-auto flex items-center space-x-4 sm:space-x-6">
            <Link href="/menu" className="text-sm font-medium hover:underline">
              Menu
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline">
              Contact
            </Link>
            <Button size="icon" variant="ghost">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Button>
            <Button size="icon" variant="ghost" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </nav>
        </div>
      </header>

      <main className="container py-8">
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
          {foodProducts.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1">{product.rating.toFixed(1)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <footer className="border-t py-6 mt-12">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2023 FoodieExpress. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}