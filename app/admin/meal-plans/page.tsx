import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Admin - Meal Plans Management',
  description: 'Manage user meal plans',
};

async function getMealPlans() {
  return await prisma.mealPlan.findMany({
    select: {
      id: true,
      name: true,
      startDate: true,
      endDate: true,
      isTemplate: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      _count: {
        select: {
          recipes: true,
        },
      },
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export default async function MealPlansPage() {
  const mealPlans = await getMealPlans();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Meal Plans Management</h2>
        <p className="text-muted-foreground">
          View and manage user meal plans.
        </p>
      </div>
      <DataTable columns={columns} data={mealPlans} filterColumn="name" />
    </div>
  );
} 