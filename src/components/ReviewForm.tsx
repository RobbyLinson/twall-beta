"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { useToast } from "../hooks/use-toast";

interface ReviewFormProps {
  climbId: string;
}

export default function ReviewForm({ climbId }: ReviewFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [suggestedGrade, setSuggestedGrade] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a star rating",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          climbId,
          rating,
          comment: comment.trim() || null,
          suggestedGrade: suggestedGrade.trim() || null,
        }),
      });

      if (res.ok) {
        toast({
          title: "Review submitted!",
          description: "Thanks for sharing your beta",
        });
        setRating(0);
        setComment("");
        setSuggestedGrade("");
        router.refresh();
      } else {
        const data = await res.json();
        toast({
          title: "Error",
          description: data.error || "Failed to submit review",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Star Rating */}
      <div>
        <Label className="text-trinity-blue-700 font-semibold mb-2 block">
          Your Rating *
        </Label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`h-8 w-8 ${
                  star <= (hoveredRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-trinity-silver-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div>
        <Label htmlFor="comment" className="text-trinity-silver-700">
          Your Review (optional)
        </Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts, beta, or tips for this climb..."
          rows={4}
          className="mt-1"
        />
      </div>

      {/* Suggested Grade */}
      <div>
        <Label htmlFor="suggestedGrade" className="text-trinity-silver-700">
          Suggested Grade (optional)
        </Label>
        <Input
          id="suggestedGrade"
          value={suggestedGrade}
          onChange={(e) => setSuggestedGrade(e.target.value)}
          placeholder="e.g., 6B+, 7A"
          className="mt-1"
        />
        <p className="text-xs text-trinity-silver-500 mt-1">
          Think the grade is off? Suggest what you think it should be
        </p>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-trinity-blue-500 hover:bg-trinity-blue-600"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
