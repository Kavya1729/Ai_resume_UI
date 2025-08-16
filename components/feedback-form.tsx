"use client"

import type React from "react"

import { useState } from "react"
import { Star, Send, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function FeedbackForm() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    comments: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!feedback.name || !feedback.email || rating === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and provide a rating.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Thank you for your feedback!",
        description: "Your feedback has been recorded and will help us improve.",
      })

      // Reset form
      setRating(0)
      setFeedback({ name: "", email: "", comments: "" })
    }, 1000)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          We Value Your Feedback
        </h2>
        <p className="text-lg text-muted-foreground">
          Help us improve our AI Resume Analyzer by sharing your experience
        </p>
      </div>

      <Card className="gradient-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-heading">
            <MessageSquare className="w-5 h-5 text-primary" />
            <span>Feedback Form</span>
          </CardTitle>
          <CardDescription>Your feedback helps us make the tool better for everyone</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="feedback-name">Name *</Label>
                <Input
                  id="feedback-name"
                  placeholder="Your full name"
                  value={feedback.name}
                  onChange={(e) => setFeedback((prev) => ({ ...prev, name: e.target.value }))}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback-email">Email *</Label>
                <Input
                  id="feedback-email"
                  type="email"
                  placeholder="Your email address"
                  value={feedback.email}
                  onChange={(e) => setFeedback((prev) => ({ ...prev, email: e.target.value }))}
                  className="bg-background"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Rate Your Experience *</Label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1 rounded-full hover:bg-muted transition-colors"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-4 text-sm text-muted-foreground">
                  {rating > 0 && (
                    <>
                      {rating === 1 && "Poor"}
                      {rating === 2 && "Fair"}
                      {rating === 3 && "Good"}
                      {rating === 4 && "Very Good"}
                      {rating === 5 && "Excellent"}
                    </>
                  )}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">Comments (Optional)</Label>
              <Textarea
                id="comments"
                placeholder="Share your thoughts, suggestions, or any issues you encountered..."
                value={feedback.comments}
                onChange={(e) => setFeedback((prev) => ({ ...prev, comments: e.target.value }))}
                className="bg-background min-h-[120px]"
              />
            </div>

            <Button type="submit" disabled={isSubmitting} size="lg" className="w-full font-medium">
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Feedback
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Past Feedback Display */}
      <Card className="gradient-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="font-heading">Community Feedback</CardTitle>
          <CardDescription>See what others are saying about our AI Resume Analyzer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {[
              {
                name: "Sarah Johnson",
                rating: 5,
                comment: "Amazing tool! Helped me identify key skills I was missing.",
              },
              {
                name: "Mike Chen",
                rating: 4,
                comment: "Very insightful analysis. The course recommendations were spot on.",
              },
              {
                name: "Emily Davis",
                rating: 5,
                comment: "Love the detailed feedback. Got my dream job after following the suggestions!",
              },
            ].map((review, index) => (
              <div key={index} className="border rounded-lg p-4 bg-muted/20">
                <div className="flex items-start justify-between mb-2">
                  <div className="font-medium">{review.name}</div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
