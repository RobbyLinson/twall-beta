import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  // Allow unauthenticated API access for climbs listing
  "/api/climbs(.*)",
  "/",
  "/climbs(.*)", // Allow viewing climbs without login
]);

export default clerkMiddleware(async (auth, req) => {
  // Only protect routes that are NOT public. Protecting public routes
  // (like the sign-in page) causes redirect loops or 404s.
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
