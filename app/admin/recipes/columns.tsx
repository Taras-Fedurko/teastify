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

export type Recipe = {
  id: string;
  title: string;
  status: string;
  difficulty: string;
  user: {
    name: string | null;
    email: string;
  };
  category: {
    name: string;
  } | null;
  viewCount: number;
  favoriteCount: number;
  createdAt: Date;
};

export const columns: ColumnDef<Recipe>[] = [
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
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge
          variant={
            status === 'PUBLISHED'
              ? 'default'
              : status === 'DRAFT'
              ? 'secondary'
              : 'destructive'
          }
        >
          {status.toLowerCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'difficulty',
    header: 'Difficulty',
    cell: ({ row }) => {
      const difficulty = row.getValue('difficulty') as string;
      return (
        <Badge variant="outline">
          {difficulty.toLowerCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'user',
    header: 'Author',
    cell: ({ row }) => {
      const user = row.getValue('user') as Recipe['user'];
      return user.name || user.email;
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const category = row.getValue('category') as Recipe['category'];
      return category?.name || 'Uncategorized';
    },
  },
  {
    accessorKey: 'viewCount',
    header: 'Views',
  },
  {
    accessorKey: 'favoriteCount',
    header: 'Favorites',
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
      const recipe = row.original;

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
              onClick={() => navigator.clipboard.writeText(recipe.id)}
            >
              Copy recipe ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View recipe</DropdownMenuItem>
            <DropdownMenuItem>Edit recipe</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete recipe
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]; 