import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Mountain, Star, ArrowLeft, Calendar, User } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import ReviewForm from "@/components/ReviewForm";

async function getClimb(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/climbs/${id}`,
    { cache: "no-store" },
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function ClimbDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const climb = await getClimb(id);

  if (!climb) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-trinity-blue-50 via-white to-trinity-silver-50">
      {/* Navigation */}
      <nav className="border-b border-trinity-silver-200 bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-trinity-blue-600"
          >
            <Mountain className="h-7 w-7" />
            TWall Beta
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/climbs">
              <Button variant="ghost" className="text-trinity-silver-700">
                All Climbs
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link href="/climbs">
          <Button
            variant="ghost"
            className="mb-6 text-trinity-silver-600 hover:text-trinity-blue-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Climbs
          </Button>
        </Link>

        {/* Climb Header */}
        <div className="bg-white rounded-xl shadow-lg border border-trinity-blue-100 p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-trinity-blue-600 mb-2">
                Rope {climb.rope} - {climb.color}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-semibold text-trinity-silver-700">
                  {climb.grade}
                </span>
                {climb.setter && (
                  <span className="text-trinity-silver-500">
                    Set by {climb.setter}
                  </span>
                )}
              </div>
            </div>

            {climb.averageRating > 0 && (
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  <span className="text-3xl font-bold text-trinity-blue-600">
                    {climb.averageRating}
                  </span>
                </div>
                <span className="text-sm text-trinity-silver-500">
                  {climb.reviewCount}{" "}
                  {climb.reviewCount === 1 ? "review" : "reviews"}
                </span>
              </div>
            )}
          </div>

          {climb.description && (
            <div className="mt-4 pt-4 border-t border-trinity-silver-200">
              <p className="text-trinity-silver-700">{climb.description}</p>
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl shadow-lg border border-trinity-blue-100 p-8">
          <h2 className="text-2xl font-bold text-trinity-blue-600 mb-6">
            Reviews
          </h2>

          <SignedOut>
            <div className="text-center py-8 bg-trinity-blue-50 rounded-lg mb-6">
              <p className="text-trinity-silver-600 mb-4">
                Sign in to leave a review
              </p>
              <Link href="/sign-in">
                <Button className="bg-trinity-blue-500 hover:bg-trinity-blue-600">
                  Sign In
                </Button>
              </Link>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="mb-8 p-6 bg-trinity-blue-50 rounded-lg border border-trinity-blue-200">
              <p className="text-trinity-blue-700 font-semibold mb-2">
                Add Your Review
              </p>
              <ReviewForm climbId={climb.id} />
            </div>
          </SignedIn>

          {/* Reviews List */}
          {climb.reviews.length === 0 ? (
            <div className="text-center py-12">
              <Star className="h-12 w-12 text-trinity-silver-300 mx-auto mb-4" />
              <p className="text-trinity-silver-600">
                No reviews yet. Be the first!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {climb.reviews.map((review: any) => (
                <div
                  key={review.id}
                  className="border border-trinity-silver-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-trinity-silver-400" />
                      <span className="font-semibold text-trinity-silver-700">
                        {review.user.username ||
                          review.user.email.split("@")[0]}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-trinity-silver-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {review.comment && (
                    <p className="text-trinity-silver-700 mb-2">
                      {review.comment}
                    </p>
                  )}

                  {review.suggestedGrade && (
                    <p className="text-sm text-trinity-silver-500">
                      Suggested grade: {review.suggestedGrade}
                    </p>
                  )}

                  <div className="flex items-center gap-1 text-xs text-trinity-silver-400 mt-2">
                    <Calendar className="h-3 w-3" />
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
