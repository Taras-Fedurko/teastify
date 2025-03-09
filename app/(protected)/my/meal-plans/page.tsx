import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

export const metadata: Metadata = {
  title: 'Meal Plans | Teastify',
  description: 'Your personalized meal planning calendar',
}

export default function MealPlansPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Meal Plans</h1>
          <p className="text-muted-foreground">Plan and organize your meals</p>
        </div>
        <Button size="lg">
          Create New Plan
        </Button>
      </div>

      {/* Calendar Navigation */}
      <Card className="mb-8">
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon">
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">March 2024</span>
              </div>
              <Button variant="outline" size="icon">
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Today</Button>
              <Button variant="outline">Week</Button>
              <Button variant="outline">Month</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Meal Plan */}
      <div className="grid gap-6">
        {/* Day Card */}
        <Card>
          <CardHeader>
            <CardTitle>Monday, March 11</CardTitle>
            <CardDescription>3 meals planned</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Breakfast */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">Breakfast</h3>
                    <p className="text-sm text-muted-foreground">8:00 AM</p>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
                <p className="text-sm">Oatmeal with Fresh Berries</p>
              </div>

              {/* Lunch */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">Lunch</h3>
                    <p className="text-sm text-muted-foreground">12:30 PM</p>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
                <p className="text-sm">Grilled Chicken Salad</p>
              </div>

              {/* Dinner */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">Dinner</h3>
                    <p className="text-sm text-muted-foreground">7:00 PM</p>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
                <p className="text-sm">Baked Salmon with Vegetables</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Add Meal</Button>
          </CardFooter>
        </Card>

        {/* Add more day cards */}
      </div>

      {/* Shopping List Preview */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Shopping List</CardTitle>
          <CardDescription>Based on your meal plan</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add shopping list preview */}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View Full List</Button>
        </CardFooter>
      </Card>
    </div>
  )
} 