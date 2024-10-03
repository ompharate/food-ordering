import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user]);

  return (
    <header className="px-10 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">FoodieExpress</span>
        </Link>
        <nav className="ml-auto flex items-center space-x-4 sm:space-x-6">
          {user?.role !== "owner" ? (
            <Link href="/menu" className="text-sm font-medium hover:underline">
              Menu
            </Link>
          ) : null}
          {user ? (
            <Button
              onClick={logout}
              className="text-sm font-medium hover:underline"
            >
              Logout
            </Button>
          ) : (
            <Link
              href="/auth/login"
              className="text-sm font-medium hover:underline"
            >
              Login
            </Link>
          )}

          <Button size="icon" variant="ghost">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Shopping Cart</span>
          </Button>
          {user?.role !== "owner" ? (
            <Button size="icon" variant="ghost" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          ) : null}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
