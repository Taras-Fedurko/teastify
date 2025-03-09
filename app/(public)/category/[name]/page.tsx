import { Metadata } from "next"

type Props = {
  params: {
    name: string
  }
}

export const metadata: Metadata = {
  title: 'Category Recipes | Teastify',
  description: 'Browse recipes in this category',
}

export default function CategoryPage({ params }: Props) {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Category: {params.name}</h1>
        <p className="text-muted-foreground">Browse all recipes in this category</p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        {/* Add filter components */}
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