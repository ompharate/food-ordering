"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isRestaurant, setIsRestaurant] = useState(false);
  
 
  const [userFormData, setUserFormData] = useState({
    userEmail: "",
    userPassword: "",
    userAddress: "",
    userPhone: "",
    userName: "",
  });

  
  const [restaurantFormData, setRestaurantFormData] = useState({
    restaurantEmail:"",
    restaurantPassword:"",
    restaurantName: "",
    restaurantLocation: "",
    restaurantPhone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (isRestaurant) {
      setRestaurantFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setUserFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = isRestaurant ? "/api/restaurant/register" : "/api/user/create";
    const body = isRestaurant
      ? {
          email:restaurantFormData.restaurantEmail,
          password:restaurantFormData.restaurantPassword,
          name: restaurantFormData.restaurantName,
          location: restaurantFormData.restaurantLocation,
          phone: restaurantFormData.restaurantPhone,
        }
      : {
          email: userFormData.userEmail,
          password: userFormData.userPassword,
          address: userFormData.userAddress,
          phone: userFormData.userPhone,
          name: userFormData.userName,
        };

    const res = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/auth/login");
    } else {
      toast({
        title: data.error,
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('../auth.avif')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Choose your account type to log in.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={isRestaurant ? "restaurant" : "user"}>
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="user" onClick={() => setIsRestaurant(false)}>
                User
              </TabsTrigger>
              <TabsTrigger value="restaurant" onClick={() => setIsRestaurant(true)}>
                Restaurant
              </TabsTrigger>
            </TabsList>
            <TabsContent value="user">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="userEmail">Email</Label>
                    <Input
                      id="userEmail"
                      name="userEmail"
                      type="email"
                      required
                      value={userFormData.userEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userPassword">Password</Label>
                    <Input
                      id="userPassword"
                      name="userPassword"
                      type="password"
                      required
                      value={userFormData.userPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userName">Name</Label>
                    <Input
                      id="userName"
                      name="userName"
                      type="text"
                      required
                      value={userFormData.userName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userPhone">Phone</Label>
                    <Input
                      id="userPhone"
                      name="userPhone"
                      type="text"
                      required
                      value={userFormData.userPhone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userAddress">Address</Label>
                    <Textarea
                      id="userAddress"
                      name="userAddress"
                      required
                      value={userFormData.userAddress}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4">
                  Sign Up
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="restaurant">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurantEmail">Restaurant Email</Label>
                    <Input
                      id="restaurantEmail"
                      name="restaurantEmail"
                      type="text"
                      required
                      value={restaurantFormData.restaurantEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restaurantPassword">Password</Label>
                    <Input
                      id="restaurantPassword"
                      name="restaurantPassword"
                      type="text"
                      required
                      value={restaurantFormData.restaurantPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restaurantName">Restaurant Name</Label>
                    <Input
                      id="restaurantName"
                      name="restaurantName"
                      type="text"
                      required
                      value={restaurantFormData.restaurantName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restaurantLocation">Location</Label>
                    <Input
                      id="restaurantLocation"
                      name="restaurantLocation"
                      type="text"
                      required
                      value={restaurantFormData.restaurantLocation}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restaurantPhone">Phone</Label>
                    <Input
                      id="restaurantPhone"
                      name="restaurantPhone"
                      type="text"
                      required
                      value={restaurantFormData.restaurantPhone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4">
                  Register Restaurant
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href={"/auth/login"} className="text-sm text-gray-500">
            Already have an account? Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
