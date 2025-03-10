'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminCategories } from '@/lib/api/hooks/admin/categories';
import { useState } from 'react';
import { toast } from 'sonner';

export default function TheMealDBPage() {
  const { categories, isLoading: isLoadingCategories, importCategories, importRecipesByCategory } = useAdminCategories();
  const [importingRecipes, setImportingRecipes] = useState<Record<string, boolean>>({});

  const handleImportCategories = async () => {
    try {
      await importCategories();
      toast.success('Categories imported successfully');
    } catch (error) {
      toast.error('Failed to import categories');
      console.error(error);
    }
  };

  const handleImportRecipes = async (category: string) => {
    try {
      setImportingRecipes(prev => ({ ...prev, [category]: true }));
      await importRecipesByCategory(category);
      toast.success(`Recipes for ${category} imported successfully`);
    } catch (error) {
      toast.error(`Failed to import recipes for ${category}`);
      console.error(error);
    } finally {
      setImportingRecipes(prev => ({ ...prev, [category]: false }));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">TheMealDB Integration</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Import Categories</CardTitle>
            <CardDescription>
              Import all categories from TheMealDB API and save them to the database.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleImportCategories}
              disabled={isLoadingCategories}
            >
              {isLoadingCategories ? 'Importing...' : 'Import Categories'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Import Recipes by Category</CardTitle>
            <CardDescription>
              Select a category to import its recipes from TheMealDB API.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {categories.length === 0 && !isLoadingCategories ? (
              <p className="text-sm text-muted-foreground">No categories found. Import categories first.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="flex flex-col gap-2 p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{category.name}</h3>
                      <span className="text-sm text-muted-foreground">
                        {category._count.recipes} recipes
                      </span>
                    </div>
                    <Button 
                      onClick={() => handleImportRecipes(category.name)}
                      disabled={importingRecipes[category.name]}
                      size="sm"
                    >
                      {importingRecipes[category.name] ? 'Importing...' : 'Import Recipes'}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 