import { Metadata } from "next"

type Props = {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: 'Recipe Details | Teastify',
  description: 'Detailed recipe information with ingredients and instructions',
}

export default function RecipeDetailPage({ params }: Props) {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        {/* Recipe Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Recipe Title</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span>Prep time: 30 mins</span>
            <span>Cook time: 45 mins</span>
            <span>Servings: 4</span>
          </div>
        </div>

        {/* Recipe Image */}
        <div className="aspect-video rounded-lg overflow-hidden mb-8">
          {/* Add recipe image */}
        </div>

        {/* Recipe Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {/* Add ingredients list */}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
            <ol className="space-y-4">
              {/* Add instructions list */}
            </ol>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
          {/* Add nutrition info, tips, etc. */}
        </div>
      </div>
    </div>
  )
} 