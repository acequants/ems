import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/sign-in', '/sign-up'],
        disallow: ['/onboarding', '/errors/', '/roles/', '/users/'],
      },
    ],
    sitemap: 'https://CHANGE/sitemap.xml',
  };
}
