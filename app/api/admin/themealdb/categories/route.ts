import { NextResponse } from 'next/server';
import { auth } from '@/auth';

const THEMEALDB_API = 'https://www.themealdb.com/api/json/v1/1';

type TheMealDBCategory = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

type TheMealDBResponse = {
  categories: TheMealDBCategory[];
};

export async function GET() {
  try {
    // Check if user is authenticated and has admin role
    const session = await auth();
    if (!session?.user?.role || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    // Fetch categories from TheMealDB
    const response = await fetch(`${THEMEALDB_API}/categories.php`);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const data = await response.json() as TheMealDBResponse;
    const categories = data.categories || [];

    // Transform categories to match our format
    const transformedCategories = categories.map(category => ({
      id: category.idCategory,
      name: category.strCategory,
      description: category.strCategoryDescription,
      imageUrl: category.strCategoryThumb,
      slug: category.strCategory.toLowerCase().replace(/\s+/g, '-'),
    }));

    return NextResponse.json({ 
      success: true,
      categories: transformedCategories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch categories',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 