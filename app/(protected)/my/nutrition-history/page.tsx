import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, DownloadIcon } from "lucide-react"

export const metadata: Metadata = {
  title: 'Nutrition History | Teastify',
  description: 'Track and analyze your nutrition history',
}

export default function NutritionHistoryPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Nutrition History</h1>
          <p className="text-muted-foreground">Track and analyze your nutrition</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Select Date Range
          </Button>
          <Button variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Calories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,145</div>
            <p className="text-xs text-muted-foreground">per day</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Protein Intake</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82g</div>
            <p className="text-xs text-muted-foreground">daily average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tracked Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">of targets met</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Tabs defaultValue="summary" className="space-y-6">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="macros">Macronutrients</TabsTrigger>
          <TabsTrigger value="meals">Meals</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Summary</CardTitle>
              <CardDescription>Overview of your nutrition data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Summary Charts */}
              <div className="aspect-[2/1] rounded-lg border bg-muted" />
              
              {/* Summary Stats */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Add summary statistics */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="macros">
          <Card>
            <CardHeader>
              <CardTitle>Macronutrient Analysis</CardTitle>
              <CardDescription>Detailed breakdown of your macronutrient intake</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add macronutrient charts and analysis */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meals">
          <Card>
            <CardHeader>
              <CardTitle>Meal Analysis</CardTitle>
              <CardDescription>Breakdown by meal type and timing</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add meal analysis content */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Trends</CardTitle>
              <CardDescription>Long-term nutrition patterns and trends</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add trends analysis */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 