import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recipes | Teastify',
  description: 'Browse our collection of delicious recipes - from quick and easy meals to gourmet dishes',
  keywords: 'recipes, cooking, food, meals, dishes, culinary',
};

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 