'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { recipeSchema, type RecipeFormData } from '@/lib/validations/recipe';
import api from '@/lib/api/fetch';

type RecipeResponse = RecipeFormData & {
  id: string;
  slug: string;
  userId: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'UNDER_REVIEW';
  viewCount: number;
  favoriteCount: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
};

export function AddRecipeForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState<{ name: string; amount: number; unit: string; }[]>([]);

  const { register, handleSubmit, formState: { errors } } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      difficulty: 'MEDIUM',
      ingredients: [],
      tags: [],
      cuisine: '',
      imageUrl: '',
      description: ''
    }
  });

  const onSubmit = async (data: RecipeFormData) => {
    try {
      setIsLoading(true);
      const recipe = await api.post<RecipeResponse>('/recipes', { ...data, ingredients });
      toast.success('Recipe created successfully!');
      router.push(`/recipes/${recipe.data.slug}`);
    } catch (error: unknown) {
      console.error('Error creating recipe:', error);
      toast.error('Failed to create recipe');
    } finally {
      setIsLoading(false);
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: 0, unit: '' }]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register('title')} />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea id="description" {...register('description')} />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="instructions">Instructions</Label>
          <Textarea id="instructions" {...register('instructions')} />
          {errors.instructions && (
            <p className="text-sm text-red-500 mt-1">{errors.instructions.message}</p>
          )}
        </div>

        <div>
          <Label>Ingredients</Label>
          {ingredients.map((_, index) => (
            <div key={index} className="flex gap-4 mt-2">
              <div className="flex-1">
                <Input
                  placeholder="Name"
                  value={ingredients[index].name}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].name = e.target.value;
                    setIngredients(newIngredients);
                  }}
                />
              </div>
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Amount"
                  value={ingredients[index].amount}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].amount = Number(e.target.value);
                    setIngredients(newIngredients);
                  }}
                />
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Unit"
                  value={ingredients[index].unit}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].unit = e.target.value;
                    setIngredients(newIngredients);
                  }}
                />
              </div>
            </div>
          ))}
          {errors.ingredients && (
            <p className="text-sm text-red-500 mt-1">{errors.ingredients.message}</p>
          )}
          <Button type="button" variant="outline" onClick={addIngredient} className="mt-2">
            Add Ingredient
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="preparationTime">Preparation Time (minutes)</Label>
            <Input type="number" id="preparationTime" {...register('preparationTime', { valueAsNumber: true })} />
            {errors.preparationTime && (
              <p className="text-sm text-red-500 mt-1">{errors.preparationTime.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="cookingTime">Cooking Time (minutes)</Label>
            <Input type="number" id="cookingTime" {...register('cookingTime', { valueAsNumber: true })} />
            {errors.cookingTime && (
              <p className="text-sm text-red-500 mt-1">{errors.cookingTime.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="servings">Servings</Label>
            <Input type="number" id="servings" {...register('servings', { valueAsNumber: true })} />
            {errors.servings && (
              <p className="text-sm text-red-500 mt-1">{errors.servings.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="calories">Calories (Optional)</Label>
            <Input type="number" id="calories" {...register('calories', { valueAsNumber: true })} />
            {errors.calories && (
              <p className="text-sm text-red-500 mt-1">{errors.calories.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select onValueChange={(value) => register('difficulty').onChange({ target: { value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EASY">Easy</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HARD">Hard</SelectItem>
            </SelectContent>
          </Select>
          {errors.difficulty && (
            <p className="text-sm text-red-500 mt-1">{errors.difficulty.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="tags">Tags (Optional)</Label>
          <Input 
            id="tags" 
            {...register('tags')} 
            placeholder="Enter tags separated by commas"
            className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">Separate multiple tags with commas</p>
          {errors.tags && (
            <p className="text-sm text-red-500 mt-1">{errors.tags.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="cuisine">Cuisine (Optional)</Label>
          <Input 
            id="cuisine" 
            {...register('cuisine')} 
            placeholder="e.g., Italian, Mexican, Japanese"
            className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          />
          {errors.cuisine && (
            <p className="text-sm text-red-500 mt-1">{errors.cuisine.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="imageUrl">Image URL (Optional)</Label>
          <Input 
            id="imageUrl" 
            {...register('imageUrl')} 
            type="url" 
            placeholder="https://example.com/image.jpg"
            className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">Enter a valid image URL</p>
          {errors.imageUrl && (
            <p className="text-sm text-red-500 mt-1">{errors.imageUrl.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="isVegetarian" {...register('isVegetarian')} />
            <Label htmlFor="isVegetarian">Vegetarian</Label>
            {errors.isVegetarian && (
              <p className="text-sm text-red-500 ml-2">{errors.isVegetarian.message}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="isVegan" {...register('isVegan')} />
            <Label htmlFor="isVegan">Vegan</Label>
            {errors.isVegan && (
              <p className="text-sm text-red-500 ml-2">{errors.isVegan.message}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="isGlutenFree" {...register('isGlutenFree')} />
            <Label htmlFor="isGlutenFree">Gluten Free</Label>
            {errors.isGlutenFree && (
              <p className="text-sm text-red-500 ml-2">{errors.isGlutenFree.message}</p>
            )}
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Recipe'}
      </Button>
    </form>
  );
} 