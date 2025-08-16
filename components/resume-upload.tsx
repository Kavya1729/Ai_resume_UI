"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, Loader2, CheckCircle, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface ResumeUploadProps {
  onUpload: (data: any) => void
  isAnalyzing: boolean
  setIsAnalyzing: (analyzing: boolean) => void
}

export function ResumeUpload({ onUpload, isAnalyzing, setIsAnalyzing }: ResumeUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    mobile: "",
  })
  const { toast } = useToast()

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile.type === "application/pdf") {
          setFile(droppedFile)
        } else {
          toast({
            title: "Invalid file type",
            description: "Please upload a PDF file.",
            variant: "destructive",
          })
        }
      }
    },
    [toast],
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile)
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file.",
          variant: "destructive",
        })
      }
    }
  }

  const handleAnalyze = async () => {
    if (!file || !userInfo.name || !userInfo.email || !userInfo.mobile) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and upload a resume.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    // Simulate analysis process
    setTimeout(() => {
      // Mock resume analysis data
      const mockData = {
        name: "John Doe",
        email: "john.doe@email.com",
        mobile: "+1234567890",
        degree: "Bachelor of Computer Science",
        pages: 2,
        skills: ["JavaScript", "React", "Node.js", "Python", "SQL"],
        experience_level: "Intermediate",
        predicted_field: "Web Development",
        resume_score: 75,
        recommendations: {
          missing_sections: ["Projects", "Certifications"],
          skill_gaps: ["TypeScript", "Docker", "AWS"],
          courses: [
            { name: "Advanced React Development", url: "#" },
            { name: "Cloud Computing with AWS", url: "#" },
          ],
        },
        userInfo,
      }

      setIsAnalyzing(false)
      onUpload(mockData)

      toast({
        title: "Analysis complete!",
        description: "Your resume has been successfully analyzed.",
      })
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* User Information Form */}
      <Card className="gradient-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="font-heading">Your Information</CardTitle>
          <CardDescription>Please provide your contact details for personalized analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={userInfo.name}
                onChange={(e) => setUserInfo((prev) => ({ ...prev, name: e.target.value }))}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={userInfo.email}
                onChange={(e) => setUserInfo((prev) => ({ ...prev, email: e.target.value }))}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number *</Label>
              <Input
                id="mobile"
                placeholder="Enter your mobile number"
                value={userInfo.mobile}
                onChange={(e) => setUserInfo((prev) => ({ ...prev, mobile: e.target.value }))}
                className="bg-background"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Upload */}
      <Card className="gradient-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="font-heading">Upload Your Resume</CardTitle>
          <CardDescription>Upload your resume in PDF format for AI-powered analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              dragActive
                ? "border-primary bg-primary/5 scale-105"
                : file
                  ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                  : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <div className="space-y-4">
              {file ? (
                <>
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-green-700 dark:text-green-400">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Ready for analysis • {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-lg font-medium">Drop your resume here or click to browse</p>
                    <p className="text-sm text-muted-foreground">Supports PDF files up to 10MB</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {file && (
            <div className="mt-6 flex justify-center">
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                size="lg"
                className="font-medium px-8 animate-pulse-glow"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Analyze Resume
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {isAnalyzing && (
        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold font-heading">Analyzing Your Resume</h3>
                <p className="text-muted-foreground">Our AI is processing your resume and generating insights...</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Extracting information...</span>
                  <span>100%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: "100%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
