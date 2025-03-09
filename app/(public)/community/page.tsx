import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Community | Teastify',
  description: 'Connect with other food enthusiasts and share recipes',
}

export default function CommunityPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Community</h1>
        <p className="text-muted-foreground">Connect with other food enthusiasts</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="md:col-span-2 space-y-6">
          {/* Post Creation */}
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Share Something</h2>
            {/* Add post creation form */}
          </div>

          {/* Community Feed */}
          <div className="space-y-6">
            {/* Feed filters */}
            <div className="flex gap-4">
              {/* Add filter options */}
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {/* Add community posts */}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Community Stats */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Community Stats</h2>
            {/* Add community statistics */}
          </div>

          {/* Trending Topics */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Trending Topics</h2>
            {/* Add trending topics */}
          </div>

          {/* Active Members */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Active Members</h2>
            {/* Add active members list */}
          </div>

          {/* Community Guidelines */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Community Guidelines</h2>
            {/* Add guidelines summary */}
          </div>
        </div>
      </div>
    </div>
  )
} 