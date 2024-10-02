'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('user')
  const [formData, setFormData] = useState({
    userEmail: '',
    userPassword: '',
    ownerEmail: '',
    ownerPassword: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(`Submitting ${activeTab} login:`, formData)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Choose your account type to log in.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="owner">Owner</TabsTrigger>
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
                      placeholder="john@example.com"
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
                </div>
                <Button type="submit" className="w-full mt-4">Log in</Button>
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
                <Button type="submit" className="w-full mt-4">Log in</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">Don't have an account? Sign up</p>
        </CardFooter>
      </Card>
    </div>
  )
}