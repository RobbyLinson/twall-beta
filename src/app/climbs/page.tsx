import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mountain, Star } from "lucide-react";

async function getClimbs() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/climbs`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) return [];
  return res.json();
}

export default async function ClimbsPage() {
  const climbs = await getClimbs();

  // Group climbs by rope
  const climbsByRope = climbs.reduce((acc: any, climb: any) => {
    if (!acc[climb.rope]) acc[climb.rope] = [];
    acc[climb.rope].push(climb);
    return acc;
  }, {});

  const ropes = Object.keys(climbsByRope).sort();

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
            <Link href="/">
              <Button variant="ghost" className="text-trinity-silver-700">
                Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-trinity-blue-600 mb-2">
            All Climbs
          </h1>
          <p className="text-trinity-silver-600">
            Browse routes organized by rope
          </p>
        </div>

        {climbs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-trinity-blue-100">
            <Mountain className="h-16 w-16 text-trinity-silver-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-trinity-silver-600 mb-2">
              No climbs yet
            </h2>
            <p className="text-trinity-silver-500">
              Be the first to add a climb!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {ropes.map((rope) => (
              <div
                key={rope}
                className="bg-white rounded-xl shadow-lg border border-trinity-blue-100 p-6"
              >
                <h2 className="text-2xl font-bold text-trinity-blue-600 mb-4">
                  Rope {rope}
                </h2>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {climbsByRope[rope].map((climb: any) => (
                    <Link key={climb.id} href={`/climbs/${climb.id}`}>
                      <div className="border border-trinity-silver-200 rounded-lg p-4 hover:shadow-md hover:border-trinity-blue-300 transition-all cursor-pointer">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg font-bold text-trinity-silver-700">
                                {rope} - {climb.color}
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-trinity-blue-600">
                              {climb.grade}
                            </span>
                          </div>

                          {climb.averageRating > 0 && (
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">
                                {climb.averageRating}
                              </span>
                              <span className="text-trinity-silver-400">
                                ({climb.reviewCount})
                              </span>
                            </div>
                          )}
                        </div>

                        {climb.description && (
                          <p className="text-sm text-trinity-silver-600 line-clamp-2 mt-2">
                            {climb.description}
                          </p>
                        )}

                        {climb.setter && (
                          <p className="text-xs text-trinity-silver-500 mt-2">
                            Set by {climb.setter}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
