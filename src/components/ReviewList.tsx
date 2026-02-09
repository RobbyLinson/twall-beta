"use client";

import { useState } from "react";
import { Star, User, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Review {
  id: string;
  rating: number;
  comment?: string | null;
  beta?: string | null;
  suggestedGrade?: string | null;
  createdAt: Date;
  user: {
    username?: string | null;
    email: string;
  };
}

export default function ReviewsList({ reviews }: { reviews: Review[] }) {
  const [expandedBeta, setExpandedBeta] = useState<string | null>(null);

  const toggleBeta = (reviewId: string) => {
    setExpandedBeta(expandedBeta === reviewId ? null : reviewId);
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <Star className="h-12 w-12 text-trinity-silver-300 mx-auto mb-4" />
        <p className="text-trinity-silver-600">No reviews yet. Be the first!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="border border-trinity-silver-200 rounded-lg p-4"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-trinity-silver-400" />
              <span className="font-semibold text-trinity-silver-700">
                {review.user.username || review.user.email.split("@")[0]}
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
            <p className="text-trinity-silver-700 mb-2">{review.comment}</p>
          )}

          {/* Collapsible Beta */}
          {review.beta && (
            <div className="mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleBeta(review.id)}
                className="text-trinity-blue-600 hover:text-trinity-blue-700 p-0 h-auto font-semibold"
              >
                {expandedBeta === review.id ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Hide Beta
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Show Beta
                  </>
                )}
              </Button>

              {expandedBeta === review.id && (
                <div className="bg-trinity-blue-50 border border-trinity-blue-200 rounded p-3 mt-2">
                  <p className="text-sm text-trinity-silver-700">
                    {review.beta}
                  </p>
                </div>
              )}
            </div>
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
  );
}
