import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { recipeSchema } from '@/lib/validations/recipe';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = recipeSchema.parse(json);

    const recipe = await prisma.recipe.create({
      data: {
        ...body,
        userId: session.user.id,
        slug: body.title.toLowerCase().replace(/\s+/g, '-'),
        status: 'DRAFT',
        viewCount: 0,
        favoriteCount: 0,
        reviewCount: 0
      }
    });

    return NextResponse.json(recipe);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request data", { status: 422 });
    }
    
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') ?? '1');
    const limit = parseInt(searchParams.get('limit') ?? '12');
    const search = searchParams.get('search') ?? '';
    const category = searchParams.get('category') ?? '';
    const skip = (page - 1) * limit;

    const where: Prisma.RecipeWhereInput = {
      AND: [
        search ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        } : {},
        category ? {
          category: {
            slug: category
          }
        } : {}
      ]
    };

    const [recipes, total] = await Promise.all([
      prisma.recipe.findMany({
        where,
        skip,
        take: limit,
        include: {
          category: true,
          user: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.recipe.count({ where }),
    ]);

    return NextResponse.json({
      recipes,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
      },
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 