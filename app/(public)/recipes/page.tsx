'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecipes } from '@/lib/api/hooks/receipes';
import { useCategories } from '@/lib/api/hooks/categories';
import { Recipe, Category } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Heart, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useDebounce } from '@/hooks/useDebounce';

type FilterState = {
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  difficulty: string;
  sortBy: string;
};

type RecipeWithCategory = Recipe & {
  category: Category | null;
};

export default function RecipesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);
  const categorySlug = searchParams.get('category');
  const { data: categories = [] } = useCategories();
  
  const { data, isLoading } = useRecipes(page, debouncedSearch, categorySlug ?? undefined);
  const [filters, setFilters] = useState<FilterState>({
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    difficulty: 'all',
    sortBy: 'newest',
  });

  // Reset page when search query or category changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, categorySlug]);

  const recipes = data?.recipes ?? [];
  const pagination = data?.pagination ?? { total: 0, pages: 1, current: 1 };

  // Handle category change
  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'all') {
      params.delete('category');
    } else {
      params.set('category', value);
    }
    router.push(`/recipes?${params.toString()}`);
  };

  // Filter recipes based on current filter state
  const filteredRecipes = recipes.filter((recipe: RecipeWithCategory) => {
    if (filters.isVegetarian && !recipe.isVegetarian) return false;
    if (filters.isVegan && !recipe.isVegan) return false;
    if (filters.isGlutenFree && !recipe.isGlutenFree) return false;
    if (filters.difficulty !== 'all' && recipe.difficulty !== filters.difficulty) return false;
    return true;
  });

  // Sort recipes based on current sort selection
  const sortedRecipes = [...filteredRecipes].sort((a: RecipeWithCategory, b: RecipeWithCategory) => {
    switch (filters.sortBy) {
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'popular':
        return b.viewCount - a.viewCount;
      default: // 'newest'
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Featured Section */}
      <div className="relative h-[300px] w-full mb-8 rounded-lg overflow-hidden bg-gradient-to-r from-primary/10 to-primary/30">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              {categorySlug 
                ? `${categorySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Recipes`
                : 'Discover Amazing Recipes'}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {categorySlug
                ? `Browse our collection of ${categorySlug.split('-').join(' ')} recipes`
                : 'Find your next culinary adventure from our collection of delicious recipes'}
            </p>
            <div className="max-w-md mx-auto relative">
              <Input
                type="search"
                placeholder="Search recipes..."
                className="w-full pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-64 space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Dietary Preferences</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="vegetarian"
                  checked={filters.isVegetarian}
                  onCheckedChange={(checked) =>
                    setFilters({ ...filters, isVegetarian: checked as boolean })
                  }
                />
                <label htmlFor="vegetarian">Vegetarian</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="vegan"
                  checked={filters.isVegan}
                  onCheckedChange={(checked) =>
                    setFilters({ ...filters, isVegan: checked as boolean })
                  }
                />
                <label htmlFor="vegan">Vegan</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="glutenFree"
                  checked={filters.isGlutenFree}
                  onCheckedChange={(checked) =>
                    setFilters({ ...filters, isGlutenFree: checked as boolean })
                  }
                />
                <label htmlFor="glutenFree">Gluten Free</label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Difficulty</h3>
            <Select
              value={filters.difficulty}
              onValueChange={(value) => setFilters({ ...filters, difficulty: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="EASY">Easy</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HARD">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Sort By</h3>
            <Select
              value={filters.sortBy}
              onValueChange={(value) => setFilters({ ...filters, sortBy: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Category</h3>
            <Select
              value={categorySlug ?? 'all'}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array(12)
                  .fill(0)
                  .map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <Skeleton className="h-48 w-full" />
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                      </CardContent>
                    </Card>
                  ))
              : sortedRecipes.map((recipe) => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onClick={() => router.push(`/recipes/${recipe.slug}`)}
                  />
                ))}
          </div>

          {/* Pagination */}
          {!isLoading && pagination.pages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {pagination.current} of {pagination.pages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.pages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RecipeCard({ recipe, onClick }: { recipe: RecipeWithCategory; onClick: () => void }) {
  return (
    <Card 
      className="overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="relative h-48 bg-muted">
        {recipe.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
          {recipe.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>
        <div className="flex gap-2 mt-2">
          {recipe.isVegetarian && <Badge variant="outline">Vegetarian</Badge>}
          {recipe.isVegan && <Badge variant="outline">Vegan</Badge>}
          {recipe.isGlutenFree && <Badge variant="outline">Gluten Free</Badge>}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{recipe.preparationTime + recipe.cookingTime} min</span>
          <span>{recipe.difficulty}</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            // Handle favorite action
          }}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
} 