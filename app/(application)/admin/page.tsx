import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { UsersIcon, BookOpenIcon, CalendarIcon, TagIcon } from 'lucide-react';

const adminLinks = [
  {
    title: 'Users',
    href: '/admin/users',
    icon: UsersIcon,
    description: 'Manage user accounts and roles',
  },
  {
    title: 'Recipes',
    href: '/admin/recipes',
    icon: BookOpenIcon,
    description: 'Manage recipes and their content',
  },
  {
    title: 'Categories',
    href: '/admin/categories',
    icon: TagIcon,
    description: 'Manage recipe categories',
  },
  {
    title: 'Meal Plans',
    href: '/admin/meal-plans',
    icon: CalendarIcon,
    description: 'Review and manage meal plans',
  },
];

export default function AdminDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {adminLinks.map((link) => (
        <Card key={link.href}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {link.title}
            </CardTitle>
            <link.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {link.description}
            </p>
            <Link
              href={link.href}
              className={buttonVariants({
                variant: 'link',
                className: 'px-0 mt-2',
              })}
            >
              View Details
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 