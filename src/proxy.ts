// Site-wide login gate (HTTP Basic Auth) run by Next.js Proxy on every request,
// including pages, CSS, images and the form API.
//
// The username and password live in Vercel environment variables, never in
// this repo:
//   SITE_USER       the shared username
//   SITE_PASSWORD   the shared password
//
// If either variable is missing the site stays locked (fails closed).
// To take the gate off, delete this file and redeploy.

import { NextResponse, type NextRequest } from "next/server";

const REALM = "LoStocco Refuse Service preview";

function deny(message = "Login required.") {
  return new Response(message, {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

// Constant-time comparison so response timing does not leak the password.
function safeEqual(a: string, b: string) {
  const enc = new TextEncoder();
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i % (y.length || 1)];
  return diff === 0;
}

export function proxy(request: NextRequest) {
  const user = process.env.SITE_USER;
  const password = process.env.SITE_PASSWORD;
  if (!user || !password) return deny("Site login is not configured.");

  const header = request.headers.get("authorization") || "";
  const [scheme, encoded] = header.split(" ");
  if (scheme !== "Basic" || !encoded) return deny();

  let decoded: string;
  try {
    decoded = new TextDecoder().decode(Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0)));
  } catch {
    return deny();
  }

  const split = decoded.indexOf(":");
  if (split === -1) return deny();
  const givenUser = decoded.slice(0, split);
  const givenPassword = decoded.slice(split + 1);

  const ok = Number(safeEqual(givenUser, user)) & Number(safeEqual(givenPassword, password));
  if (!ok) return deny();

  // Signed in. Keep shared caches and search engines away from the pages.
  return NextResponse.next({
    headers: {
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "private, no-store",
    },
  });
}
