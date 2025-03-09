'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

export type MealPlan = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  isTemplate: boolean;
  user: {
    name: string | null;
    email: string;
  };
  _count: {
    recipes: number;
  };
  createdAt: Date;
};

export const columns: ColumnDef<MealPlan>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'user',
    header: 'User',
    cell: ({ row }) => {
      const user = row.getValue('user') as MealPlan['user'];
      return user.name || user.email;
    },
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => {
      const date = row.getValue('startDate') as Date;
      return new Date(date).toLocaleDateString();
    },
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => {
      const date = row.getValue('endDate') as Date;
      return new Date(date).toLocaleDateString();
    },
  },
  {
    accessorKey: 'isTemplate',
    header: 'Type',
    cell: ({ row }) => {
      const isTemplate = row.getValue('isTemplate') as boolean;
      return (
        <Badge variant={isTemplate ? 'secondary' : 'default'}>
          {isTemplate ? 'Template' : 'Plan'}
        </Badge>
      );
    },
  },
  {
    accessorKey: '_count.recipes',
    header: 'Recipes',
    cell: ({ row }) => {
      const count = row.original._count.recipes;
      return `${count} ${count === 1 ? 'recipe' : 'recipes'}`;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date;
      return new Date(date).toLocaleDateString();
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const mealPlan = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(mealPlan.id)}
            >
              Copy meal plan ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit plan</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete plan
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]; 