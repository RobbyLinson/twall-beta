export interface Climb {
  id: string;
  rope: string; // A, B, C, D, etc.
  color: string; // Red, Blue, Green, etc.
  grade: string;
  setter?: string | null;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  rating: number; // 1-5
  comment?: string | null;
  suggestedGrade?: string | null; // User's opinion on the grade
  climbId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    username?: string | null;
    email: string;
  };
}

export interface ClimbWithReviews extends Climb {
  reviews: Review[];
  averageRating?: number;
}
