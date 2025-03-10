import { Metadata } from "next"
import { Suspense } from "react"
import Image from "next/image"
import prisma from "@/lib/prisma"
import { CategoryCard } from "@/components/CategoryCard"
import { CategorySearch } from "@/components/CategorySearch"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: 'Recipe Categories | Teastify',
  description: 'Browse recipes by category',
}

async function getCategories() {
  return await prisma.category.findMany({
    include: {
      _count: {
        select: {
          recipes: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
}

function FeaturedCategorySkeleton() {
  return (
    <section className="relative h-[300px] rounded-xl overflow-hidden mb-8">
      <Skeleton className="w-full h-full" />
    </section>
  );
}

function CategoriesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(8).fill(0).map((_, i) => (
        <Skeleton key={i} className="h-[300px] w-full" />
      ))}
    </div>
  );
}

export default async function CategoriesPage() {
  const categories = await getCategories();
  const featuredCategory = categories.length > 0 ? categories[0] : null;

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Hero Section */}
      <Suspense fallback={<FeaturedCategorySkeleton />}>
        {featuredCategory && (
          <section className="relative h-[300px] rounded-xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
            {featuredCategory.imageUrl ? (
              <Image
                src={featuredCategory.imageUrl}
                alt={featuredCategory.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-6xl">🍳</span>
              </div>
            )}
            <div className="absolute inset-0 z-20 flex flex-col justify-center p-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                Featured Category: {featuredCategory.name}
              </h1>
              {featuredCategory.description && (
                <p className="text-lg text-white/90 max-w-2xl">
                  {featuredCategory.description}
                </p>
              )}
            </div>
          </section>
        )}
      </Suspense>

      {/* Search and Filter Section */}
      <section className="mb-8">
        <CategorySearch />
      </section>

      {/* Categories Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-6">All Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Suspense fallback={<CategoriesGridSkeleton />}>
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </Suspense>
        </div>
      </section>
    </div>
  )
} 