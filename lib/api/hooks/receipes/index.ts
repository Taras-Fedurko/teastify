import { Recipe, Category } from '@prisma/client';
import useSWR from 'swr';
import api from '../../fetch';

type RecipeWithCategory = Recipe & {
  category: Category | null;
};

type RecipesResponse = {
  recipes: RecipeWithCategory[];
  pagination: {
    total: number;
    pages: number;
    current: number;
  };
};

async function fetcher(page: number, search?: string, category?: string) {
  const searchParams = new URLSearchParams();
  searchParams.set('page', page.toString());
  if (search) searchParams.set('search', search);
  if (category) searchParams.set('category', category);

  const { data } = await api.get<RecipesResponse>(`/api/recipes?${searchParams.toString()}`);
  return data;
}

async function fetchRecipeBySlug(slug: string) {
  const { data } = await api.get<RecipeWithCategory>(`/api/recipes/${slug}`);
  return data;
}

export function useRecipes(page = 1, search?: string, category?: string) {
  return useSWR(['/api/recipes', page, search, category], () => fetcher(page, search, category));
}

export function useRecipeBySlug(slug: string) {
  return useSWR(`/api/recipes/${slug}`, () => fetchRecipeBySlug(slug));
}

export function useRecipeById(recipeId: string) {
  const { data, ...rest } = useRecipes();

  return {
    ...rest,
    data: data?.recipes ? data.recipes.find((recipe) => recipe.id === recipeId) : null,
  };
}
