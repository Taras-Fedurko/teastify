import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

const THEMEALDB_API = 'https://www.themealdb.com/api/json/v1/1';

type TheMealDBRecipe = {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strTags: string;
  strYoutube: string;
  strSource: string;
  [key: `strIngredient${number}`]: string;
  [key: `strMeasure${number}`]: string;
};

type TheMealDBResponse = {
  meals: TheMealDBRecipe[] | null;
};

async function getOrCreateSystemUser() {
  const systemUser = await prisma.user.upsert({
    where: {
      email: 'system@teastify.app',
    },
    update: {},
    create: {
      email: 'system@teastify.app',
      name: 'System',
      password: 'not-accessible', // This user cannot log in
      role: 'ADMIN',
    },
  });
  return systemUser;
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and has admin role
    const session = await auth();
    if (!session?.user?.role || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    const { category } = await request.json();

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category is required' },
        { status: 400 }
      );
    }

    // Get or create system user
    const systemUser = await getOrCreateSystemUser();

    // Find the category in our database
    const dbCategory = await prisma.category.findUnique({
      where: { name: category }
    });

    if (!dbCategory) {
      return NextResponse.json(
        { success: false, error: 'Category not found in database' },
        { status: 404 }
      );
    }

    // 1. Get all recipes for the category
    const recipesResponse = await fetch(`${THEMEALDB_API}/filter.php?c=${category}`);
    if (!recipesResponse.ok) {
      throw new Error(`Failed to fetch recipes list: ${recipesResponse.statusText}`);
    }
    const recipesData = await recipesResponse.json() as TheMealDBResponse;
    const recipes = recipesData.meals || [];

    console.log(`Starting import of ${recipes.length} recipes for category ${category}`);

    let successCount = 0;
    const failedRecipes: Array<{ id: string; name?: string; error: string }> = [];

    // 2. Get detailed information for each recipe
    for (const recipe of recipes) {
      try {
        // Add delay to prevent rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));

        const detailResponse = await fetch(`${THEMEALDB_API}/lookup.php?i=${recipe.idMeal}`);
        if (!detailResponse.ok) {
          throw new Error(`Failed to fetch recipe details: ${detailResponse.statusText}`);
        }

        const detailData = await detailResponse.json() as TheMealDBResponse;
        const detailedRecipe = detailData.meals?.[0];

        if (!detailedRecipe) {
          throw new Error('No recipe details found');
        }

        // Process ingredients into a structured format
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = detailedRecipe[`strIngredient${i}`];
          const measure = detailedRecipe[`strMeasure${i}`];
          
          if (ingredient && ingredient.trim()) {
            ingredients.push({
              name: ingredient.trim(),
              amount: measure ? measure.trim() : ''
            });
          }
        }

        const recipeData = {
          title: detailedRecipe.strMeal,
          slug: detailedRecipe.strMeal.toLowerCase().replace(/\s+/g, '-'),
          description: detailedRecipe.strInstructions,
          instructions: detailedRecipe.strInstructions,
          ingredients: ingredients,
          imageUrl: detailedRecipe.strMealThumb,
          categoryId: dbCategory.id,
          status: 'PUBLISHED' as const,
          preparationTime: 0,
          cookingTime: 0,
          servings: 0,
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: false,
          viewCount: 0,
          favoriteCount: 0,
          reviewCount: 0,
          userId: systemUser.id
        };

        // Create or update recipe in database
        await prisma.recipe.upsert({
          where: {
            slug: recipeData.slug
          },
          update: recipeData,
          create: recipeData
        });

        successCount++;
        console.log(`Imported recipe ${successCount}/${recipes.length}: ${detailedRecipe.strMeal}`);

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`Failed to process recipe ${recipe.idMeal}:`, errorMessage);
        failedRecipes.push({
          id: recipe.idMeal,
          name: recipe.strMeal,
          error: errorMessage
        });
      }
    }

    const summary = {
      total: recipes.length,
      successful: successCount,
      failed: failedRecipes.length,
      failedRecipes
    };

    console.log('Import summary:', JSON.stringify(summary, null, 2));

    return NextResponse.json({ 
      success: true, 
      message: `Imported ${successCount} out of ${recipes.length} recipes for category ${category}`,
      details: summary
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error importing recipes:', errorMessage);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to import recipes',
        details: errorMessage
      },
      { status: 500 }
    );
  }
} 