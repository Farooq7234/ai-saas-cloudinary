import { useAuth } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const { userId } = useAuth();
        if (!userId) {  
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await prisma.$connect();
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (user.isPro) {
            return NextResponse.json({ message: 'User is a Pro member' });
        }

        return NextResponse.json({ message: 'User status endpoint' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}