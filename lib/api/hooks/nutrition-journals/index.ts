import { NutritionJournal } from '@prisma/client';
import useSWR from 'swr';
import api from '../../fetch';

type DateRange = {
  startDate?: string;
  endDate?: string;
};

async function fetcher(dateRange?: DateRange) {
  const params = new URLSearchParams();
  if (dateRange?.startDate) params.append('startDate', dateRange.startDate);
  if (dateRange?.endDate) params.append('endDate', dateRange.endDate);

  const url = `/api/nutrition-journals${params.toString() ? `?${params.toString()}` : ''}`;
  const { data } = await api.get<NutritionJournal[]>(url);
  return data;
}

export function useNutritionJournals(dateRange?: DateRange) {
  return useSWR(['/api/nutrition-journals', dateRange], () => fetcher(dateRange));
}

export function useNutritionJournalById(journalId: string, dateRange?: DateRange) {
  const { data, ...rest } = useNutritionJournals(dateRange);

  return {
    ...rest,
    data: data ? data.find((journal: NutritionJournal) => journal.id === journalId) : null,
  };
}

type NutritionJournalUpdate = Pick<
  NutritionJournal,
  'entries' | 'totalCalories' | 'totalProtein' | 'totalCarbs' | 'totalFat' | 'notes'
>;

export function useMutateNutritionJournal(dateRange?: DateRange) {
  const { mutate, data } = useNutritionJournals(dateRange);

  const mutateNutritionJournal = async (journalId: string, journalData: Partial<NutritionJournalUpdate>) => {
    const { data: updatedJournal } = await api.patch<NutritionJournal>(
      `/api/nutrition-journals/${journalId}`,
      journalData
    );

    await mutate(
      data?.map((journal: NutritionJournal) => {
        if (journal.id === journalId) {
          return { ...journal, ...updatedJournal };
        }
        return journal;
      }),
      false
    );
  };

  return { mutateNutritionJournal };
}

export function useDeleteNutritionJournal(dateRange?: DateRange) {
  const { mutate, data } = useNutritionJournals(dateRange);

  const deleteNutritionJournal = async (journalId: string) => {
    await api.delete(`/api/nutrition-journals/${journalId}`);
    await mutate(
      data?.filter((journal: NutritionJournal) => journal.id !== journalId),
      false
    );
  };

  return { deleteNutritionJournal };
} 