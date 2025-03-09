import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const nutritionJournals = await prisma.nutritionJournal.findMany({
      where: {
        userId: session.user.id,
        ...(startDate && endDate
          ? {
              date: {
                gte: new Date(startDate),
                lte: new Date(endDate),
              },
            }
          : {}),
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(nutritionJournals);
  } catch (error) {
    console.error('Error fetching nutrition journals:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 