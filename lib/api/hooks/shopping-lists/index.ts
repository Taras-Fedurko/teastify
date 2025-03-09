import { ShoppingList, MealPlan } from '@prisma/client';
import useSWR from 'swr';
import api from '../../fetch';

type ShoppingListWithMealPlan = ShoppingList & {
  mealPlan: MealPlan;
};

async function fetcher() {
  const { data } = await api.get<ShoppingListWithMealPlan[]>('/api/shopping-lists');
  return data;
}

export function useShoppingLists() {
  return useSWR('/api/shopping-lists', fetcher);
}

export function useShoppingListById(shoppingListId: string) {
  const { data, ...rest } = useShoppingLists();

  return {
    ...rest,
    data: data ? data.find((list: ShoppingListWithMealPlan) => list.id === shoppingListId) : null,
  };
}

type ShoppingListUpdate = Pick<ShoppingList, 'items' | 'isCompleted' | 'notes'>;

export function useMutateShoppingList() {
  const { mutate, data } = useShoppingLists();

  const mutateShoppingList = async (shoppingListId: string, shoppingListData: Partial<ShoppingListUpdate>) => {
    const { data: updatedList } = await api.patch<ShoppingListWithMealPlan>(
      `/api/shopping-lists/${shoppingListId}`,
      shoppingListData
    );

    await mutate(
      data?.map((list: ShoppingListWithMealPlan) => {
        if (list.id === shoppingListId) {
          return { ...list, ...updatedList };
        }
        return list;
      }),
      false
    );
  };

  return { mutateShoppingList };
}

export function useDeleteShoppingList() {
  const { mutate, data } = useShoppingLists();

  const deleteShoppingList = async (shoppingListId: string) => {
    await api.delete(`/api/shopping-lists/${shoppingListId}`);
    await mutate(
      data?.filter((list: ShoppingListWithMealPlan) => list.id !== shoppingListId),
      false
    );
  };

  return { deleteShoppingList };
} 