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
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
    userAddress: "",
    userPhone: "",
    userName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/user/create", {
      method: "POST",
      body: JSON.stringify({
        email: formData.userEmail,
        password: formData.userPassword,
        address: formData.userAddress,
        phone: formData.userPhone,
        name: formData.userName,
      }),
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
    <div style={{
      backgroundImage: "url('../auth.avif')",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      display: "flex",  
    }}  className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Choose your account type to log in.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={"user"}>
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="user">User</TabsTrigger>
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
                      value={formData.userEmail}
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
                      value={formData.userPassword}
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
                      value={formData.userName}
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
                      value={formData.userPhone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userAddress">Address</Label>
                    <Textarea
                      id="userAddress"
                      name="userAddress"
                      type="text"
                      required
                      value={formData.userAddress}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4">
                  Sign Up
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
                      name="ownerEmail"
                      type="email"
                      placeholder="owner@example.com"
                      required
                      value={formData.ownerEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerPassword">Password</Label>
                    <Input
                      id="ownerPassword"
                      name="ownerPassword"
                      type="password"
                      required
                      value={formData.ownerPassword}
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
          <Link href={"/auth/login"} className="text-sm text-gray-500">
            Already have an account? Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
