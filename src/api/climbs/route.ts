import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const climbs = await prisma.climb.findMany({
      orderBy: [{ rope: "asc" }, { color: "asc" }],
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
        },
      },
    });

    // Calculate average ratings
    const climbsWithRatings = climbs.map((climb) => {
      const avgRating =
        climb.reviews.length > 0
          ? climb.reviews.reduce((sum, r) => sum + r.rating, 0) /
            climb.reviews.length
          : 0;

      return {
        ...climb,
        averageRating: Math.round(avgRating * 10) / 10,
        reviewCount: climb.reviews.length,
      };
    });

    return NextResponse.json(climbsWithRatings);
  } catch (error) {
    console.error("Error fetching climbs:", error);
    return NextResponse.json(
      { error: "Failed to fetch climbs" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rope, color, grade, setter, description } = body;

    const climb = await prisma.climb.create({
      data: {
        rope: rope.toUpperCase(),
        color,
        grade,
        setter,
        description,
      },
    });

    return NextResponse.json(climb);
  } catch (error) {
    console.error("Error creating climb:", error);
    return NextResponse.json(
      { error: "Failed to create climb" },
      { status: 500 },
    );
  }
}
