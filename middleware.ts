import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const validPaths = [
  "/",
  "/questionnaire",
  "/questionnaire/[id]",
  "/answers/[id]",
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isValidPath = validPaths.some((path) => {
    if (path.includes("[id]")) {
      const pattern = path.replace("[id]", "[0-9a-zA-Z-]+");
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(pathname);
    }
    return path === pathname;
  });

  if (!isValidPath) {
    if (pathname.toLowerCase().includes("question")) {
      return NextResponse.redirect(new URL("/questionnaire", request.url));
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml).*)"],
};
