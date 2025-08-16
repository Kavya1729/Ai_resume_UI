"use client"

import type React from "react"

import { useState } from "react"
import { Shield, Users, BarChart3, Download, Eye, EyeOff } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (credentials.username === "admin" && credentials.password === "admin@resume-analyzer") {
      setIsAuthenticated(true)
      toast({
        title: "Welcome Admin!",
        description: "Successfully logged into the admin dashboard.",
      })
    } else {
      toast({
        title: "Invalid credentials",
        description: "Please check your username and password.",
        variant: "destructive",
      })
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold font-heading">Admin Access</h2>
          <p className="text-muted-foreground">Please enter your credentials to access the admin dashboard</p>
        </div>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter username"
                  value={credentials.username}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={credentials.password}
                    onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                    className="bg-background pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full">
                <Shield className="w-4 h-4 mr-2" />
                Login to Admin Panel
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>Demo credentials:</p>
          <p>
            <strong>Username:</strong> admin
          </p>
          <p>
            <strong>Password:</strong> admin@resume-analyzer
          </p>
        </div>
      </div>
    )
  }

  // Mock admin data
  const stats = {
    totalUsers: 1247,
    totalAnalyses: 3891,
    avgRating: 4.8,
    activeUsers: 89,
  }

  const recentUsers = [
    { name: "John Doe", email: "john@example.com", field: "Web Development", score: 85, date: "2024-01-15" },
    { name: "Jane Smith", email: "jane@example.com", field: "Data Science", score: 92, date: "2024-01-14" },
    { name: "Mike Johnson", email: "mike@example.com", field: "UI/UX Design", score: 78, date: "2024-01-14" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Admin Dashboard
          </h2>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your AI Resume Analyzer</p>
        </div>
        <Button onClick={() => setIsAuthenticated(false)} variant="outline">
          Logout
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Analyses</p>
                <p className="text-2xl font-bold">{stats.totalAnalyses.toLocaleString()}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
                <p className="text-2xl font-bold">{stats.avgRating}/5</p>
              </div>
              <div className="text-yellow-500">⭐</div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{stats.activeUsers}</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users */}
      <Card className="gradient-card border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-heading">Recent User Data</CardTitle>
            <CardDescription>Latest resume analyses and user information</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUsers.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <p className="font-medium">{user.name}</p>
                    <Badge variant="outline">{user.field}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Score:</span>
                    <Badge variant={user.score >= 80 ? "default" : user.score >= 60 ? "secondary" : "destructive"}>
                      {user.score}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{user.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Charts Placeholder */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="font-heading">Field Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { field: "Web Development", percentage: 35, color: "bg-primary" },
                { field: "Data Science", percentage: 28, color: "bg-secondary" },
                { field: "UI/UX Design", percentage: 20, color: "bg-accent" },
                { field: "Mobile Development", percentage: 17, color: "bg-muted-foreground" },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.field}</span>
                    <span>{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="font-heading">User Experience Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { level: "Fresher", count: 542, color: "bg-orange-500" },
                { level: "Intermediate", count: 398, color: "bg-blue-500" },
                { level: "Experienced", count: 307, color: "bg-green-500" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    <span className="font-medium">{item.level}</span>
                  </div>
                  <span className="text-lg font-bold">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
