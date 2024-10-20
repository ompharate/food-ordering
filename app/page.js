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
      <main>
        <section
          style={{
            backgroundImage: "url('landing.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100%",
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
            <div className="mt-8 justify-center flex w-full max-w-sm items-center space-x-2">
              {/* <Input
                className="text-white"
                type="text"
                placeholder="Enter your address"
              /> */}
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
              {homeFoods.map((restaurant) => (
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
                      <Link href={"/menu"}>View Menu</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
