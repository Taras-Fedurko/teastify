'use client';

import { useParams, useRouter } from 'next/navigation';
import { useRecipeBySlug } from '@/lib/api/hooks/receipes';
import { Recipe, Category } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import {
  Clock,
  Users,
  ChefHat,
  Heart,
  Share2,
  Printer,
  Star,
  Bookmark,
} from 'lucide-react';

type RecipeWithCategory = Recipe & {
  category: Category | null;
};

type Ingredient = {
  name: string;
  amount: string;
};

export default function RecipePage() {
  const { slug } = useParams();
  const router = useRouter();
  const { data: recipe, isLoading } = useRecipeBySlug(slug as string) as { data: RecipeWithCategory | undefined, isLoading: boolean };

  if (isLoading) {
    return <RecipePageSkeleton />;
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Recipe not found</h1>
        <p className="text-muted-foreground mb-8">
          The recipe you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Button variant="default" onClick={() => router.push('/recipes')}>
          Browse Recipes
        </Button>
      </div>
    );
  }

  const ingredients = recipe.ingredients as Ingredient[];
  const instructions = recipe.instructions.split('\n');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Image */}
      <div className="relative h-[50vh] min-h-[400px] w-full">
        <div className="absolute inset-0">
          {recipe.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background to-background/20" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {recipe.category && (
                <Badge variant="secondary">{recipe.category.name}</Badge>
              )}
              {recipe.isVegetarian && <Badge variant="outline">Vegetarian</Badge>}
              {recipe.isVegan && <Badge variant="outline">Vegan</Badge>}
              {recipe.isGlutenFree && <Badge variant="outline">Gluten Free</Badge>}
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">{recipe.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">{recipe.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recipe Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-card rounded-lg">
                <Clock className="h-6 w-6 mb-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Prep Time</span>
                <span className="font-medium">{recipe.preparationTime} min</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-card rounded-lg">
                <Clock className="h-6 w-6 mb-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Cook Time</span>
                <span className="font-medium">{recipe.cookingTime} min</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-card rounded-lg">
                <Users className="h-6 w-6 mb-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Servings</span>
                <span className="font-medium">{recipe.servings}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-card rounded-lg">
                <ChefHat className="h-6 w-6 mb-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Difficulty</span>
                <span className="font-medium">{recipe.difficulty}</span>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
              <div className="bg-card rounded-lg p-6">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                      <span>
                        {ingredient.amount} {ingredient.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Instructions */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
              <div className="bg-card rounded-lg p-6">
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  {instructions.map((instruction: string, index: number) => (
                    instruction.trim() && (
                      <div key={index} className="flex gap-4 mb-6">
                        <div className="flex-none">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                            {index + 1}
                          </div>
                        </div>
                        <p className="flex-1 mt-1">{instruction}</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>

            {/* Nutrition Info */}
            {recipe.nutritionInfo && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Nutrition Information</h2>
                <div className="bg-card rounded-lg p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(recipe.nutritionInfo as Record<string, string>).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-2xl font-semibold">{value}</div>
                        <div className="text-sm text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="bg-card rounded-lg p-6">
              <div className="flex flex-wrap gap-4">
                <Button className="flex-1" variant="default">
                  <Heart className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button className="flex-1" variant="secondary">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button className="flex-1" variant="outline">
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
              </div>
            </div>

            {/* Recipe Info */}
            <div className="bg-card rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{recipe.rating || 0}</span>
                  <span className="text-muted-foreground">
                    ({recipe.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {recipe.favoriteCount} saves
                  </span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Published</span>
                  <span>{new Date(recipe.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span>{recipe.category?.name || 'Uncategorized'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cuisine</span>
                  <span>{recipe.cuisine || 'Not specified'}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {recipe.tags && recipe.tags.length > 0 && (
              <div className="bg-card rounded-lg p-6">
                <h3 className="font-medium mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function RecipePageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <div className="relative h-[50vh] min-h-[400px] w-full">
        <Skeleton className="w-full h-full" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex gap-2 mb-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-12 w-2/3 mb-4" />
            <Skeleton className="h-6 w-1/2" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array(4).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-lg" />
              ))}
            </div>
            <div>
              <Skeleton className="h-8 w-40 mb-4" />
              <Skeleton className="h-[200px] rounded-lg" />
            </div>
            <div>
              <Skeleton className="h-8 w-40 mb-4" />
              <Skeleton className="h-[400px] rounded-lg" />
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-[100px] rounded-lg" />
            <Skeleton className="h-[200px] rounded-lg" />
            <Skeleton className="h-[150px] rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
} 