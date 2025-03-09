import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Nutrition Journal | Teastify',
  description: 'Track your daily nutrition and meals',
}

export default function NutritionJournalPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Nutrition Journal</h1>
        <p className="text-muted-foreground">Track your daily nutrition and meals</p>
      </div>

      {/* Date Selector */}
      <div className="mb-8">
        {/* Add date picker component */}
      </div>

      {/* Daily Summary */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {/* Add nutrition summary cards (calories, protein, etc.) */}
      </div>

      {/* Meal Entries */}
      <div className="space-y-6">
        {/* Breakfast */}
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Breakfast</h2>
          {/* Add meal entries */}
        </div>

        {/* Lunch */}
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Lunch</h2>
          {/* Add meal entries */}
        </div>

        {/* Dinner */}
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Dinner</h2>
          {/* Add meal entries */}
        </div>

        {/* Snacks */}
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Snacks</h2>
          {/* Add meal entries */}
        </div>
      </div>
    </div>
  )
} 