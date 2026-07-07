import type { MetadataRoute } from "next";

const BASE_URL = "https://incarelist.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/dashboard", "/sign-in", "/auth"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
