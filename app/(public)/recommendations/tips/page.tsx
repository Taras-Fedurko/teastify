import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Nutrition Tips | Teastify',
  description: 'Get personalized nutrition tips and advice',
}

export default function NutritionTipsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Nutrition Tips</h1>
        <p className="text-muted-foreground">Personalized nutrition advice for your goals</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Daily Tip */}
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Tip of the Day</h2>
            {/* Add daily tip content */}
          </div>

          {/* Tips Categories */}
          <div className="space-y-6">
            {/* Meal Planning */}
            <div className="border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Meal Planning Tips</h2>
              {/* Add meal planning tips */}
            </div>

            {/* Healthy Cooking */}
            <div className="border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Healthy Cooking Tips</h2>
              {/* Add cooking tips */}
            </div>

            {/* Nutrition Balance */}
            <div className="border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Nutrition Balance Tips</h2>
              {/* Add nutrition balance tips */}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Tips */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Tips</h2>
            {/* Add quick tips list */}
          </div>

          {/* Related Resources */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Related Resources</h2>
            {/* Add resource links */}
          </div>

          {/* Ask AI */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Ask AI</h2>
            {/* Add AI chat interface */}
          </div>
        </div>
      </div>
    </div>
  )
} 