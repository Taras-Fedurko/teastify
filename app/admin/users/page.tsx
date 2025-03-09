import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Admin - Users Management',
  description: 'Manage user accounts and roles',
};

async function getUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      emailVerified: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Users Management</h2>
        <p className="text-muted-foreground">
          View and manage user accounts and their roles.
        </p>
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  );
} 