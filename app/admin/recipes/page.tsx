import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Admin - Recipes Management',
  description: 'Manage recipes and their content',
};

async function getRecipes() {
  return await prisma.recipe.findMany({
    select: {
      id: true,
      title: true,
      status: true,
      difficulty: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
      viewCount: true,
      favoriteCount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export default async function RecipesPage() {
  const recipes = await getRecipes();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Recipes Management</h2>
        <p className="text-muted-foreground">
          View and manage recipes across the platform.
        </p>
      </div>
      <DataTable columns={columns} data={recipes} filterColumn="title" />
    </div>
  );
} 