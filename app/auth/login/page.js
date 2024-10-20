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
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("user");
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        email: formData.Email,
        password: formData.Password,
        role: activeTab === "user" ? "user" : "owner",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (res.ok) {
      const newUser = {
        ...data.user,
        role: activeTab === "user" ? "user" : "owner",
      };
      console.log(newUser)
      login(newUser);
      if (newUser.role === "owner") {
        return router.push("/admin/dashboard");
      } else {
        return router.push("/menu");
      }
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
        display: "flex",
      }}
      className="flex items-center justify-center min-h-screen "
    >
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Choose your account type to log in.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="owner">Restaurants </TabsTrigger>
            </TabsList>
            <TabsContent value="user">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="userEmail">Email</Label>
                    <Input
                      id="userEmail"
                      name="Email"
                      type="email"
                      required
                      value={formData.Email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userPassword">Password</Label>
                    <Input
                      id="userPassword"
                      name="Password"
                      type="password"
                      required
                      value={formData.Password}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4">
                  Log in
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="owner">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerEmail">Email</Label>
                    <Input
                      id="ownerEmail"
                      name="Email"
                      type="email"
                      required
                      value={formData.Email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerPassword">Password</Label>
                    <Input
                      id="ownerPassword"
                      name="Password"
                      type="password"
                      required
                      value={formData.Password}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4">
                  Log in
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href={"/auth/signup"} className="text-sm text-gray-500">
            Don't have an account? Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
