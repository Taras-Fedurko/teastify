import { FavoriteRecipe, Recipe, Category } from '@prisma/client';
import useSWR from 'swr';
import api from '../../fetch';

type FavoriteWithRecipe = FavoriteRecipe & {
  recipe: Recipe & {
    category: Category;
  };
};

async function fetcher() {
  const { data } = await api.get<FavoriteWithRecipe[]>('/api/favorites');
  return data;
}

export function useFavorites() {
  return useSWR('/api/favorites', fetcher);
}

export function useFavoriteById(favoriteId: string) {
  const { data, ...rest } = useFavorites();

  return {
    ...rest,
    data: data ? data.find((favorite: FavoriteWithRecipe) => favorite.id === favoriteId) : null,
  };
}

export function useMutateFavorite() {
  const { mutate, data } = useFavorites();

  const addFavorite = async (recipeId: string) => {
    const { data: newFavorite } = await api.post<FavoriteWithRecipe>('/api/favorites', { recipeId });
    await mutate([...(data || []), newFavorite], false);
  };

  const removeFavorite = async (favoriteId: string) => {
    await api.delete(`/api/favorites/${favoriteId}`);
    await mutate(
      data?.filter((favorite: FavoriteWithRecipe) => favorite.id !== favoriteId),
      false
    );
  };

  return { addFavorite, removeFavorite };
} 