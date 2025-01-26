import { baseUrl } from "@/app/api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Edge Middleware runs on the Edge runtime, a runtime built on top of the V8 JavaScript engine.
export const config = {
  matcher: ["/nav/:path", "/nav/:path/:path"],
};

export default async function middleware(request: NextRequest) {
  // Extract country. Default to US if not found.
  const cookieStore = await cookies();
  const token = await cookieStore.get("token");
  console.log("token", token);

  // Specify the correct route based on the requests location
  if (token?.value) {
    const result = await (
      await fetch(`${baseUrl}/user/agentInfo`, {
        headers: {
          token: token.value,
        },
      })
    ).json();

    if (result.code === 0) {
      const response = NextResponse.next();
      response.cookies.set("walletAddress", result.data.default_address_id);
      return response;
    }
    if (result.code === 403) {
      request.nextUrl.pathname = "/auth/login";
    } else {
      return;
    }
  } else {
    request.nextUrl.pathname = "/auth/login";
  }

  // Rewrite to URL
  return NextResponse.redirect(request.nextUrl);
}
