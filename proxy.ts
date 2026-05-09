import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();

  const isAuthRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

  // Redirect logged-in users from the landing page or auth pages to the dashboard
  if (userId && (request.nextUrl.pathname === '/' || isAuthRoute(request))) {
    return Response.redirect(new URL('/dashboard', request.url));
  }

  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
