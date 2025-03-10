import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { AddRecipeForm } from '@/components/recipes/AddRecipeForm';

export default async function NewRecipePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Recipe</h1>
        <AddRecipeForm />
      </div>
    </div>
  );
} 