"use client"

import { Target, Plus, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface SkillRecommendationsProps {
  data: any
}

export function SkillRecommendations({ data }: SkillRecommendationsProps) {
  return (
    <Card className="gradient-card border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-heading">
          <Target className="w-5 h-5 text-primary" />
          <span>Skill Recommendations</span>
        </CardTitle>
        <CardDescription>Enhance your profile with these in-demand skills for {data.predicted_field}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <TrendingUp className="w-5 h-5 text-primary mt-1" />
            <div>
              <h4 className="font-semibold text-primary">Boost Your Career Prospects</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Adding these skills to your resume will significantly improve your chances of landing a{" "}
                {data.predicted_field} role
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold font-heading">Recommended Skills to Add:</h4>
          <div className="grid gap-3">
            {data.recommendations.skill_gaps.map((skill: string, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <Plus className="w-4 h-4 text-green-600" />
                  <span className="font-medium">{skill}</span>
                  <Badge variant="secondary" className="text-xs">
                    High Demand
                  </Badge>
                </div>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <p className="text-sm text-green-800 dark:text-green-200">
            💡 <strong>Pro Tip:</strong> Focus on learning 2-3 of these skills first. Quality over quantity will make
            your resume stand out!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
