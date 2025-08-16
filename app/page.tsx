"use client"

import { useState } from "react"
import { FileText, Brain, Target, Award, TrendingUp, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ResumeUpload } from "@/components/resume-upload"
import { ResumeAnalysis } from "@/components/resume-analysis"
import { SkillRecommendations } from "@/components/skill-recommendations"
import { CourseRecommendations } from "@/components/course-recommendations"
import { FeedbackForm } from "@/components/feedback-form"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("analyzer")
  const [resumeData, setResumeData] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center animate-pulse-glow">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-heading bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  AI Resume Analyzer
                </h1>
                <p className="text-sm text-muted-foreground">Smart Career Insights Powered by AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="animate-float">
                <Star className="w-3 h-3 mr-1" />
                4.9/5 Rating
              </Badge>
              <Badge variant="outline">
                <Users className="w-3 h-3 mr-1" />
                10K+ Users
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4">
            <TabsTrigger value="analyzer" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Analyzer</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Feedback</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span>About</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Admin</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyzer" className="space-y-8">
            {!resumeData ? (
              <div className="space-y-8">
                {/* Hero Section */}
                <div className="text-center space-y-6 py-12">
                  <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                    <Brain className="w-4 h-4" />
                    <span>AI-Powered Analysis</span>
                  </div>
                  <h2 className="text-4xl lg:text-6xl font-bold font-heading bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Unlock Your Career Potential
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Get intelligent insights, personalized recommendations, and boost your resume score with our
                    advanced AI analysis
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <Card className="gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Brain className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="font-heading">Smart Analysis</CardTitle>
                      <CardDescription>AI-powered parsing and analysis of your resume content</CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="text-center">
                      <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Target className="w-6 h-6 text-secondary" />
                      </div>
                      <CardTitle className="font-heading">Skill Matching</CardTitle>
                      <CardDescription>Get personalized skill recommendations for your target field</CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="text-center">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Award className="w-6 h-6 text-accent" />
                      </div>
                      <CardTitle className="font-heading">Course Suggestions</CardTitle>
                      <CardDescription>Curated learning paths to enhance your career prospects</CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                {/* Upload Section */}
                <ResumeUpload onUpload={setResumeData} isAnalyzing={isAnalyzing} setIsAnalyzing={setIsAnalyzing} />
              </div>
            ) : (
              <div className="space-y-8">
                <ResumeAnalysis data={resumeData} />
                <SkillRecommendations data={resumeData} />
                <CourseRecommendations data={resumeData} />

                <div className="flex justify-center">
                  <Button onClick={() => setResumeData(null)} variant="outline" size="lg" className="font-medium">
                    Analyze Another Resume
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="feedback">
            <FeedbackForm />
          </TabsContent>

          <TabsContent value="about">
            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  About AI Resume Analyzer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-lg leading-relaxed">
                <p>
                  Our AI Resume Analyzer is a cutting-edge tool that leverages natural language processing and machine
                  learning to provide comprehensive resume analysis and career guidance.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold font-heading text-primary">How it Works</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Upload your resume in PDF format</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                        <span>AI analyzes content and extracts key information</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span>Get personalized recommendations and insights</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold font-heading text-secondary">Features</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Resume scoring and improvement tips</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Skill gap analysis and recommendations</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span>Curated course and certification suggestions</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-xl p-6 border">
                  <p className="text-center text-muted-foreground">
                    Built with ❤️ by{" "}
                    <a href="#" className="text-primary hover:underline font-medium">
                      Deepak Padhi
                    </a>{" "}
                    through{" "}
                    <a href="#" className="text-secondary hover:underline font-medium">
                      Dr Bright (Data Scientist)
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <AdminDashboard />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold font-heading">AI Resume Analyzer</span>
            </div>
            <p className="text-sm text-muted-foreground">Empowering careers through intelligent resume analysis</p>
            <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
              <span>© 2024 AI Resume Analyzer</span>
              <span>•</span>
              <span>Built with Next.js & AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
