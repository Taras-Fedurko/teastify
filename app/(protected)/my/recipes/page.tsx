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
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: 'My Recipes | Teastify',
  description: 'Manage your personal recipe collection',
}

export default function MyRecipesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Recipes</h1>
          <p className="text-muted-foreground">Manage your personal recipe collection</p>
        </div>
        <Button size="lg">
          Create New Recipe
        </Button>
      </div>

      <div className="space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardContent className="py-4">
            <div className="flex gap-4">
              <Input
                placeholder="Search your recipes..."
                className="max-w-sm"
              />
              {/* Add filter components */}
            </div>
          </CardContent>
        </Card>

        {/* Recipe Categories */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Recipes</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Recipe Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Recipe Cards */}
              <Card>
                <CardHeader>
                  <CardTitle>Homemade Pizza</CardTitle>
                  <CardDescription>Italian • 45 mins</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-md bg-muted" />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Edit</Button>
                  <Button variant="ghost">Delete</Button>
                </CardFooter>
              </Card>

              {/* Add more recipe cards */}
            </div>

            {/* Pagination */}
            <div className="flex justify-center">
              {/* Add pagination component */}
            </div>
          </TabsContent>

          <TabsContent value="published">
            {/* Published recipes */}
          </TabsContent>

          <TabsContent value="drafts">
            {/* Draft recipes */}
          </TabsContent>

          <TabsContent value="archived">
            {/* Archived recipes */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 