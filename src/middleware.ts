import { NextRequest, NextResponse } from "next/server";

// Define site configuration types
type SiteConfig = {
  hostname: string;
  basePath: string;
  port: number;
};

type SiteConfigs = {
  trade: SiteConfig;
  board: SiteConfig;
  store: SiteConfig;
};

// Define site configurations
const SITE_CONFIGS: SiteConfigs = {
  trade: {
    hostname: `trade.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    basePath: "/trade",
    port: 3003,
  },
  board: {
    hostname: `board.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    basePath: "/board",
    port: 3002,
  },
  store: {
    hostname: `store.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    basePath: "/store",
    port: 3001,
  },
};

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";
  const [, port] = host.split(":");

  // Check if we're in development mode (using ports)
  const isDev = Boolean(port);

  // If we're in development mode, determine the site by port
  if (isDev) {
    const siteKey = Object.keys(SITE_CONFIGS).find(
      (key) => SITE_CONFIGS[key as keyof SiteConfigs].port.toString() === port,
    ) as keyof SiteConfigs | undefined;

    if (siteKey) {
      // Check if the URL already starts with the basePath
      const basePath = SITE_CONFIGS[siteKey].basePath;
      if (url.pathname.startsWith(basePath)) {
        return NextResponse.next();
      }

      // Only rewrite if not already at the correct path
      return NextResponse.rewrite(
        new URL(`${basePath}${url.pathname}`, req.url),
      );
    }

    // If port 3000, serve home
    if (port === "3000") {
      return NextResponse.rewrite(
        new URL(`/home${url.pathname === "/" ? "" : url.pathname}`, req.url),
      );
    }
  }

  return NextResponse.next();
}
