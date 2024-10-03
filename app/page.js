import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Menu } from "lucide-react";

const homeFoods = [
  {
    title: "Samosa",
    image: "/food/i1.jpg",
  },
  {
    title: "Pizza",
    image: "/food/i2.avif",
  },
  {
    title: "Burger",
    image: "/food/i3.avif",
  },
];
export default function Home() {
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
            <Link
              href="/contact"
              className="text-sm font-medium hover:underline"
            >
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

      <main>
        <section
          style={{
            backgroundImage: "url('./landing.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "400px",
          }}
          className="py-20 sm:py-32"
        >
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
              Delicious Food, Delivered to Your Door
            </h1>
            <p className="mt-4 max-w-[700px] text-muted-foreground sm:text-xl text-black font-bold">
              Enjoy your favorite meals from the best local restaurants,
              delivered fast and fresh.
            </p>
            <div className="mt-8 flex w-full max-w-sm items-center space-x-2">
              <Input
                className="text-white"
                type="text"
                placeholder="Enter your address"
              />
              <Button type="submit">
                <Search className="mr-2 h-4 w-4" /> Find Food
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-32 bg-muted/50 max-w-7xl mx-auto">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
              Featured Foods
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {homeFoods.map(
                (restaurant) => (
                  <div
                    key={restaurant.title}
                    className="rounded-lg overflow-hidden shadow-lg bg-card"
                  >
                    <div className="h-48 bg-muted">
                      <img
                        src={restaurant.image}
                        alt="home"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-xl mb-2">
                        {restaurant.title}
                      </h3>
                      <p className="text-muted-foreground">
                        Delicious meals await you!
                      </p>
                      <Button className="mt-4" variant="outline">
                        View Menu
                      </Button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                @FoodieExpress
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
