"use client"

import { BookOpen, ExternalLink, Star, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface CourseRecommendationsProps {
  data: any
}

export function CourseRecommendations({ data }: CourseRecommendationsProps) {
  // Mock course data based on field
  const getCourses = (field: string) => {
    const courseData = {
      "Web Development": [
        {
          name: "React - The Complete Guide",
          provider: "Udemy",
          rating: 4.8,
          duration: "40 hours",
          price: "Paid",
          url: "#",
        },
        {
          name: "Node.js Complete Course",
          provider: "Coursera",
          rating: 4.7,
          duration: "30 hours",
          price: "Free",
          url: "#",
        },
        {
          name: "Full Stack Web Development",
          provider: "freeCodeCamp",
          rating: 4.9,
          duration: "300 hours",
          price: "Free",
          url: "#",
        },
        {
          name: "JavaScript Algorithms",
          provider: "Udacity",
          rating: 4.6,
          duration: "20 hours",
          price: "Paid",
          url: "#",
        },
      ],
      "Data Science": [
        { name: "Machine Learning A-Z", provider: "Udemy", rating: 4.8, duration: "44 hours", price: "Paid", url: "#" },
        {
          name: "Python for Data Science",
          provider: "Coursera",
          rating: 4.7,
          duration: "25 hours",
          price: "Free",
          url: "#",
        },
        {
          name: "Deep Learning Specialization",
          provider: "Coursera",
          rating: 4.9,
          duration: "120 hours",
          price: "Paid",
          url: "#",
        },
        { name: "Data Visualization", provider: "Tableau", rating: 4.6, duration: "15 hours", price: "Free", url: "#" },
      ],
    }

    return courseData[field as keyof typeof courseData] || courseData["Web Development"]
  }

  const courses = getCourses(data.predicted_field)

  return (
    <Card className="gradient-card border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-heading">
          <BookOpen className="w-5 h-5 text-primary" />
          <span>Course Recommendations</span>
        </CardTitle>
        <CardDescription>Curated learning paths to enhance your {data.predicted_field} skills</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <BookOpen className="w-5 h-5 text-secondary mt-1" />
            <div>
              <h4 className="font-semibold text-secondary">Personalized Learning Path</h4>
              <p className="text-sm text-muted-foreground mt-1">
                These courses are specifically selected based on your current skills and career goals in{" "}
                {data.predicted_field}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {courses.map((course, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-card">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold font-heading text-lg">{course.name}</h4>
                    <Badge variant={course.price === "Free" ? "secondary" : "outline"}>{course.price}</Badge>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="font-medium">{course.provider}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                  <span>View Course</span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            🎯 <strong>Learning Tip:</strong> Start with free courses to build foundational knowledge, then invest in
            paid courses for advanced skills and certifications.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
