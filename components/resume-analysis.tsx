"use client"

import { AlertCircle, User, Mail, Phone, GraduationCap, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ResumeAnalysisProps {
  data: any
}

export function ResumeAnalysis({ data }: ResumeAnalysisProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "from-green-500 to-green-600"
    if (score >= 60) return "from-yellow-500 to-yellow-600"
    return "from-red-500 to-red-600"
  }

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "experienced":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      default:
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Resume Analysis Complete! 🎉
        </h2>
        <p className="text-lg text-muted-foreground">Hello {data.name}! Here's your comprehensive resume analysis</p>
      </div>

      {/* Basic Information */}
      <Card className="gradient-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-heading">
            <User className="w-5 h-5 text-primary" />
            <span>Basic Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <User className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{data.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <Mail className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{data.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <Phone className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Mobile</p>
                <p className="font-medium">{data.mobile}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <GraduationCap className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Degree</p>
                <p className="font-medium">{data.degree}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Experience Level & Field */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="font-heading">Experience Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <Badge className={`text-lg px-4 py-2 ${getLevelColor(data.experience_level)}`}>
                {data.experience_level}
              </Badge>
              <p className="text-muted-foreground">Based on your resume content and keywords</p>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="font-heading">Predicted Field</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {data.predicted_field}
              </Badge>
              <p className="text-muted-foreground">
                Our AI analysis suggests you're looking for {data.predicted_field} roles
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resume Score */}
      <Card className="gradient-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-heading">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Resume Score</span>
          </CardTitle>
          <CardDescription>Your resume score based on content analysis and best practices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <div
                className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br ${getScoreBg(data.resume_score)} text-white text-2xl font-bold mb-4`}
              >
                {data.resume_score}
              </div>
              <p className={`text-lg font-semibold ${getScoreColor(data.resume_score)}`}>
                {data.resume_score >= 80 ? "Excellent!" : data.resume_score >= 60 ? "Good" : "Needs Improvement"}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Resume Completeness</span>
                <span>{data.resume_score}%</span>
              </div>
              <Progress value={data.resume_score} className="h-3" />
            </div>

            {/* Improvement Tips */}
            <div className="space-y-3">
              <h4 className="font-semibold font-heading">Improvement Suggestions:</h4>
              {data.recommendations.missing_sections.map((section: string, index: number) => (
                <div key={index} className="flex items-start space-x-2 text-sm">
                  <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Consider adding a <strong>{section}</strong> section to boost your score
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Skills */}
      <Card className="gradient-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="font-heading">Identified Skills</CardTitle>
          <CardDescription>Skills extracted from your resume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill: string, index: number) => (
              <Badge key={index} variant="outline" className="px-3 py-1">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
