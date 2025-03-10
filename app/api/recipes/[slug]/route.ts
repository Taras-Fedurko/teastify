import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        slug,
      },
      include: {
        category: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!recipe) {
      return NextResponse.json(
        { error: 'Recipe not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await prisma.recipe.update({
      where: { id: recipe.id },
      data: { viewCount: { increment: 1 } },
    });

    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 