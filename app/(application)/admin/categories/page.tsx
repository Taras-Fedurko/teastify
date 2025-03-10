import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Admin - Categories Management',
  description: 'Manage recipe categories',
};

async function getCategories() {
  return await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      _count: {
        select: {
          recipes: true,
        },
      },
      createdAt: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Categories Management</h2>
        <p className="text-muted-foreground">
          Manage recipe categories and their content.
        </p>
      </div>
      <DataTable columns={columns} data={categories} filterColumn="name" />
    </div>
  );
} 