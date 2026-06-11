import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://sarojanifunland.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://sarojanifunland.vercel.app/book",
      lastModified: new Date(),
    },
  ];
}