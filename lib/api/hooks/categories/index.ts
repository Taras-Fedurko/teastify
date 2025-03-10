import { Category } from '@prisma/client';
import useSWR from 'swr';
import api from '../../fetch';

export type CategoryWithCount = Category & {
  _count: {
    recipes: number;
  };
};

async function fetchCategories() {
  const { data } = await api.get<CategoryWithCount[]>('/api/categories');
  return data;
}

export function useCategories() {
  return useSWR('/api/categories', fetchCategories);
}
