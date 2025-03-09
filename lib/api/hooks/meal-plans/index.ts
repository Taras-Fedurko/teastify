import { MealPlan, Recipe, MealPlanRecipe } from '@prisma/client';
import useSWR from 'swr';
import api from '../../fetch';

type MealPlanWithRecipes = MealPlan & {
  recipes: (MealPlanRecipe & {
    recipe: Recipe;
  })[];
};

async function fetcher() {
  const { data } = await api.get<MealPlanWithRecipes[]>('/api/meal-plans');
  return data;
}

export function useMealPlans() {
  return useSWR('/api/meal-plans', fetcher);
}

export function useMealPlanById(mealPlanId: string) {
  const { data, ...rest } = useMealPlans();

  return {
    ...rest,
    data: data ? data.find((plan: MealPlanWithRecipes) => plan.id === mealPlanId) : null,
  };
}

type MealPlanUpdate = Pick<MealPlan, 'name' | 'startDate' | 'endDate' | 'notes' | 'isTemplate'>;

export function useMutateMealPlan() {
  const { mutate, data } = useMealPlans();

  const mutateMealPlan = async (mealPlanId: string, mealPlanData: Partial<MealPlanUpdate>) => {
    const { data: updatedPlan } = await api.patch<MealPlanWithRecipes>(
      `/api/meal-plans/${mealPlanId}`,
      mealPlanData
    );

    await mutate(
      data?.map((plan: MealPlanWithRecipes) => {
        if (plan.id === mealPlanId) {
          return { ...plan, ...updatedPlan };
        }
        return plan;
      }),
      false
    );
  };

  return { mutateMealPlan };
}

export function useDeleteMealPlan() {
  const { mutate, data } = useMealPlans();

  const deleteMealPlan = async (mealPlanId: string) => {
    await api.delete(`/api/meal-plans/${mealPlanId}`);
    await mutate(
      data?.filter((plan: MealPlanWithRecipes) => plan.id !== mealPlanId),
      false
    );
  };

  return { deleteMealPlan };
} 