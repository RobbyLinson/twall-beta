import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { climbId, rating, comment, suggestedGrade } = body;

    // Validation
    if (!climbId || !rating) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 },
      );
    }

    // Find or create user in our database
    const clerkUser = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    }).then((res) => res.json());

    let dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          clerkId: userId,
          email: clerkUser.email_addresses[0].email_address,
          username: clerkUser.username || clerkUser.first_name || null,
        },
      });
    }

    // Create or update review
    const review = await prisma.review.upsert({
      where: {
        climbId_userId: {
          climbId,
          userId: dbUser.id,
        },
      },
      update: {
        rating,
        comment: comment || null,
        suggestedGrade: suggestedGrade || null,
      },
      create: {
        climbId,
        userId: dbUser.id,
        rating,
        comment: comment || null,
        suggestedGrade: suggestedGrade || null,
      },
      include: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 },
    );
  }
}
