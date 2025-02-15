type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  twitterImage: string;
  socialHandle: string;
  links: {
    twitter: string;
    github: string;
    website: string;
  };
};

const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const siteConfig: SiteConfig = {
  name: "xprod ",
  description: "The All-In-One Productivity App!",
  url: baseUrl,
  ogImage: `${baseUrl}/opengraph-image.png`,
  twitterImage: `${baseUrl}/twitter-image.png`,
  socialHandle: "@eg__xo",
  links: {
    twitter: "https://x.com/eg__xo",
    github: "https://github.com/egarrisxn",
    website: "https://egxo.dev",
  },
};
