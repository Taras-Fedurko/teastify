import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export const metadata: Metadata = {
  title: 'Feedback | Teastify',
  description: 'Share your feedback and help us improve',
}

export default function FeedbackPage() {
  return (
    <div className="container max-w-2xl mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Feedback</h1>
        <p className="text-muted-foreground">Help us improve your experience</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit Feedback</CardTitle>
          <CardDescription>
            We value your input and use it to make Teastify better for everyone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Feedback Type */}
            <div className="space-y-4">
              <Label>Type of Feedback</Label>
              <RadioGroup defaultValue="suggestion" className="grid grid-cols-3 gap-4">
                <div>
                  <RadioGroupItem
                    value="suggestion"
                    id="suggestion"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="suggestion"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span>Suggestion</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="issue"
                    id="issue"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="issue"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span>Issue</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="other"
                    id="other"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="other"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span>Other</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recipes">Recipes</SelectItem>
                  <SelectItem value="meal-planning">Meal Planning</SelectItem>
                  <SelectItem value="nutrition">Nutrition</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                  <SelectItem value="ui">User Interface</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Brief description of your feedback"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Please provide detailed information about your feedback"
                className="min-h-[150px]"
              />
            </div>

            {/* Contact Information */}
            <div className="space-y-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
              />
              <p className="text-sm text-muted-foreground">
                {`We'll only use this to follow up on your feedback if necessary`}
              </p>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <div className="mt-8 text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Need immediate assistance?
        </p>
        <p className="text-sm">
          Contact us at{" "}
          <a
            href="mailto:support@teastify.com"
            className="text-primary hover:underline"
          >
            support@teastify.com
          </a>
        </p>
      </div>
    </div>
  )
} 