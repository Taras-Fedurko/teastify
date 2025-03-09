import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Recipes | Teastify',
  description: 'Browse our collection of delicious recipes',
}

export default function RecipesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Recipes</h1>
      
      {/* Search and Filters */}
      <div className="mb-8">
        {/* Add search and filter components */}
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Add recipe cards */}
      </div>

      {/* Pagination */}
      <div className="mt-8">
        {/* Add pagination component */}
      </div>
    </div>
  )
} 