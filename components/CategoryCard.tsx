import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CategoryWithCount } from '@/lib/api/hooks/categories';

interface CategoryCardProps {
  category: CategoryWithCount;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/recipes?category=${category.slug}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
        <div className="relative h-48 overflow-hidden">
          {category.imageUrl ? (
            <Image
              src={category.imageUrl}
              alt={category.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted">
              <span className="text-2xl">🍳</span>
            </div>
          )}
        </div>
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold tracking-tight">{category.name}</h3>
            <Badge variant="secondary">
              {category._count.recipes} {category._count.recipes === 1 ? 'Recipe' : 'Recipes'}
            </Badge>
          </div>
          {category.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {category.description}
            </p>
          )}
        </CardHeader>
      </Card>
    </Link>
  );
} 