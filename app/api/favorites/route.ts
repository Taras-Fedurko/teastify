import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const favorites = await prisma.favoriteRecipe.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        recipe: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(favorites);
  } catch (error) {
    console.error('Error fetching favorite recipes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 