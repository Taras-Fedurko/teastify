import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import prisma from '@/lib/prisma';
import { CategoryCard } from '@/components/CategoryCard';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ChefHat, Clock, Search, Users } from 'lucide-react';
import { routes } from '@/routes';
import { auth } from '@/auth';

async function getFeaturedContent() {
  const [categories, trendingRecipes] = await Promise.all([
    // Get categories with recipe count
    prisma.category.findMany({
      include: {
        _count: {
          select: {
            recipes: true,
          },
        },
      },
      orderBy: {
        recipes: {
          _count: 'desc',
        },
      },
      take: 4,
    }),
    // Get trending recipes
    prisma.recipe.findMany({
      where: {
        status: 'PUBLISHED',
      },
      orderBy: {
        viewCount: 'desc',
      },
      include: {
        category: true,
      },
      take: 6,
    }),
  ]);

  return { categories, trendingRecipes };
}

export default async function HomePage() {
  const session = await auth();
  const { categories, trendingRecipes } = await getFeaturedContent();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=2062")'
        }}
      >
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover & Share Amazing Recipes
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Join our community of food lovers and find your next culinary adventure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              asChild
            >
              <Link href="/recipes">Browse Recipes</Link>
            </Button>
            {!session?.user?.email && (
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 border-white"
                asChild
              >
                <Link href={routes.auth.signUp}>Join Now</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Teastify</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-background">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Search className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Easy to Find</h3>
                  <p className="text-muted-foreground">
                    Search and filter recipes by category, cuisine, or dietary preferences
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Clock className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Time-Saving</h3>
                  <p className="text-muted-foreground">
                    Quick and easy recipes with detailed preparation times
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <ChefHat className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Expert Tips</h3>
                  <p className="text-muted-foreground">
                    Professional cooking tips and detailed instructions
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Users className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Community</h3>
                  <p className="text-muted-foreground">
                    Share recipes and connect with other food enthusiasts
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Categories</h2>
            <Button variant="ghost" className="group" asChild>
              <Link href="/categories" className="flex items-center gap-2">
                View All
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Suspense fallback={<div>Loading categories...</div>}>
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </Suspense>
          </div>
        </div>
      </section>

      {/* Trending Recipes */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <Button variant="ghost" className="group" asChild>
              <Link href="/recipes" className="flex items-center gap-2">
                View All
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingRecipes.map((recipe) => (
              <Link key={recipe.id} href={`/recipes/${recipe.slug}`}>
                <Card className="group h-full overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative h-48 overflow-hidden">
                    {recipe.imageUrl ? (
                      <Image
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <ChefHat className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      {recipe.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      {recipe.category && (
                        <Badge variant="secondary">{recipe.category.name}</Badge>
                      )}
                      <Badge variant="outline">
                        {recipe.preparationTime + recipe.cookingTime} min
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {recipe.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!session?.user?.email && (
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Cooking?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our community and start sharing your culinary creations with food lovers around the world.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link href={routes.auth.signUp}>Create Account</Link>
            </Button>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
