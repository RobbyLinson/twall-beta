"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, ChevronsUp, ChevronUp } from "lucide-react";
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
  const [style, setStyle] = useState<"top-rope" | "lead">("top-rope");
  const [comment, setComment] = useState("");
  const [beta, setBeta] = useState("");
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

    if (!style) {
      toast({
        title: "Style required",
        description: "Please select top-rope or lead",
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
          style,
          comment: comment.trim() || null,
          beta: beta.trim() || null,
          suggestedGrade: suggestedGrade.trim() || null,
        }),
      });

      if (res.ok) {
        toast({
          title: "Review submitted!",
          description: "Thanks for sharing your beta",
        });
        setRating(0);
        setStyle("top-rope");
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

      {/* Climb Style */}
      <div>
        <Label className="text-trinity-blue-700 font-semibold mb-2 block">
          Climb Style *
        </Label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setStyle("top-rope")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
              style === "top-rope"
                ? "border-trinity-blue-500 bg-trinity-blue-50 text-trinity-blue-700"
                : "border-trinity-silver-200 text-trinity-silver-500 hover:border-trinity-silver-300"
            }`}
          >
            <ChevronUp className="h-5 w-5" />
            <span className="font-medium">Top-Rope</span>
          </button>
          <button
            type="button"
            onClick={() => setStyle("lead")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
              style === "lead"
                ? "border-trinity-blue-500 bg-trinity-blue-50 text-trinity-blue-700"
                : "border-trinity-silver-200 text-trinity-silver-500 hover:border-trinity-silver-300"
            }`}
          >
            <ChevronsUp className="h-5 w-5" />
            <span className="font-medium">Lead</span>
          </button>
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
          placeholder="Share your thoughts, review, or tips for this climb..."
          rows={4}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="beta" className="text-trinity-silver-700">
          Your Beta (optional)
        </Label>
        <Textarea
          id="beta"
          value={beta}
          onChange={(e) => setBeta(e.target.value)}
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
