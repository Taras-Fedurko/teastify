import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Recipe Recommendations | Teastify',
  description: 'Get personalized recipe recommendations',
}

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Recipe Recommendations</h1>
        <p className="text-muted-foreground">Discover recipes tailored to your preferences</p>
      </div>

      {/* Preferences Section */}
      <div className="mb-8 border rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Preferences</h2>
        {/* Add preference settings */}
      </div>

      {/* Recommendations Grid */}
      <div className="space-y-8">
        {/* Based on History */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Based on Your History</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Add recipe cards */}
          </div>
        </div>

        {/* Popular in Your Categories */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Popular in Your Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Add recipe cards */}
          </div>
        </div>

        {/* New Recipes You Might Like */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">New Recipes You Might Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Add recipe cards */}
          </div>
        </div>
      </div>
    </div>
  )
} 