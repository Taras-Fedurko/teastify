import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Recipe Categories | Teastify',
  description: 'Browse recipes by category',
}

export default function CategoriesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Recipe Categories</h1>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Add category cards */}
      </div>
    </div>
  )
} 