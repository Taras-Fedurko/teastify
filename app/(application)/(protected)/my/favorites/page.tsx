import { Metadata } from "next"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: 'Favorite Recipes | Teastify',
  description: 'Your favorite recipes collection',
}

export default function FavoritesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Favorite Recipes</h1>
        <p className="text-muted-foreground">Your saved recipes collection</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="py-6">
          <div className="flex gap-4">
            <Input
              placeholder="Search favorites..."
              className="max-w-sm"
            />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recently Added</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Favorite Recipe Card */}
        <Card>
          <CardHeader>
            <CardTitle>Classic Margherita Pizza</CardTitle>
            <CardDescription>Italian • 30 mins</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-md bg-muted mb-4" />
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Added on Jan 15, 2024</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">View Recipe</Button>
            <Button variant="ghost">Remove</Button>
          </CardFooter>
        </Card>

        {/* Add more favorite recipe cards */}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        {/* Add pagination component */}
      </div>
    </div>
  )
} 