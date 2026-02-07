import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const climb = await prisma.climb.findUnique({
      where: { id },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                username: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!climb) {
      return NextResponse.json({ error: "Climb not found" }, { status: 404 });
    }

    const avgRating =
      climb.reviews.length > 0
        ? climb.reviews.reduce((sum: number, r) => sum + r.rating, 0) /
          climb.reviews.length
        : 0;

    return NextResponse.json({
      ...climb,
      averageRating: Math.round(avgRating * 10) / 10,
      reviewCount: climb.reviews.length,
    });
  } catch (error) {
    console.error("Error fetching climb:", error);
    return NextResponse.json(
      { error: "Failed to fetch climb" },
      { status: 500 },
    );
  }
}
