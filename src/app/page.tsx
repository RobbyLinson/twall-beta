import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Mountain, Star, Users } from "lucide-react";

export default function Home() {
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
              <Button
                variant="ghost"
                className="text-trinity-silver-700 hover:text-trinity-blue-600"
              >
                Browse Climbs
              </Button>
            </Link>

            <SignedOut>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="border-trinity-blue-400 text-trinity-blue-600 hover:bg-trinity-blue-50"
                >
                  Sign In
                </Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6 px-4 py-2 bg-trinity-blue-100 text-trinity-blue-700 rounded-full text-sm font-semibold">
            Community-Driven Route Database
          </div>

          <h1 className="text-6xl font-bold bg-linear-to-r from-trinity-blue-600 to-trinity-silver-600 bg-clip-text text-transparent mb-6">
            Trinity Wall Beta
          </h1>

          <p className="text-xl text-trinity-silver-600 mb-10 leading-relaxed">
            Rate, review, and share beta on Trinity Climbing Wall routes. <br />
            Help your climbing community find their next project.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/climbs">
              <Button
                size="lg"
                className="bg-trinity-blue-500 hover:bg-trinity-blue-600 text-white shadow-lg"
              >
                Browse All Climbs
              </Button>
            </Link>

            <SignedOut>
              <Link href="/sign-up">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-trinity-silver-400 text-trinity-silver-700 hover:bg-trinity-silver-50"
                >
                  Create Account
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-trinity-blue-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-trinity-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Mountain className="h-6 w-6 text-trinity-blue-600" />
            </div>
            <div className="text-4xl font-bold text-trinity-blue-600 mb-2">
              14
            </div>
            <div className="text-trinity-silver-600 font-medium">
              Ropes (A-N)
            </div>
            <p className="text-sm text-trinity-silver-500 mt-2">
              Organized by rope letter and color
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border border-trinity-blue-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-trinity-silver-100 rounded-lg flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-trinity-silver-600" />
            </div>
            <div className="text-4xl font-bold text-trinity-silver-600 mb-2">
              ~40
            </div>
            <div className="text-trinity-silver-600 font-medium">Routes</div>
            <p className="text-sm text-trinity-silver-500 mt-2">
              Multiple routes per rope
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border border-trinity-blue-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-trinity-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-trinity-blue-600" />
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-trinity-blue-600 to-trinity-silver-600 bg-clip-text text-transparent mb-2">
              Community
            </div>
            <div className="text-trinity-silver-600 font-medium">
              Driven Beta
            </div>
            <p className="text-sm text-trinity-silver-500 mt-2">
              Shared by climbers, for climbers
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
