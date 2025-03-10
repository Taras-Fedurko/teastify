import api from '../../fetch';
import { useCategories } from '../categories';

export function useAdminCategories() {
  const { data: categories = [], isLoading } = useCategories();
  const { mutate } = useCategories();

  const importCategories = async () => {
    await api.post('/api/admin/themealdb/categories', {});
    await mutate();
  };

  const importRecipesByCategory = async (category: string) => {
    await api.post('/api/admin/themealdb/recipes', { category });
    await mutate();
  };

  return {
    categories,
    isLoading,
    importCategories,
    importRecipesByCategory,
  };
} 